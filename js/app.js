/**
 * The Initiative Mission Control — PWA App Logic
 * Navigation, wake lock, flip detection, shutter management
 */

(function () {
  'use strict';

  // ==========================================
  // State
  // ==========================================
  let currentScreen = 'home';
  let currentSet = null;
  let currentMissionIdx = 0;
  let currentSide = 'plan'; // 'plan' or 'form'
  let wakeLockSentinel = null;
  let flipDebounce = false;
  let shutterStates = []; // true = open, false = closed

  // DOM refs
  const $home = document.getElementById('home-screen');
  const $plan = document.getElementById('plan-screen');
  const $form = document.getElementById('form-screen');
  const $flipIndicator = document.getElementById('flip-indicator');
  const $passwordModal = document.getElementById('password-modal');

  // ==========================================
  // Navigation
  // ==========================================
  function showScreen(name, direction) {
    const screens = { home: $home, plan: $plan, form: $form };
    Object.entries(screens).forEach(([key, el]) => {
      if (key === name) {
        el.classList.remove('hidden', 'hidden-left');
        el.scrollTop = 0;
      } else {
        el.classList.remove('hidden', 'hidden-left');
        el.classList.add(direction === 'back' ? 'hidden' : (key === currentScreen ? 'hidden-left' : 'hidden'));
      }
    });
    currentScreen = name;

    if (name === 'home') {
      releaseWakeLock();
    } else {
      requestWakeLock();
    }
  }

  function goHome() {
    currentSet = null;
    currentSide = 'plan';
    showScreen('home', 'back');
  }

  async function lockLandscape() {
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock('landscape');
      } catch (e) { }
    }
  }

  function openSet(setId) {
    currentSet = SETS.find(s => s.id === setId);
    if (!currentSet) return;

    lockLandscape();

    currentMissionIdx = 0;
    currentSide = 'plan';
    renderTaskHeader();
    renderPlan();
    showScreen('plan', 'forward');
  }

  function switchMission(idx) {
    const mission = currentSet.missions[idx];

    // Check if mission is locked (Goliath 6)
    if (mission.locked) {
      showPasswordModal(idx);
      return;
    }

    currentMissionIdx = idx;
    currentSide = 'plan';
    renderPlan();
    renderForm();
    showScreen('plan', 'forward');
  }

  function toggleSide() {
    if (currentSide === 'plan') {
      currentSide = 'form';
      renderForm();
      showScreen('form', 'forward');
    } else {
      currentSide = 'plan';
      showScreen('plan', 'back');
    }
    showFlipIndicator();
  }

  // ==========================================
  // Render: Home
  // ==========================================
  function renderHome() {
    const mainSets = SETS.filter(s => ['demo', 'campaign', 'post'].includes(s.id));
    const bonusSets = SETS.filter(s => ['riddle', 'goliath', 'games'].includes(s.id));

    const $mainGrid = document.getElementById('main-sets');
    const $bonusGrid = document.getElementById('bonus-sets');

    $mainGrid.innerHTML = mainSets.map(s =>
      `<button class="set-btn" data-set="${s.id}">${s.name}</button>`
    ).join('');

    $bonusGrid.innerHTML = bonusSets.map(s =>
      `<button class="set-btn" data-set="${s.id}">${s.name}</button>`
    ).join('');

    $mainGrid.addEventListener('click', e => {
      const btn = e.target.closest('.set-btn');
      if (btn) openSet(btn.dataset.set);
    });
    $bonusGrid.addEventListener('click', e => {
      const btn = e.target.closest('.set-btn');
      if (btn) openSet(btn.dataset.set);
    });
  }

  // ==========================================
  // Render: Task header (shared)
  // ==========================================
  function renderTaskHeader() {
    if (!currentSet) return;

    // Plan header
    const $planSelect = document.getElementById('plan-mission-select');
    const $planSetName = document.getElementById('plan-set-name');
    const $formSelect = document.getElementById('form-mission-select');
    const $formSetName = document.getElementById('form-set-name');

    $planSetName.textContent = currentSet.name;
    $formSetName.textContent = currentSet.name;

    const options = currentSet.missions.map((m, i) =>
      `<option value="${i}">${m.name}</option>`
    ).join('');

    $planSelect.innerHTML = options;
    $formSelect.innerHTML = options;

    $planSelect.value = currentMissionIdx;
    $formSelect.value = currentMissionIdx;
  }

  // ==========================================
  // Render: Plan
  // ==========================================
  function renderPlan() {
    if (!currentSet) return;
    const mission = currentSet.missions[currentMissionIdx];
    const $content = document.getElementById('plan-content');

    document.getElementById('plan-mission-select').value = currentMissionIdx;
    document.getElementById('form-mission-select').value = currentMissionIdx;

    // Handle epilogue
    if (mission.epilogue) {
      $content.innerHTML = renderEpilogue();
      return;
    }

    let rulesHtml = '';

    // Set-level rules
    if (currentSet.rules) {
      rulesHtml += `<div class="rules-block">
        <button class="rules-toggle" onclick="this.parentElement.classList.toggle('collapsed')">
          <span>📋 Правила</span>
          <span class="arrow">▼</span>
        </button>
        <div class="rules-text">${currentSet.rules}</div>
      </div>`;
    }

    // Set-level description
    if (currentSet.description) {
      rulesHtml += `<div class="rules-block">
        <div class="rules-text">${currentSet.description}</div>
      </div>`;
    }

    // Mission-level contextual rules (for Головоломки)
    if (mission.visibleRules && mission.visibleRules.length > 0) {
      const rulesContent = mission.visibleRules
        .filter(rk => GAMES_RULES[rk])
        .map(rk => {
          const r = GAMES_RULES[rk];
          return r.title
            ? `<p><b>${r.title}</b> ${r.text}</p>`
            : `<p>${r.text}</p>`;
        }).join('');

      if (rulesContent) {
        rulesHtml += `<div class="rules-block">
          <button class="rules-toggle" onclick="this.parentElement.classList.toggle('collapsed')">
            <span>📋 Правила задания</span>
            <span class="arrow">▼</span>
          </button>
          <div class="rules-text">${rulesContent}</div>
        </div>`;
      }
    }

    $content.innerHTML = `
      ${rulesHtml}
      <div class="plan-image-wrap">
        <img src="assets/images/${encodeURIComponent(mission.planImage)}" alt="План задания" />
      </div>
    `;
  }

  // ==========================================
  // Render: Form (shutters)
  // ==========================================
  function renderForm() {
    if (!currentSet) return;
    const mission = currentSet.missions[currentMissionIdx];
    const $content = document.getElementById('form-content');

    if (mission.epilogue) {
      $content.innerHTML = '<div class="plan-image-wrap"><p style="color:var(--text-secondary);padding:20px;text-align:center;">У этого задания нет формы со шторками.</p></div>';
      return;
    }

    const rows = mission.shutterRows || 2;
    const cols = mission.shutterCols || 10;
    const total = rows * cols;

    // Reset shutter states
    shutterStates = new Array(total).fill(false);

    // Shutter positions — from CSS analysis:
    // Standard (2 rows): card is 392x504px
    //   Row 0: shutters at y ≈ 20-21% area, each ~9.4% wide, ~5.2% high
    //   Row 1: shutters at y ≈ 55-56% area
    // Goliath (3 rows): similar but different spacing

    const isGoliath = currentSet.id === 'goliath';
    const shutterPositions = calculateShutterPositions(rows, cols, isGoliath);

    let consoleHtml = '';
    if (isGoliath) {
      consoleHtml = `
        <img src="assets/images/holder1.png" style="position:absolute; left:-2.77%; top:0.5%; width:105.62%; height:44.76%; max-width:none; pointer-events:none;" alt="" />
        <img src="assets/images/holder2.png" style="position:absolute; left:-2.77%; top:45.2%; width:105.62%; height:63.18%; max-width:none; pointer-events:none;" alt="" />
      `;
    } else {
      consoleHtml = `
        <img src="assets/images/holder.png" style="position:absolute; left:-2.77%; top:0.7%; width:105.62%; height:111.625%; max-width:none; pointer-events:none;" alt="" />
      `;
    }

    const shuttersHtml = shutterPositions.map((pos, i) => `
      <div class="shutter" data-idx="${i}"
           style="left:${pos.x}%;top:${pos.y}%;width:${pos.w}%;height:${pos.h}%;">
        <img src="assets/images/windowDown.png" class="shutter-closed-img" alt="" />
        <img src="assets/images/windowUp.png" class="shutter-open-img" alt="" style="display:none;" />
      </div>
    `).join('');

    $content.innerHTML = `
      <div class="shutter-container">
        <img class="form-bg" src="assets/images/${encodeURIComponent(mission.formImage)}" alt="Форма задания" />
        <div class="shutter-overlay">
          ${consoleHtml}
          ${shuttersHtml}
        </div>
      </div>
      <div class="reveal-btn-wrap">
        <button class="reveal-btn" id="reveal-answer-btn">Раскрыть ответ</button>
      </div>
    `;

    // Bind shutter clicks
    $content.querySelectorAll('.shutter').forEach(el => {
      el.addEventListener('click', () => toggleShutter(el));
    });

    // Bind reveal
    document.getElementById('reveal-answer-btn').addEventListener('click', revealAll);
  }

  // ==========================================
  // Shutter positioning
  // ==========================================
  function calculateShutterPositions(rows, cols, isGoliath) {
    const positions = [];

    if (isGoliath) {
      // Goliath form is 301.26px high
      const rowTops = [30.46, 58.14, 85.82];
      const shutterW = 10.01;
      const shutterH = 13.10;
      const startX = 1.68;
      const stepX = 9.746;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          positions.push({
            x: startX + c * stepX,
            y: rowTops[r],
            w: shutterW,
            h: shutterH
          });
        }
      }
    } else {
      // Standard form is 216px high
      const rowTops = [42.49, 81.09];
      const shutterW = 10.01;
      const shutterH = 18.28;
      const startX = 1.68;
      const stepX = 9.746;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          positions.push({
            x: startX + c * stepX,
            y: rowTops[r],
            w: shutterW,
            h: shutterH
          });
        }
      }
    }

    return positions;
  }

  function toggleShutter(el) {
    const idx = parseInt(el.dataset.idx);
    shutterStates[idx] = !shutterStates[idx];

    if (shutterStates[idx]) {
      el.classList.add('open');
      el.querySelector('.shutter-closed-img').style.display = 'none';
      el.querySelector('.shutter-open-img').style.display = 'block';
    } else {
      el.classList.remove('open');
      el.querySelector('.shutter-closed-img').style.display = 'block';
      el.querySelector('.shutter-open-img').style.display = 'none';
    }
  }

  function revealAll() {
    if (!confirm('Вы уверены, что хотите раскрыть ответ?')) return;

    document.querySelectorAll('.shutter').forEach(el => {
      el.classList.add('open');
      el.querySelector('.shutter-closed-img').style.display = 'none';
      el.querySelector('.shutter-open-img').style.display = 'block';
    });
    shutterStates = shutterStates.map(() => true);
  }

  // ==========================================
  // Epilogue
  // ==========================================
  function renderEpilogue() {
    return `
      <div class="epilogue-content">
        <div class="epilogue-computer">
          <img src="assets/images/Mission_Control_Computer.png" alt="Computer" />
          <div class="epilogue-computer-text">${EPILOGUE.computerText}</div>
        </div>
        <div class="epilogue-text">${EPILOGUE.afterText.replace(/\n/g, '<br>')}</div>
        <br><br><br><br><br><br>
        <div class="epilogue-text">${EPILOGUE.spoiler1}</div>
        <div class="epilogue-spoiler-images">
          <img src="assets/images/${encodeURIComponent(EPILOGUE.images[0])}" alt="" />
        </div>
        <div class="epilogue-text">${EPILOGUE.spoiler2.replace(/\n/g, '<br>')}</div>
        <div class="epilogue-spoiler-images">
          <img src="assets/images/${encodeURIComponent(EPILOGUE.images[1])}" alt="" />
          <img src="assets/images/${encodeURIComponent(EPILOGUE.images[2])}" alt="" />
        </div>
        <div class="epilogue-text">${EPILOGUE.spoiler3}</div>
      </div>
    `;
  }

  // ==========================================
  // Password modal (Goliath 6)
  // ==========================================
  function showPasswordModal(missionIdx) {
    $passwordModal.classList.add('active');
    const $input = document.getElementById('password-input');
    const $error = document.getElementById('password-error');
    $input.value = '';
    $error.textContent = '';
    $input.focus();

    // Store target mission index
    $passwordModal.dataset.targetIdx = missionIdx;
  }

  function hidePasswordModal() {
    $passwordModal.classList.remove('active');
    // Reset select to current mission
    document.getElementById('plan-mission-select').value = currentMissionIdx;
    document.getElementById('form-mission-select').value = currentMissionIdx;
  }

  async function checkPassword() {
    const $input = document.getElementById('password-input');
    const $error = document.getElementById('password-error');
    const password = $input.value.trim();
    const targetIdx = parseInt($passwordModal.dataset.targetIdx);
    const mission = currentSet.missions[targetIdx];

    if (!password) {
      $error.textContent = 'Введите пароль';
      return;
    }

    // SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === mission.passwordHash) {
      // Unlock
      mission.locked = false;
      hidePasswordModal();
      currentMissionIdx = targetIdx;
      renderPlan();
      renderForm();
    } else {
      $error.textContent = 'Попробуйте ещё раз.';
      $input.focus();
    }
  }

  // ==========================================
  // Wake Lock
  // ==========================================
  async function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
    } catch (e) {
      // Wake lock request failed (e.g., low battery)
    }
  }

  function releaseWakeLock() {
    if (wakeLockSentinel) {
      wakeLockSentinel.release();
      wakeLockSentinel = null;
    }
  }

  // Re-acquire wake lock when page becomes visible again
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && currentScreen !== 'home') {
      requestWakeLock();
    }
  });

  // ==========================================
  // Flip detection (device motion)
  // ==========================================
  function initFlipDetection() {
    if (!('DeviceMotionEvent' in window)) return;

    // iOS 13+ requires permission
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // We'll request on first user interaction
      document.addEventListener('click', function requestMotion() {
        DeviceMotionEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              bindFlipListener();
            }
          })
          .catch(() => { });
        document.removeEventListener('click', requestMotion);
      }, { once: true });
    } else {
      bindFlipListener();
    }
  }

  function bindFlipListener() {
    window.addEventListener('devicemotion', (e) => {
      if (currentScreen === 'home' || flipDebounce) return;
      if (!e.rotationRate) return;

      const gamma = Math.abs(e.rotationRate.gamma || 0);

      if (gamma > 300) {
        flipDebounce = true;
        toggleSide();
        setTimeout(() => { flipDebounce = false; }, 800);
      }
    }, true);
  }

  // ==========================================
  // Flip indicator
  // ==========================================
  function showFlipIndicator() {
    const text = currentSide === 'form' ? '🔄 Форма' : '🔄 План';
    $flipIndicator.textContent = text;
    $flipIndicator.classList.add('show');
    setTimeout(() => $flipIndicator.classList.remove('show'), 600);
  }

  // ==========================================
  // Event bindings
  // ==========================================
  function bindEvents() {
    // Back buttons
    document.getElementById('plan-back-btn').addEventListener('click', goHome);
    document.getElementById('form-back-btn').addEventListener('click', goHome);

    // Toggle buttons
    document.getElementById('plan-toggle-btn').addEventListener('click', toggleSide);
    document.getElementById('form-toggle-btn').addEventListener('click', toggleSide);

    // Mission selects
    document.getElementById('plan-mission-select').addEventListener('change', (e) => {
      switchMission(parseInt(e.target.value));
    });
    document.getElementById('form-mission-select').addEventListener('change', (e) => {
      switchMission(parseInt(e.target.value));
    });

    // Password modal
    document.getElementById('password-cancel-btn').addEventListener('click', hidePasswordModal);
    document.getElementById('password-submit-btn').addEventListener('click', checkPassword);
    document.getElementById('password-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPassword();
    });

    // Close modal on overlay click
    $passwordModal.addEventListener('click', (e) => {
      if (e.target === $passwordModal) hidePasswordModal();
    });
  }

  // ==========================================
  // Service Worker registration
  // ==========================================
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => { });
    }
  }

  // ==========================================
  // Init
  // ==========================================
  function init() {
    renderHome();
    bindEvents();
    initFlipDetection();
    registerSW();

    // Start on home
    $plan.classList.add('hidden');
    $form.classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
