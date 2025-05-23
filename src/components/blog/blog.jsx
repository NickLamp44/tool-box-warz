// Blogs: Basic Blog w hero at top, text & photos, gallery at bottom, comment section
// options for video blogs

// Frameworks & Libraries

// Pages & Components

// Styling
import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Typography, Divider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BlogArticle() {
  return (
    <Container className="mt-5">
      {/* Blog Hero */}
      <section className="position-relative text-center mb-4">
        {/* Background Image */}
        <img
          src="/Img/basicBlog/ProToolBoxCheck_1.webp"
          alt="Blog hero"
          className="img-fluid w-100 rounded"
          style={{ height: "400px", objectFit: "cover" }}
        />

        {/* Dark Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "0.375rem", // match .rounded
          }}
        ></div>

        {/* Overlay Content */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-white"
          style={{ zIndex: 2 }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            BlogTitle
          </Typography>
          <Typography variant="subtitle1">By BlogAuthor</Typography>
          <Typography variant="subtitle2" className="text-light">
            BlogPblshDate
          </Typography>
          <div className="mt-2">
            <Badge bg="light" text="dark" className="me-1">
              DIY
            </Badge>
            <Badge bg="light" text="dark" className="me-1">
              Pro
            </Badge>
            <Badge bg="light" text="dark">
              Racing
            </Badge>
          </div>
        </div>
      </section>

      {/* Secondary Title */}
      <Typography variant="h4" className="mt-5 mb-3">
        From Weekend Warrior to Pro Factory Rider. Here are the 9 tools you
        can’t live without when between the tape
      </Typography>

      {/* Intro Paragraph */}
      <Typography paragraph>
        Having the right set of tools makes getting the job done much easier and
        alot of the time safer. In this article, we are going to be taking a
        close look at Max Morgan’s tool box that he carries from race to
        race.Inside you will find just about everything you need to get through
        a race weekend, from your standard set of hex keys to hub bearing press
        tools. Check out which tools are his favorites and which ones he can't
        go without!
      </Typography>

      <Divider className="my-4" />

      {/* Section 1: The Case */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          The Case
        </Typography>

        {/* Para Text & Images */}
        <Typography paragraph>
          This hard case is a Pedro’s Master Tool Kit Box. Pedro’s offers their
          Master Box both empty and as a full kit. I started with an empty
          box—that way I could fill the box with exactly the tools I wanted to
          use. Having a hard case that seals itself watertight keeps everything
          nice and safe. There are certainly times when the toolbox gets thrown
          in the back of the truck and gets beaten around on the way to the
          mountain. I’ve used this same box for the last three to four years
          with no problems. It has been all the way around the world multiple
          times, and so having this bulletproof case from Pedro’s has made all
          the difference keeping my expensive tools inside safe. There are other
          brands out there like Pelican that make quality hard cases that can be
          used for just about anything. I went with the Pedro’s case at the end
          of the day because the pallets that came already installed made laying
          my tools out easy without having to do much customization.
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_2.webp"
          alt="Pedros Master Toolkit Case"
          className="img-fluid rounded my-3"
        />
      </section>

      {/* Section 2: The Layers */}
      <section className="mb-5">
        <Typography variant="h5" gutterBottom>
          The Layers
        </Typography>

        {/* Para Text & Images */}
        <Typography paragraph>
          Just like the hex L-key set from Wera...
        </Typography>
        <Typography paragraph>
          All the pretty colors help you find the size you need...
        </Typography>
        <Row>
          <Col md={6}>
            <img
              src="/Img/basicBlog/ProToolBoxCheck_3.webp"
              alt="Main Lid Layer"
              className="img-fluid rounded my-3"
            />
          </Col>
          <Col md={6}>
            <img
              src="/Img/basicBlog/ProToolBoxCheck_4.webp"
              alt="Main Bottom Layer"
              className="img-fluid rounded my-3"
            />
          </Col>
        </Row>
      </section>

      {/* Section 3: Tools You Cannot Go Without */}
      <section className="mb-5">
        <Typography variant="h3" gutterBottom>
          Tools You Cannot Go Without
        </Typography>

        {/* Para Text & Images */}
        <Typography variant="h5" gutterBottom>
          Wera Hex Plus Allen Keys:
        </Typography>

        {/* para 1 */}
        <Typography paragraph>
          Everyone needs a set of Allen keys to work on their bike. No matter if
          you are working in a professional bike shop, doing regular bike
          maintenance at home in the garage, or have a travel tool case like
          this one, you will definitely be using a set of L-shape Allen keys.I
          choose to use the Wera Hex Plus Allen keys because they are made from
          high-quality materials, their Hex Plus design grabs bolt heads nicely
          without damaging them, and the color coordination makes picking up
          each size second nature. Over time, you just know the orange hex key
          is a 5mm. Instead of picking up three wrenches and trying to read
          which size is which, whenever you need a 5mm, you just pick up the
          orange one without thinking about it.
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_15.webp"
          alt="Hex Keys"
          className="img-fluid rounded my-3"
        />
        <Typography variant="h5" gutterBottom>
          Wera Hex Plus Torx Keys:
        </Typography>
        <Typography paragraph>
          Just like the hex L-key set from Wera, I decided to get the same style
          for Torx as well. This set includes sizes from T8 all the way up to
          T40. Although not all of these sizes are commonly seen on mountain
          bikes, I like to keep them in the toolbox anyway. They’re perfect for
          installing brake rotor bolts and removing brake bleed port screws. All
          the pretty colors help you find the size you need quickly and easily.
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_16.webp"
          alt="Torx Set"
          className="img-fluid rounded my-3"
        />
        <Typography variant="h5" gutterBottom>
          Topeak SmartGauge D2 Digital Tire Pressure Gauge:
        </Typography>
        <Typography paragraph>
          I’m someone that checks tire pressure before every ride. The Topeak
          digital tire pressure gauge gives the same reading every time and is
          perfect for dialing in your tire pressure for different riding
          conditions. If you’re someone who travels to ride bikes or gets a ride
          to the trailhead with a buddy, it’s a good idea to bring your own tire
          pressure gauge. Your tires are your bike’s first form of suspension,
          so riding with the ideal tire pressure can make all the difference on
          the trail.
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_13.webp"
          alt="Pressure Gauge"
          className="img-fluid rounded my-3"
        />
      </section>

      {/* Section 4: Less Obvious Tools */}
      <section className="mb-5">
        <Typography variant="h3" gutterBottom>
          What are some of the less obvious tools?
        </Typography>
        <Typography variant="h5" gutterBottom>
          Metal Tape Measurer:
        </Typography>
        <Typography paragraph>
          Believe it or not, I use this small metal ruler almost as much as any
          tool in my toolbox. It’s perfect for measuring and setting sag, and
          great for matching exactly where all of your controls are—from one
          side of the handlebars to the other.Whenever I pull the forks off to
          do a lower leg service, having the metal measuring tape is handy when
          you need to slide those forks back to exactly the same height in the
          crowns. If you’re someone very particular with your bike setup, you’ll
          find yourself grabbing this tape measurer more often than not.
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_17.webp"
          alt="MetalTape Measurer"
          className="img-fluid rounded my-3"
        />
        <Typography variant="h5" gutterBottom>
          Torque Wrench:
        </Typography>
        <Typography paragraph>
          Carrying a torque wrench in your toolbox may seem obvious, but for a
          long time, I was the rider and mechanic who didn’t think I really
          needed one. And yes, you can get away without it and get things close
          by hand. But now that I have and use a torque wrench regularly, I
          wonder what took me so long to get on board.I carry two different
          torque wrenches from Park Tool: the Park Tool TW-5.2 and the Park Tool
          TW-6.2.The TW-5.2 is 9 inches long, uses a 3/8” drive, and is what I
          use most often, with an adjustable torque range of 2–14 N·m. The
          TW-6.2 is just over 14 inches long, also uses a 3/8” drive, and has a
          torque range of 10–50 N·m.The larger TW-6.2 comes in handy when
          torquing down both the bottom bracket and crankset. Using any kind of
          torque wrench ensures every bolt is tightened to the correct
          spec—every time!
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_8.webp"
          alt="ParkTool Torque Wrench"
          className="img-fluid rounded my-3"
        />
        <Typography variant="h5" gutterBottom>
          Bearing Press and Removal Tools:
        </Typography>
        <Typography paragraph>
          Specific bearing press tools are always handy to have—and when you
          don’t have them, you can waste a lot of time fighting a bearing to
          come out. Having this Industry Nine wheel bearing removal and press
          kit makes swapping hub bearings a breeze. I don’t need to change hub
          bearings very often, but when I do, I wouldn’t want to attempt it
          without these tools. Making sure bearings are pressed in securely and
          straight is exactly what you want. Some of these specialty tools are
          just cool to keep in your toolbox!
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_9.webp"
          alt="Bearing Press"
          className="img-fluid rounded my-3"
        />
        <Typography variant="h5" gutterBottom>
          Wera Hex Head Screwdrivers:
        </Typography>
        <Typography paragraph>
          Using multi-tools or tools that fit a variety of fasteners is handy
          most of the time—but other times, it’s definitely nice to have a tool
          that serves a single purpose. Because I’m constantly using 4mm, 5mm,
          and 6mm Allen keys, I decided to get a few dedicated hex head
          screwdrivers from Wera. I also have a T25 in the same screwdriver
          handle that I use all the time. These are very handy and make quick
          work when building or assembling a bike—especially before bolts are
          torqued to spec.
        </Typography>
        <img
          src="/Img/basicBlog/ProToolBoxCheck_11.webp"
          alt="Hex Screwdrivers"
          className="img-fluid rounded my-3"
        />
      </section>

      {/* Section 5: More Essentials */}
      <section className="mb-5">
        <Typography variant="h3" gutterBottom>
          More Essentials
        </Typography>
        <Typography variant="h5" gutterBottom>
          Knipex 86 03 180 – 7” Pliers:
        </Typography>
        <Typography paragraph>
          The Knipex wrench pliers are one of those tools that can replace ten
          others. These pliers are excellent because the clamping jaws always
          close parallel to each other, making it easy to grip flat or square
          surfaces securely. I use the Knipex pliers most often as a wrench on a
          cassette tool, for servicing brake lines, and even for straightening
          dents in rims. The 7-inch size is ideal—they’re small enough to be
          lightweight and easy to work with, but long enough to torque something
          down when needed.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Wera 1/4” Drive Zyklop Speed Ratchet:
        </Typography>
        <Typography paragraph>
          This Wera 1/4” drive socket wrench has always been one of my favorite
          tools because it makes everything go faster. At first glance, it looks
          like a conventional ratchet, but the swivel head feature lets you
          rotate the head and use it like a ratcheting screwdriver as well. I
          keep a range of socket bits that are commonly used on my bike and find
          myself reaching for this tool more than almost any other.
        </Typography>
        <Row>
          <Col md={6}>
            <img
              src="/Img/basicBlog/ProToolBoxCheck_14.webp"
              alt="Knipex Pliers"
              className="img-fluid rounded my-3"
            />
          </Col>
          <Col md={6}>
            <img
              src="/Img/basicBlog/ProToolBoxCheck_12.webp"
              alt="Ratchet Tool"
              className="img-fluid rounded my-3"
            />
          </Col>
        </Row>
      </section>

      {/* Gallery & Comments come later */}
    </Container>
  );
}
