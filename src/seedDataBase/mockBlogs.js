// /seedBlog.js

const mockBlogs = [
  {
    id: "pro-toolbox-checklist",
    title: "BlogTitle",
    subtitle:
      "From Weekend Warrior to Pro Factory Rider. Here are the 9 tools you can’t live without when between the tape",
    authorName: "BlogAuthor",
    publishedDate: "2024-11-03",
    tags: ["DIY", "Pro", "Racing"],
    heroImage: {
      src: "/Img/basicBlog/ProToolBoxCheck_1.webp",
      alt: "Blog hero",
    },
    sections: [
      // Section: Intro
      {
        type: "intro",
        paragraphs: [
          "Having the right set of tools makes getting the job done much easier and alot of the time safer. In this article, we are going to be taking a close look at Max Morgan’s tool box that he carries from race to race. Inside you will find just about everything you need to get through a race weekend, from your standard set of hex keys to hub bearing press tools. Check out which tools are his favorites and which ones he can't go without!",
        ],
      },

      // Section: The Case
      {
        type: "section",
        heading: "The Case",
        paragraphs: [
          "This hard case is a Pedro’s Master Tool Kit Box. Pedro’s offers their Master Box both empty and as a full kit. I started with an empty box—that way I could fill the box with exactly the tools I wanted to use. Having a hard case that seals itself watertight keeps everything nice and safe. There are certainly times when the toolbox gets thrown in the back of the truck and gets beaten around on the way to the mountain. I’ve used this same box for the last three to four years with no problems. It has been all the way around the world multiple times, and so having this bulletproof case from Pedro’s has made all the difference keeping my expensive tools inside safe. There are other brands out there like Pelican that make quality hard cases that can be used for just about anything. I went with the Pedro’s case at the end of the day because the pallets that came already installed made laying my tools out easy without having to do much customization.",
        ],
        images: [
          {
            src: "/Img/basicBlog/ProToolBoxCheck_2.webp",
            alt: "Pedros Master Toolkit Case",
          },
        ],
      },

      // Section: The Layers
      {
        type: "section",
        heading: "The Layers",
        paragraphs: [
          "Just like the hex L-key set from Wera...",
          "All the pretty colors help you find the size you need...",
        ],
        images: [
          {
            src: "/Img/basicBlog/ProToolBoxCheck_3.webp",
            alt: "Main Lid Layer",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_4.webp",
            alt: "Main Bottom Layer",
          },
        ],
      },

      // Section: The Tools You Cant Go Without
      {
        type: "section",
        heading: "Tools You Cannot Go Without",
        paragraphs: [
          "Wera Hex Plus Allen Keys - Everyone needs a set of allen keys to work on their bike. No matter if you are working in a professional bike shop, doing regular bike maintenance at home in the garage, or have a travel tool case like this one, you will definitely be using a set of L-shape allen keys. I choose to use the Wera Hex Plus allen keys because they are made from high quality materials, there Hex Plus design grabs bolt heads nicely without damaging them, and the color coordination makes picking up each size second nature. Over time you just know the orange hex key is a 5mm. Instead for picking up three wrenches and trying to read which size is which, whenever you need a 5mm you just pick up the orange one without thinking about it.",
          "Wera Torx L-Key Set - Just like the hex L-key set from Wera, I decided to get the same style for Torx as well. This set includes a T8 all the way up to T40. Although not all of these sizes are commonly seen on mountain bikes, I like to keep them in the tool box anyway. They are perfect for installing brake rotor bolts and removing brake bleed port screws. All the pretty colors help you find the size you need quick and easy.",
          "Topeak SmartGauge D2 Digital Tire Pressure Gauge - I'm someone that checks tire pressure before every ride. The Topeak digital tire pressure gauge gets the same reading every time and is perfect for dialing in your tire pressure for different riding conditions. If you are someone that travels to go ride bikes or if you are getting a ride to the trail head with a buddy, it’s a good idea to bring your own tire pressure gauge. Your tires are your bike’s first form of suspension and so riding with the ideal tire pressure can make all the difference on the trail.",
        ],
        images: [
          {
            src: "/Img/basicBlog/ProToolBoxCheck_15.webp",
            alt: "Hex Keys",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_16.webp",
            alt: "Torx Set",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_13.webp",
            alt: "Pressure Gauge",
          },
        ],
      },

      // Section: What are Some Less Obvious
      {
        type: "section",
        heading: "What are some of the less obvious tools?",
        paragraphs: [
          "Metal Tape Measurer – Believe it or not, I use this small metal ruler almost as much as any tool in my toolbox. It’s perfect for measuring and setting sag, and great for matching exactly where all of your controls are from one side of the handlebars to the other. Whenever I pull the forks off to do a lower leg service, having the metal measuring tape is handy when you need to slide those forks back to exactly the same height in the crowns. If you are someone very particular with your bike setup, you will find yourself grabbing this tape measurer more times than not.",
          "Torque Wrench- Carrying a torque wrench in your tool box may seem more obvious than not, but forever I was the rider and mechanic that didn't think I really needed a torque wrench. And yes, you can get away without one and get things close by hand.  Now that I have and use a torque wrench on a regular basis, I wonder what took me so long to get on the program. I carry two different torque wrenches from Park Tool; the Park Tool TW 5.2 and the Park Tool TW 6.2. The 5.2 is 9 inches in length, uses a 3/8” drive, and what get used the most with an adjustable torque range of 2-14 N*m. The 6.2 is just over 14 inches long, also uses a 3/8” drive, and has an adjustable torque range of 10-50 N*m. The larger TW-6.2 comes in handy when torquing down both the bottom bracket and crankset. Using any kind of torque wrench, you can make sure every bolt is torqued to the correct spec every time! ",
          "Bearing Press And Removal Tools- Specific bearing press tools are always handy to have, and when you don’t have them, you can waist a lot of time fighting a bearing to come out. Having this Industry Nine wheel bearing removal and press kit makes swapping hub bearings a breeze. I don’t need to change hub bearings very often, but when I do, I wouldn’t want to give it a go without these tools. Making sure bearings are pressed in securely and straight is exactly what you want. Some of these specialty tools are cool to keep in your tool box!",
          "Wera Hex Head Screwdrivers - Using multi tools or tools that can fit a variety of different fasteners is handy most of the time. Other times, it is certainly nice to have a tool that serves only purpose. Because I am constantly using 4mm, 5mm, and 6mm allen keys, I decided to get a few dedicated hex head screwdrivers from Wera. I also have a T25 in the same screwdriver handle that I use all the time. These are very handy and make quick work when building or assembling a bike before bolts all get torqued to spec. ",
        ],
        images: [
          {
            src: "/Img/basicBlog/ProToolBoxCheck_17.webp",
            alt: "Metal Tape Measurer",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_8.webp",
            alt: "ParkTool Torque Wrench",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_9.webp",
            alt: "Bearing Press",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_11.webp",
            alt: "Hex Screwdrivers",
          },
        ],
      },

      // Section: More Essentials
      {
        type: "section",
        heading: "More Essentials",
        paragraphs: [
          "Kinpex86 03 180 7 in Pliers- The Knipex wrench pliers are one of those tools that replaces ten others. These pliers are great because the clamping jaws always close parallel to each other, making it easy to clamp down on square surfaces. I use the Knipex pliers most of the time as a wrench on a cassette tool, servicing brake lines, and even straightening dents in rims. The 7 inch pliers are great because they are small enough to be lightweight and easy to work with, but they are also long enough to torque something down if needed.",
          "Wera 1/4 Drive Zyklop Speed Ratchet– This Wera 1/4” drive socket wrench has always been one of my favorite tools to use because it makes things go much faster. At a quick glance, the Wera ratchet looks just the same as a conventional ratchet, but with the swivel head feature, the can spin the head of the ratchet around and use it as a ratcheting screwdriver as well. I have a range of socket bits that are common for my bike and find myself grabbing this tool most of the time.",
        ],
        images: [
          {
            src: "/Img/basicBlog/ProToolBoxCheck_14.webp",
            alt: "Knipex Pliers",
          },
          {
            src: "/Img/basicBlog/ProToolBoxCheck_12.webp",
            alt: "Ratchet Tool",
          },
        ],
      },
    ],
  },
];

module.exports = { mockBlogs };
