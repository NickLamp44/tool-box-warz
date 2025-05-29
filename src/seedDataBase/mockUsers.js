const mockUsers = [
  {
    "id": "7s2jrlYleZ8XofChzlT4",
    "userName": "NickLamp",
    "firstName": "Nick",
    "lastName": "Lamparelli",
    "homeTown": "Boston,Ma",
    "email": "Nick@TBW.com",
    "role": "admin",
    "dateJoined": "2025-05-23T20:02:28.336Z",
    "pastOrders": [
      "YQEZl1rK6",
      "l4L3zJ6O",
      "E4xIZ0Au"
    ],
    "favoritedPosts": [
      "pro-toolbox-checklist"
    ],
    "authoredPosts": [
      "Trek Factory ShowCASE",
      "How to Service Your RockShox Zeb"
    ],
    "comments": [
      "9uEUE3hxYkmUswmN70P1",
      "N9vQwGXgIjBrXH2KdpPD",
      "pUmR6PuXIzw7t4Mfvn38",
      "M5x6zXCdWc99UelixYQl"
    ],
    "passwordHash": "$2b$10$wc6nxzUaGROdgAvtauUL3uypbuE4Xu8aAhWkkRhdrV.48YM3XUiRu"
  },
  {
    "id": "Gg5FIk1e1y357gzUHHN7",
    "userName": "JamieHiker",
    "firstName": "Jamie",
    "lastName": "Holloway",
    "homeTown": "Boulder,CO",
    "email": "jamie.h@trailhub.com",
    "role": "user",
    "dateJoined": "2025-02-14T16:10:05.221Z",
    "pastOrders": [
      "KH2aP0qM9",
      "vU3rT2WsL"
    ],
    "favoritedPosts": [
      "mountain-bike-essentials"
    ],
    "authoredPosts": [
      "Best Trails in Colorado"
    ],
    "comments": [
      "B2XpNcK7FjO4",
      "Yh8W3LmNvX9"
    ],
    "passwordHash": "$2b$10$L/b.i1xL09bKznzJU/yZyOZN4G8bgdL9eKnw4kds2B1lqUR9v1LR2"
  },
  {
    "id": "rktYT9B7bRI0sgQLeyQF",
    "userName": "CassieWren",
    "firstName": "Cassie",
    "lastName": "Wren",
    "homeTown": "Flagstaff,AZ",
    "email": "cassie.wren@biker.com",
    "role": "user",
    "dateJoined": "2025-01-07T10:45:13.892Z",
    "pastOrders": [
      "XzA8Ty6nR5"
    ],
    "favoritedPosts": [],
    "authoredPosts": [],
    "comments": [],
    "passwordHash": "$2b$10$7d27o6iMIK9yCoaGqbUVuuQ9sl8l9lpzMjFysD0yJw2ARf7boGOwK"
  },
  {
    "id": "Xgai2RbFitiYVLL4Kl45",
    "userName": "RideOrDie21",
    "firstName": "Leo",
    "lastName": "Nguyen",
    "homeTown": "Seattle,WA",
    "email": "leo.nguyen@riders.com",
    "role": "moderator",
    "dateJoined": "2024-11-30T08:30:00.000Z",
    "pastOrders": [
      "Pz5JkZ0Mw",
      "Xj6YdUaK3",
      "Wq9IvGbRt"
    ],
    "favoritedPosts": [
      "bike-maintenance-101",
      "how-to-choose-a-helmet"
    ],
    "authoredPosts": [
      "Fixing a Slipped Chain"
    ],
    "comments": [
      "R7qKzWyhU9f",
      "Zm38PtHLaQo",
      "KcJ8WrXpEz2"
    ],
    "passwordHash": "$2b$10$xflGvzTLttbTNBN0fUsfUe19AgEGYdtDkUm4ToHG88kHTw2sNIpCa"
  },
  {
    "id": "5QK379gy2dubpn8DwsF1",
    "userName": "GravelQueen",
    "firstName": "Nina",
    "lastName": "Martinez",
    "homeTown": "Portland,OR",
    "email": "nina.martinez@gravel.com",
    "role": "user",
    "dateJoined": "2025-04-05T22:15:17.556Z",
    "pastOrders": [
      "YxJpZt4Bn8"
    ],
    "favoritedPosts": [
      "gravel-riding-gear-guide"
    ],
    "authoredPosts": [],
    "comments": [
      "Ha8NzTyWLqp"
    ],
    "passwordHash": "$2b$10$Bb.JS9ulvzVEA.vuHTDdIeiYGVbAknhy3FC2OfiISTLl5HWyxI4lK"
  },
  {
    "id": "a9T7nX52bQdW0RpVj8gL",
    "userName": "TrailJunkie",
    "firstName": "Maya",
    "lastName": "Kendall",
    "homeTown": "Asheville,NC",
    "email": "maya.k@trailjunkie.com",
    "role": "user",
    "dateJoined": "2024-12-20T14:33:19.112Z",
    "pastOrders": [
      "Ur8NkX5aVq"
    ],
    "favoritedPosts": [
      "suspension-setup-tips"
    ],
    "authoredPosts": [],
    "comments": [
      "bX4GvHuAqNz"
    ],
    "passwordHash": "$2b$10$QBGlu0n4l3pliado/CV4eOJmkNj/DmFeoZ5Odsvx3kU9Hh2V2uaWS"
  },
  {
    "id": "fG2uPQ73nVszJK1W8qRz",
    "userName": "WrenchBoss",
    "firstName": "Mark",
    "lastName": "O'Reilly",
    "homeTown": "San Diego,CA",
    "email": "mark@wrenchboss.com",
    "role": "admin",
    "dateJoined": "2024-10-05T09:02:00.000Z",
    "pastOrders": [
      "Me5VzLoK1",
      "Wx9QzR3Jh"
    ],
    "favoritedPosts": [
      "tool-storage-solutions"
    ],
    "authoredPosts": [
      "Bleeding Your Brakes Made Easy"
    ],
    "comments": [
      "M8LdXc6KqR2",
      "R7WsFkPqLz1"
    ],
    "passwordHash": "$2b$10$U1mwi/xpa/EAnPPMU9D3o.vKovAnZHzcBiy6oKIsBnN7vCMRMrFUK"
  },
  {
    "id": "Tz4P8qLEK1r67HjObn5A",
    "userName": "DirtMaster",
    "firstName": "Andre",
    "lastName": "Bailey",
    "homeTown": "Moab,UT",
    "email": "andre.b@ridebig.com",
    "role": "moderator",
    "dateJoined": "2025-03-12T11:00:13.000Z",
    "pastOrders": [
      "LdQ5Gh9uO2",
      "Rx8WtZnEq"
    ],
    "favoritedPosts": [
      "downhill-tire-guide"
    ],
    "authoredPosts": [
      "Conquering Moab’s Toughest Trails"
    ],
    "comments": [
      "LrW7Hq9DNa",
      "Xq8WvGyNe9"
    ],
    "passwordHash": "$2b$10$fEKWFSc0iFBavM7Ez8QeguoxWq2rJBGULZyDSydh3IzTwNFBukpdi"
  },
  {
    "id": "dK0Hp9WEJl5uGxMrFtYz",
    "userName": "BikeTechie",
    "firstName": "Sophie",
    "lastName": "Tran",
    "homeTown": "Austin,TX",
    "email": "sophie.tran@biketechie.io",
    "role": "user",
    "dateJoined": "2025-05-01T18:45:55.341Z",
    "pastOrders": [
      "Jh2vXp9Om3"
    ],
    "favoritedPosts": [
      "best-gps-trackers"
    ],
    "authoredPosts": [],
    "comments": [
      "Bc9ErThQMz"
    ],
    "passwordHash": "$2b$10$FQwztBIFNMRb1HqvNBTjGut6ZZRa/ujMgH1wI5JrT3TPK9sH9ZIlq"
  },
  {
    "id": "XLqRt59mX8DzUeO3FvKg",
    "userName": "CoastRider",
    "firstName": "Eli",
    "lastName": "Peters",
    "homeTown": "Santa Cruz,CA",
    "email": "eli@coastrider.com",
    "role": "user",
    "dateJoined": "2024-08-22T07:21:01.250Z",
    "pastOrders": [
      "Pe4LzNrYq2",
      "Mz1YqUlFx7"
    ],
    "favoritedPosts": [
      "ocean-trail-routes"
    ],
    "authoredPosts": [],
    "comments": [
      "Jm9ZqLaDwY",
      "Vq7WpRnQfT"
    ],
    "passwordHash": "$2b$10$JrFFvrlmAZ0DFFREufcxW.FDZ7vbuIk1KRH6YSRQzLlsRGpoCAmIy"
  },
  {
    "id": "OeYxP61qNz3KRLVwXm9A",
    "userName": "SingleTrackKing",
    "firstName": "Devon",
    "lastName": "Hill",
    "homeTown": "Bend,OR",
    "email": "devon.h@trackking.com",
    "role": "user",
    "dateJoined": "2025-01-18T15:33:17.112Z",
    "pastOrders": [
      "VxY6LpNt9z"
    ],
    "favoritedPosts": [],
    "authoredPosts": [
      "Singletrack Tips for Beginners"
    ],
    "comments": [],
    "passwordHash": "$2b$10$RC3cEyd/2Ppl0XuLv5HcC.xk.Xq2mf.wG1BceNUxI0wPv2zcWHsQ."
  },
  {
    "id": "Qm67LpETrbUO93nZVfa3",
    "userName": "FrameBuilder",
    "firstName": "Isaac",
    "lastName": "Cho",
    "homeTown": "Denver,CO",
    "email": "isaac.cho@handbuiltframes.net",
    "role": "admin",
    "dateJoined": "2025-05-10T13:01:00.000Z",
    "pastOrders": [
      "Np7VzTrLg9"
    ],
    "favoritedPosts": [
      "custom-frame-tutorial"
    ],
    "authoredPosts": [
      "Steel vs Carbon: What’s Right for You?"
    ],
    "comments": [
      "Rm8HpQnZTq",
      "Fz1PqMrKjW"
    ],
    "passwordHash": "$2b$10$qSCgSA1TdXfWER8eY6.K9.XxGIwLbnZ4UxeHN4y7fjR7Huv0f9OcG"
  },
  {
    "id": "W8Qr6LYoNzMJyFVpK9Ba",
    "userName": "CityCruiser",
    "firstName": "Tasha",
    "lastName": "Lee",
    "homeTown": "Chicago,IL",
    "email": "tasha.lee@citypedal.co",
    "role": "user",
    "dateJoined": "2025-02-28T19:40:09.910Z",
    "pastOrders": [],
    "favoritedPosts": [
      "urban-bike-accessories"
    ],
    "authoredPosts": [],
    "comments": [
      "Lm7QvNzWpP"
    ],
    "passwordHash": "$2b$10$/KYaz/rIo811Vb1SbkzLTeyhxDI5X8bDgqzduEto5mNJ8BE3db8Mq"
  },
  {
    "id": "Ewz83YnOjZ1tQrLcXKmF",
    "userName": "BikeDad",
    "firstName": "Trevor",
    "lastName": "Wallace",
    "homeTown": "Salt Lake City,UT",
    "email": "trevor.w@bikelife.com",
    "role": "user",
    "dateJoined": "2024-09-05T06:23:00.000Z",
    "pastOrders": [
      "Zh4TxVqYp9"
    ],
    "favoritedPosts": [],
    "authoredPosts": [],
    "comments": [],
    "passwordHash": "$2b$10$Fd93ZhSS9QPntKIX/S77uefZl0FUfMFOwb05dRc1WVPpCXg.yMADa"
  },
  {
    "id": "VFpR2XKgNz8UwPtqMa76",
    "userName": "FlowHunter",
    "firstName": "Jules",
    "lastName": "Vega",
    "homeTown": "Boise,ID",
    "email": "jules.vega@flowtrailz.org",
    "role": "moderator",
    "dateJoined": "2025-05-21T21:11:10.653Z",
    "pastOrders": [
      "Qr8NzTgXp1",
      "Pz9JvNuOe4"
    ],
    "favoritedPosts": [
      "trail-etiquette-guide"
    ],
    "authoredPosts": [
      "What Makes a Trail Flow?"
    ],
    "comments": [
      "Fq9UtZrLoA",
      "Wm1YzKtPnL"
    ],
    "passwordHash": "$2b$10$fEH3UJq4QSs6xXGb9nJd1eiWPHGZP/i.j7b/2l0rqu.gPckn7C.ha"
  }
];
module.exports = { mockUsers };