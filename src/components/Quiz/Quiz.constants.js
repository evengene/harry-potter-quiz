const easy = [
  {
    questionText: 'What is the name of Harry’s owl?',
    answerOptions: [
      { text: 'Errol', isCorrect: false },
      { text: 'Hedwig', isCorrect: true },
      { text: 'Pigwidgeon', isCorrect: false },
      { text: 'Fawkes', isCorrect: false }
    ]
  },
  {
    questionText: 'Which Hogwarts house does Harry belong to?',
    answerOptions: [
      { text: 'Slytherin', isCorrect: false },
      { text: 'Hufflepuff', isCorrect: false },
      { text: 'Gryffindor', isCorrect: true },
      { text: 'Ravenclaw', isCorrect: false }
    ]
  },
  {
    questionText: 'What position does Harry play on the Gryffindor Quidditch team?',
    answerOptions: [
      { text: 'Keeper', isCorrect: false },
      { text: 'Beater', isCorrect: false },
      { text: 'Chaser', isCorrect: false },
      { text: 'Seeker', isCorrect: true }
    ]
  },
  {
    questionText: 'What is the name of the wizarding bank in Diagon Alley?',
    answerOptions: [
      { text: 'Gringotts', isCorrect: true },
      { text: 'Ollivanders', isCorrect: false },
      { text: 'Flourish and Blotts', isCorrect: false },
      { text: 'Borgin and Burkes', isCorrect: false }
    ]
  },
  {
    questionText: 'Who is Harry’s godfather?',
    answerOptions: [
      { text: 'Remus Lupin', isCorrect: false },
      { text: 'Arthur Weasley', isCorrect: false },
      { text: 'Sirius Black', isCorrect: true },
      { text: 'Albus Dumbledore', isCorrect: false }
    ]
  },
  {
    questionText: 'What platform does the Hogwarts Express leave from?',
    answerOptions: [
      { text: 'Platform 7½', isCorrect: false },
      { text: 'Platform 9¾', isCorrect: true },
      { text: 'Platform 10¼', isCorrect: false },
      { text: 'Platform 13', isCorrect: false }
    ]
  },
  {
    questionText: 'What kind of creature is Dobby?',
    answerOptions: [
      { text: 'Goblin', isCorrect: false },
      { text: 'House-elf', isCorrect: true },
      { text: 'Hobgoblin', isCorrect: false },
      { text: 'Pixie', isCorrect: false }
    ]
  },
  {
    questionText: 'Which spell is commonly used to disarm an opponent?',
    answerOptions: [
      { text: 'Stupefy', isCorrect: false },
      { text: 'Expelliarmus', isCorrect: true },
      { text: 'Petrificus Totalus', isCorrect: false },
      { text: 'Protego', isCorrect: false }
    ]
  },
  {
    questionText: 'What creature lives in the Chamber of Secrets?',
    answerOptions: [
      { text: 'Acromantula', isCorrect: false },
      { text: 'Basilisk', isCorrect: true },
      { text: 'Dragon', isCorrect: false },
      { text: 'Dementor', isCorrect: false }
    ]
  },
  {
    questionText: 'Who teaches Potions during Harry’s first five years at Hogwarts?',
    answerOptions: [
      { text: 'Horace Slughorn', isCorrect: false },
      { text: 'Severus Snape', isCorrect: true },
      { text: 'Filius Flitwick', isCorrect: false },
      { text: 'Pomona Sprout', isCorrect: false }
    ]
  }
];

const medium = [
  {
    questionText: 'What phrase makes the Marauder’s Map go blank again?',
    answerOptions: [
      { text: 'Mischief Managed', isCorrect: true },
      { text: 'Nox', isCorrect: false },
      { text: 'Finite Incantatem', isCorrect: false },
      { text: 'Map Concealed', isCorrect: false }
    ]
  },
  {
    questionText: 'What type of dragon does Harry face during the first Triwizard task?',
    answerOptions: [
      { text: 'Swedish Short-Snout', isCorrect: false },
      { text: 'Chinese Fireball', isCorrect: false },
      { text: 'Hungarian Horntail', isCorrect: true },
      { text: 'Common Welsh Green', isCorrect: false }
    ]
  },
  {
    questionText: 'What form does Hermione’s Patronus take?',
    answerOptions: [
      { text: 'A hare', isCorrect: false },
      { text: 'An otter', isCorrect: true },
      { text: 'A doe', isCorrect: false },
      { text: 'A swan', isCorrect: false }
    ]
  },
  {
    questionText: 'Who gives Harry the Marauder’s Map?',
    answerOptions: [
      { text: 'Sirius Black', isCorrect: false },
      { text: 'Remus Lupin', isCorrect: false },
      { text: 'Fred and George Weasley', isCorrect: true },
      { text: 'Albus Dumbledore', isCorrect: false }
    ]
  },
  {
    questionText: 'What plant allows Harry to breathe underwater during the Triwizard Tournament?',
    answerOptions: [
      { text: 'Devil’s Snare', isCorrect: false },
      { text: 'Gillyweed', isCorrect: true },
      { text: 'Bubotuber', isCorrect: false },
      { text: 'Mandrake', isCorrect: false }
    ]
  },
  {
    questionText: 'Which object is used as the Portkey that takes Harry and Cedric to the graveyard?',
    answerOptions: [
      { text: 'The Triwizard Cup', isCorrect: true },
      { text: 'A golden egg', isCorrect: false },
      { text: 'A broomstick', isCorrect: false },
      { text: 'A silver goblet', isCorrect: false }
    ]
  },
  {
    questionText: 'What is the name of Hagrid’s giant half-brother?',
    answerOptions: [
      { text: 'Grawp', isCorrect: true },
      { text: 'Griphook', isCorrect: false },
      { text: 'Golgomath', isCorrect: false },
      { text: 'Gornuk', isCorrect: false }
    ]
  },
  {
    questionText: 'Who impersonates Mad-Eye Moody during Harry’s fourth year?',
    answerOptions: [
      { text: 'Peter Pettigrew', isCorrect: false },
      { text: 'Barty Crouch Jr.', isCorrect: true },
      { text: 'Lucius Malfoy', isCorrect: false },
      { text: 'Igor Karkaroff', isCorrect: false }
    ]
  },
  {
    questionText: 'What can heal a wound caused by basilisk venom?',
    answerOptions: [
      { text: 'Unicorn blood', isCorrect: false },
      { text: 'Phoenix tears', isCorrect: true },
      { text: 'Essence of dittany', isCorrect: false },
      { text: 'Mandrake potion', isCorrect: false }
    ]
  },
  {
    questionText: 'Which Horcrux does Harry destroy with a basilisk fang?',
    answerOptions: [
      { text: 'Marvolo Gaunt’s ring', isCorrect: false },
      { text: 'Tom Riddle’s diary', isCorrect: true },
      { text: 'Hufflepuff’s cup', isCorrect: false },
      { text: 'Ravenclaw’s diadem', isCorrect: false }
    ]
  }
];

const hard = [
  {
    questionText: 'What is the core of Hermione’s wand?',
    answerOptions: [
      { text: 'Phoenix feather', isCorrect: false },
      { text: 'Unicorn hair', isCorrect: false },
      { text: 'Dragon heartstring', isCorrect: true },
      { text: 'Veela hair', isCorrect: false }
    ]
  },
  {
    questionText: 'What is the name of Ravenclaw’s house ghost?',
    answerOptions: [
      { text: 'The Grey Lady', isCorrect: true },
      { text: 'The Fat Friar', isCorrect: false },
      { text: 'The Bloody Baron', isCorrect: false },
      { text: 'Nearly Headless Nick', isCorrect: false }
    ]
  },
  {
    questionText: 'What shape does Cho Chang’s Patronus take?',
    answerOptions: [
      { text: 'A doe', isCorrect: false },
      { text: 'A swan', isCorrect: true },
      { text: 'A hare', isCorrect: false },
      { text: 'An otter', isCorrect: false }
    ]
  },
  {
    questionText: 'What Quidditch team does Ron support?',
    answerOptions: [
      { text: 'Puddlemere United', isCorrect: false },
      { text: 'Holyhead Harpies', isCorrect: false },
      { text: 'Chudley Cannons', isCorrect: true },
      { text: 'Wimbourne Wasps', isCorrect: false }
    ]
  },
  {
    questionText: 'What is Nearly Headless Nick’s full name?',
    answerOptions: [
      { text: 'Sir Nicholas de Mimsy-Porpington', isCorrect: true },
      { text: 'Sir Nicholas of Godric’s Hollow', isCorrect: false },
      { text: 'Sir Nigel de Mimsy-Porpington', isCorrect: false },
      { text: 'Sir Nicholas Peverell', isCorrect: false }
    ]
  },
  {
    questionText: 'What is the name of the Black family house-elf?',
    answerOptions: [
      { text: 'Winky', isCorrect: false },
      { text: 'Hokey', isCorrect: false },
      { text: 'Kreacher', isCorrect: true },
      { text: 'Dobby', isCorrect: false }
    ]
  },
  {
    questionText: 'What does Xenophilius Lovegood mistake for the horn of a Crumple-Horned Snorkack?',
    answerOptions: [
      { text: 'An Erumpent horn', isCorrect: true },
      { text: 'A Graphorn horn', isCorrect: false },
      { text: 'A dragon horn', isCorrect: false },
      { text: 'A bicorn horn', isCorrect: false }
    ]
  },
  {
    questionText: 'What is the name of the executioner sent to kill Buckbeak?',
    answerOptions: [
      { text: 'Travers', isCorrect: false },
      { text: 'Walden Macnair', isCorrect: true },
      { text: 'Yaxley', isCorrect: false },
      { text: 'Augustus Rookwood', isCorrect: false }
    ]
  },
  {
    questionText: 'Which dragon guards the high-security vaults at Gringotts?',
    answerOptions: [
      { text: 'Hungarian Horntail', isCorrect: false },
      { text: 'Ukrainian Ironbelly', isCorrect: true },
      { text: 'Norwegian Ridgeback', isCorrect: false },
      { text: 'Hebridean Black', isCorrect: false }
    ]
  },
  {
    questionText: 'What is the first name of Professor Trelawney?',
    answerOptions: [
      { text: 'Septima', isCorrect: false },
      { text: 'Sybill', isCorrect: true },
      { text: 'Aurora', isCorrect: false },
      { text: 'Charity', isCorrect: false }
    ]
  }
];

export const QUIZ_DATA = { easy, medium, hard };

export const getQuestions = (level) => QUIZ_DATA[level] ?? QUIZ_DATA.medium;

export const COPY = {
  school: 'Hogwarts School of Witchcraft and Wizardry',
  heroTitle: 'The Trivia Trials',
  eyebrow: 'Your trial awaits',
  title: 'Test your wizarding knowledge',
  description: 'Ten questions stand between you and the title of true fan. Mind the trick answers \u2014 the Marauder\u2019s Map will not help you here.',
  note: '10 questions',
  ready: 'When you are ready',
  chooseLevel: 'Choose level',
  start: 'Begin',
  back: '\u2190 Back',
  answerKeys: ['A', 'B', 'C', 'D'],
}
