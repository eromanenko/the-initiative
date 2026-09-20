/**
 * Mission data configuration for The Initiative PWA
 * Each set contains missions with plan/form image pairs and shutter configurations
 */

const SETS = [
  {
    id: 'demo',
    name: 'Демо-задание',
    description: null,
    rules: null,
    missions: [
      { name: 'Демо-задание', planImage: 'demo01b.jpg', formImage: 'demo01f.jpg', shutterRows: 2, shutterCols: 10 }
    ]
  },
  {
    id: 'campaign',
    name: 'Кампания',
    description: null,
    rules: null,
    missions: [
      { name: 'Задание 1', planImage: 'mission01b.jpg', formImage: 'mission01f.jpg' },
      { name: 'Задание 2', planImage: 'mission02b.jpg', formImage: 'mission02f.jpg' },
      { name: 'Задание 3', planImage: 'mission03b.jpg', formImage: 'mission03f.jpg' },
      { name: 'Задание 4', planImage: 'mission04b.jpg', formImage: 'mission04f.jpg' },
      { name: 'Задание 5', planImage: 'mission05b.jpg', formImage: 'mission05f.jpg' },
      { name: 'Задание 6', planImage: 'mission06b.jpg', formImage: 'mission06f.jpg' },
      { name: 'Задание 7', planImage: 'mission07b.jpg', formImage: 'mission07f.jpg' },
      { name: 'Задание 8', planImage: 'mission08b.jpg', formImage: 'mission08f.jpg' },
      { name: 'Задание 9', planImage: 'mission09b.jpg', formImage: 'mission09f.jpg' },
      { name: 'Задание 10', planImage: 'mission10b.jpg', formImage: 'mission10f.jpg' },
      { name: 'Задание 11', planImage: 'mission11b.jpg', formImage: 'mission11f.jpg' },
      { name: 'Задание 12', planImage: 'mission12b.jpg', formImage: 'mission12f.jpg' },
      { name: 'Задание 13', planImage: 'mission13b.jpg', formImage: 'mission13f.jpg' },
      { name: 'Задание 14', planImage: 'mission14b.jpg', formImage: 'mission14f.jpg' },
      { name: 'Задание 15', planImage: 'mission15b.jpg', formImage: 'mission15f.jpg' }
    ]
  },
  {
    id: 'post',
    name: 'Пост-кампания',
    description: null,
    rules: null,
    missions: [
      { name: 'Словесное задание 1', planImage: 'post01b.jpg', formImage: 'post01f.jpg' },
      { name: 'Словесное задание 2', planImage: 'post02b.jpg', formImage: 'post02f.jpg' },
      { name: 'Словесное задание 3', planImage: 'post03b.jpg', formImage: 'post03f.jpg' },
      { name: 'Словесное задание 4', planImage: 'post04b.jpg', formImage: 'post04f.jpg' },
      { name: 'Словесное задание 5', planImage: 'post05b.jpg', formImage: 'post05f.jpg' },
      { name: 'Словесное задание 6', planImage: 'post06b.jpg', formImage: 'post06f.jpg' },
      { name: 'Словесное задание 7', planImage: 'post07b.jpg', formImage: 'post07f.jpg' },
      { name: 'Словесное задание 8', planImage: 'post08b.jpg', formImage: 'post08f.jpg' },
      { name: 'Числовое задание 1', planImage: 'post09b.jpg', formImage: 'post09f.jpg' },
      { name: 'Числовое задание 2', planImage: 'post10b.jpg', formImage: 'post10f.jpg' },
      { name: 'Числовое задание 3', planImage: 'post11b.jpg', formImage: 'post11f.jpg' },
      { name: 'Числовое задание 4', planImage: 'post12b.jpg', formImage: 'post12f.jpg' },
      { name: 'Числовое задание 5', planImage: 'post13b.jpg', formImage: 'post13f.jpg' },
      { name: 'Числовое задание 6', planImage: 'post14b.jpg', formImage: 'post14f.jpg' },
      { name: 'Числовое задание 7', planImage: 'post15b.jpg', formImage: 'post15f.jpg' },
      { name: 'Числовое задание 8', planImage: 'post16b.jpg', formImage: 'post16f.jpg' },
      { name: 'Уникальное задание 1', planImage: 'post17b.jpg', formImage: 'post17f.jpg' },
      { name: 'Уникальное задание 2', planImage: 'post18b.jpg', formImage: 'post18f.jpg' },
      { name: 'Уникальное задание 3', planImage: 'post19b.jpg', formImage: 'post19f.jpg' },
      { name: 'Уникальное задание 4', planImage: 'post20b.jpg', formImage: 'post20f.jpg' },
      { name: 'Уникальное задание 5', planImage: 'post21b.jpg', formImage: 'post21f.jpg' },
      { name: 'Уникальное задание 6', planImage: 'post22b.jpg', formImage: 'post22f.jpg' },
      { name: 'Уникальное задание 7', planImage: 'post23b.jpg', formImage: 'post23f.jpg' },
      { name: 'Уникальное задание 8', planImage: 'post24b.jpg', formImage: 'post24f.jpg' }
    ]
  },
  {
    id: 'riddle',
    name: 'Загадки',
    description: null,
    rules: 'Выполняя эти задания, используйте все правила пост-кампании со стр. 41-42 руководства, в том числе правило по использованию карт достижений (карт секретов 21–25) в заданиях на больших прямоугольных полях и правило секретных проходов.',
    missions: [
      { name: 'Бонусное задание 1', planImage: 'riddle01b.jpg', formImage: 'riddle01f.jpg' },
      { name: 'Бонусное задание 2', planImage: 'riddle02b.jpg', formImage: 'riddle02f.jpg' },
      { name: 'Бонусное задание 3', planImage: 'riddle03b.jpg', formImage: 'riddle03f.jpg' },
      { name: 'Бонусное задание 4', planImage: 'riddle04b.jpg', formImage: 'riddle04f.jpg' },
      { name: 'Бонусное задание 5', planImage: 'riddle05b.jpg', formImage: 'riddle05f.jpg' },
      { name: 'Бонусное задание 6', planImage: 'riddle06b.jpg', formImage: 'riddle06f.jpg' }
    ]
  },
  {
    id: 'goliath',
    name: 'Голиаф',
    description: '<em>Месяцами вы шли по следам. Они что-то скрывают. Что-то Большое. Вы просто пока не можете это доказать.</em><br><em>Ваше расследование привело вас сюда, лицом к лицу со сложными загадками, которые могут быть ключом к ответу на вопрос: что такое «Голиаф»?</em>',
    rules: 'Выполняя эти задания, используйте все правила пост-кампании со стр. 41-42 руководства, в том числе правило по использованию карт достижений (карт секретов 21–25) в заданиях на больших развёрнутых прямоугольных полях и правило секретных проходов (помните, что враги тоже могут пользоваться секретными проходами).<br>Также был добавлен третий ряд к каждой загадке. Тщательно продумывайте свои ходы. <b>Внимательно читайте, что от вас требуется в задании.</b>',
    shutterLayout: 'goliath',
    missions: [
      { name: 'Голиаф 1', planImage: 'goliath01b.jpg', formImage: 'goliath01f.jpg', shutterRows: 3, shutterCols: 10 },
      { name: 'Голиаф 2', planImage: 'goliath02b.jpg', formImage: 'goliath02f.jpg', shutterRows: 3, shutterCols: 10 },
      { name: 'Голиаф 3', planImage: 'goliath03b.jpg', formImage: 'goliath03f.jpg', shutterRows: 3, shutterCols: 10 },
      { name: 'Голиаф 4', planImage: 'goliath04b.jpg', formImage: 'goliath04f.jpg', shutterRows: 3, shutterCols: 10 },
      { name: 'Голиаф 5', planImage: 'goliath05b.jpg', formImage: 'goliath05f.jpg', shutterRows: 3, shutterCols: 10 },
      { name: 'Голиаф 6', locked: true, passwordHash: 'fed5ebe7fa5f90ff2cccb198a28748c7860c614915e66b8d3c4437db532ddb06', planImage: 'goliath06b.jpg', formImage: 'goliath06f.jpg', shutterRows: 3, shutterCols: 10 }
    ]
  },
  {
    id: 'games',
    name: 'Головоломки',
    description: null,
    rules: null,
    missions: [
      {
        name: 'Головоломка 1',
        planImage: 'games01b.jpg',
        formImage: 'games01f.jpg',
        visibleRules: ['generalRules']
      },
      {
        name: 'Головоломка 2',
        planImage: 'games02b.jpg',
        formImage: 'games02f.jpg',
        visibleRules: ['notAllClues', 'raisingWindows', 'startingWindows', 'generalRules']
      },
      {
        name: 'Головоломка 3',
        planImage: 'games03b.jpg',
        formImage: 'games03f.jpg',
        visibleRules: ['notAllClues', 'raisingWindows', 'startingWindows', 'generalRules']
      },
      {
        name: 'Головоломка 4',
        planImage: 'games04b.jpg',
        formImage: 'games04f.jpg',
        visibleRules: ['faceupTokens', 'raisingWindows', 'startingWindows', 'generalRules']
      },
      {
        name: 'Головоломка 5',
        planImage: 'games05b.jpg',
        formImage: 'games05f.jpg',
        visibleRules: ['faceupTokens', 'raisingWindows', 'startingWindows', 'generalRules']
      },
      {
        name: 'Головоломка 6',
        planImage: 'games06b.jpg',
        formImage: 'games06f.jpg',// Games_Mission Cards13.jpg ???
        visibleRules: ['notAllClues', 'raisingWindows', 'startingWindows', 'generalRules']
      },
      {
        name: 'Эпилог',
        epilogue: true
      }
    ]
  }
];

// Default shutter config: 2 rows x 10 cols
SETS.forEach(set => {
  set.missions.forEach(m => {
    if (!m.shutterRows) m.shutterRows = 2;
    if (!m.shutterCols) m.shutterCols = 10;
  });
});

// Contextual rules for Головоломки
const GAMES_RULES = {
  notAllClues: {
    title: 'Не все улики размещаются на поле во время подготовки:',
    text: 'это задание не использует жетоны улик всех цветов. Так сделано специально. Используйте случайные жетоны при подготовке к заданию, а остальные верните в коробку, не смотря на лицевую сторону.'
  },
  faceupTokens: {
    title: 'Раскрытые жетоны улик в подготовке:',
    text: 'это задание требует, чтобы вы разместили особые жетоны улик лицевой стороной вверх на игровом поле во время подготовки к игре. В первую очередь найдите эти жетоны и разместите их на поле, затем переверните остальные жетоны лицевой стороной вниз, перемешайте и разместите жетоны так, как показано на карте задания.'
  },
  raisingWindows: {
    title: 'Приподнять шторку:',
    text: 'это задание позволяет приподнимать шторки, вместо того чтобы открывать или закрывать их полностью. Чтобы приподнять шторку, зафиксируйте её в таком положении, в котором будет полностью видно символы и над, и под шторкой. Для того чтобы приподнять шторку в задании, просто щёлкните по ней один раз. Повторное нажатие на приподнятую шторку закроет ту часть, которая изначально была видна.'
  },
  startingWindows: {
    title: 'Исходное положение шторок:',
    text: 'в этом задании шторки могут быть изначально как открыты, так и закрыты. Поскольку задания выложены в электронном виде, вам не нужно ничего подготавливать перед игрой. Просто следуйте представленной раскладке.'
  },
  generalRules: {
    title: null,
    text: 'Выполняя эти задания, используйте все правила «головоломок».',
    link: null
  }
};

// Epilogue content
const EPILOGUE = {
  computerText: 'И вновь приветствую, агенты. Изумительно! Кажется, единственный способ избежать проигрыша — не играть.\n\nНикто до этого момента не побеждал <<Немезиду>>. Как же звучит это знаменитое человеческое выражение? Ах да, всё бывает в первый раз.',
  afterText: `Спасибо, что сыграли во все бонусные задания-головоломки. Мы очень надеемся, что вам было так же интересно проходить наши задания, как нам — их создавать!

Возможно, вы помните, как в самом начале вам посоветовали: «И будьте начеку! Если вам покажется, что что-то находится не на своём месте, возможно, это важно. «Немезида» любит подразнить людей, оставляя подсказки на виду». Заметили ли вы что-нибудь странное или не на своём месте в этих заданиях?

Если вам удалость заметить подсказки «Немезиды», поздравляем с повышением навыков внимания и дедукции! Мы надеемся, они помогли вам решить некоторые задания.
Если вы не заметили эти подсказки, ниже мы всё расскажем. ЕСЛИ ВЫ ЕЩЁ НЕ ЗАВЕРШИЛИ ВСЕ ЗАДАНИЯ, НЕ ЧИТАЙТЕ ДАЛЬШЕ И НЕ КРУТИТЕ СТРАНИЧКУ ВНИЗ.`,
  spoiler1: 'Подготовка к первому заданию тематически вдохновлена компьютерным пасьянсом «Косынка» (чередование цветов жетонов улик, большая стопка из 6 улик в правом нижнем углу, символизирующая колоду карт).',
  spoiler2: `За исключением первого задания, все остальные включают в себя некоторые подсказки о том, как решить головоломки, и эти подсказки вы получаете при подготовке. Например, жетоны улик в задании 2 при подготовке расставляются по диагонали, как в шашках, и только по одному жетону на квадрат. Знакомый рисунок, не правда ли?

Заметили ли вы также, что красные жетоны улик размещены точно в тех же местах, где находятся красные шашки? Интересно, что же означают другие цвета жетонов улик…`,
  spoiler3: 'Теперь, когда вам раскрыли глаза на происходящее, взгляните ещё раз на карты с заданиями и попробуйте найти подсказки, оставленные <em>Немезидой</em>. Только представьте, если бы вы заметили их в первый раз. Будьте внимательны, агенты, вскоре мы вновь обратимся к вам за помощью!',
  images: ['Games_Mission Cards.jpg', 'Games_Mission Cards3.jpg', 'Games_Mission Cards4.jpg']
};
