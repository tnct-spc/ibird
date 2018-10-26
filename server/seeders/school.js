'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schools',
      [
        {
          name: 'tokyo-ct',
          background_image: 'minimal_background1.png',
          background_images: [
            'minimal_background1.png',
            'minimal_background2.png',
            'minimal_background3.png',
            'minimal_background4.png',
            'minimal_background5.png'
          ],
          timetable: JSON.stringify(
            {
              "station": "徳島駅",
              "line": "ＪＲ牟岐線",
              "timetable1": {
                "direction": "阿南・牟岐方面",
                "0": [],
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "5": [
                  {
                    "min": "44",
                    "kind": "各駅停車",
                    "going": "海部"
                  }
                ],
                "6": [
                  {
                    "min": "47",
                    "kind": "各駅停車",
                    "going": "海部"
                  }
                ],
                "7": [
                  {
                    "min": "18",
                    "kind": "各駅停車",
                    "going": "桑野"
                  },
                  {
                    "min": "51",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "8": [
                  {
                    "min": "20",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "47",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  }
                ],
                "9": [
                  {
                    "min": "20",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "10": [
                  {
                    "min": "10",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  },
                  {
                    "min": "54",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "11": [
                  {
                    "min": "39",
                    "kind": "各駅停車",
                    "going": "海部"
                  }
                ],
                "12": [
                  {
                    "min": "17",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "45",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  }
                ],
                "13": [
                  {
                    "min": "12",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "36",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "14": [
                  {
                    "min": "24",
                    "kind": "各駅停車",
                    "going": "海部"
                  },
                  {
                    "min": "53",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "15": [
                  {
                    "min": "24",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  },
                  {
                    "min": "31",
                    "kind": "各駅停車",
                    "going": "海部"
                  }
                ],
                "16": [
                  {
                    "min": "4",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "47",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  }
                ],
                "17": [
                  {
                    "min": "29",
                    "kind": "各駅停車",
                    "going": "海部"
                  }
                ],
                "18": [
                  {
                    "min": "1",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "8",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "26",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  }
                ],
                "19": [
                  {
                    "min": "4",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "33",
                    "kind": "各駅停車",
                    "going": "海部"
                  },
                  {
                    "min": "55",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  }
                ],
                "20": [
                  {
                    "min": "32",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "21": [
                  {
                    "min": "27",
                    "kind": "各駅停車",
                    "going": "牟岐"
                  }
                ],
                "22": [
                  {
                    "min": "10",
                    "kind": "各駅停車",
                    "going": "阿南"
                  },
                  {
                    "min": "42",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ],
                "23": [
                  {
                    "min": "38",
                    "kind": "各駅停車",
                    "going": "阿南"
                  }
                ]
              },
              "timetable2": {
                "direction": "高松・阿波池田方面",
                "0": [],
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "5": [
                  {
                    "min": "39",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "41",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "48",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  }
                ],
                "6": [
                  {
                    "min": "2",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "9",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "35",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "37",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "47",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  }
                ],
                "7": [
                  {
                    "min": "0",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "6",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "21",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "31",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  }
                ],
                "8": [
                  {
                    "min": "12",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "23",
                    "kind": "各駅停車",
                    "going": "岡山"
                  },
                  {
                    "min": "26",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "41",
                    "kind": "各駅停車",
                    "going": "阿波川島"
                  },
                  {
                    "min": "46",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  }
                ],
                "9": [
                  {
                    "min": "2",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "9",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "23",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "50",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  }
                ],
                "10": [
                  {
                    "min": "2",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "19",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "28",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "55",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "58",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  }
                ],
                "11": [
                  {
                    "min": "9",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "31",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "45",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  }
                ],
                "12": [
                  {
                    "min": "1",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "16",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "24",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "39",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  }
                ],
                "13": [
                  {
                    "min": "5",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "17",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "25",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "50",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "57",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  }
                ],
                "14": [
                  {
                    "min": "17",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "26",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "46",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "57",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  }
                ],
                "15": [
                  {
                    "min": "1",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "28",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "32",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "38",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "48",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "55",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  }
                ],
                "16": [
                  {
                    "min": "5",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "29",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "32",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "46",
                    "kind": "各駅停車",
                    "going": "岡山"
                  },
                  {
                    "min": "54",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "55",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  }
                ],
                "17": [
                  {
                    "min": "17",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "28",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "31",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "35",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "57",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  }
                ],
                "18": [
                  {
                    "min": "0",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "6",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "26",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  },
                  {
                    "min": "30",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "35",
                    "kind": "各駅停車",
                    "going": "引田"
                  },
                  {
                    "min": "46",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "57",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  }
                ],
                "19": [
                  {
                    "min": "5",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "8",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "27",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "32",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "47",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "58",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  }
                ],
                "20": [
                  {
                    "min": "17",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "20",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "31",
                    "kind": "各駅停車",
                    "going": "阿波川島"
                  },
                  {
                    "min": "34",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "46",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  }
                ],
                "21": [
                  {
                    "min": "6",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "16",
                    "kind": "各駅停車",
                    "going": "板野"
                  },
                  {
                    "min": "34",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "46",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  }
                ],
                "22": [
                  {
                    "min": "2",
                    "kind": "各駅停車",
                    "going": "高松(香川県)"
                  },
                  {
                    "min": "14",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "38",
                    "kind": "各駅停車",
                    "going": "阿波池田"
                  },
                  {
                    "min": "51",
                    "kind": "各駅停車",
                    "going": "板野"
                  }
                ],
                "23": [
                  {
                    "min": "9",
                    "kind": "各駅停車",
                    "going": "鳴門"
                  },
                  {
                    "min": "37",
                    "kind": "各駅停車",
                    "going": "穴吹"
                  }
                ]
              }
            }),
          message: '',
          messageEndDate: new Date(1970, 1, 1)
        }
      ]
      , {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schools', null, {})
  }
}
