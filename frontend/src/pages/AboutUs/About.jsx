import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, BookPlus, ChevronDown, Heart, Waves } from "lucide-react";
import "./About.css";

const IMG = "/images/about";

// Hands-praying icon (Phosphor duotone), not available in lucide-react.
const HandsPraying = ({ size = 28, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size} fill="currentColor" {...props}>
    <path opacity=".3" d="m14.87040625 12.93334375 -2.20729375 2.20729375c-0.101375 0.1013125 -0.23884375 0.15821875 -0.3821875 0.15821875 -0.14334375 0 -0.2808125 -0.05690625 -0.3821875 -0.15821875l-1.24016875 -1.24016875 2.9737 -2.9737 1.24016875 1.24016875c0.05035 0.05035 0.090225 0.11023125 0.11739375 0.17605625 0.02716875 0.06583125 0.041025 0.1363875 0.04081875 0.20755 -0.0002 0.0712375 -0.0144625 0.141725 -0.0419 0.20741875 -0.02750625 0.06569375 -0.06771875 0.1253 -0.11834375 0.17538125ZM1.1292 12.1669375c-0.10131875 0.10138125 -0.1582375 0.23884375 -0.1582375 0.3821875 0 0.14335 0.05691875 0.2808125 0.1582375 0.38219375l2.20729375 2.20931875c0.1013875 0.1013125 0.23885625 0.15821875 0.3821875 0.15821875 0.14333125 0 0.28080625 -0.05690625 0.3821875 -0.15821875l1.24016875 -1.24016875 -2.9737 -2.9737 -1.2381375 1.24016875Z" />
    <path d="m15.2529375 11.7844125 -2.44925 -2.44991875 -2.4641125 -8.12969375c-0.07001875 -0.2314875 -0.1960625 -0.44213125 -0.36691875 -0.613275 -0.17091875 -0.17114375 -0.381375 -0.29750625 -0.61278125 -0.36788125 -0.23134375 -0.07038125 -0.4765375 -0.08260625 -0.71375625 -0.03559375s-0.4592375 0.15179375 -0.64630625 0.3050875c-0.187075 -0.15329375 -0.40901875 -0.25808125 -0.64630625 -0.3050875 -0.237225 -0.0470125 -0.48235 -0.0347875 -0.71375625 0.03559375 -0.2314125 0.070375 -0.44186875 0.1967375 -0.6127375 0.36788125 -0.17088125 0.1711375 -0.296925 0.3817875 -0.36695625 0.613275L3.19594375 9.33516875l-2.44925 2.44924375c-0.2026375 0.20275625 -0.3164625 0.4776875 -0.3164625 0.764375 0 0.28669375 0.113825 0.561625 0.3164625 0.76438125l2.209325 2.20931875c0.1004125 0.10043125 0.21963125 0.1801125 0.35085 0.23445 0.13120625 0.05440625 0.27184375 0.0823875 0.4138625 0.0823875 0.14203125 0 0.2826625 -0.02798125 0.41386875 -0.0823875 0.13121875 -0.0543375 0.2504375 -0.13401875 0.35084375 -0.23445l3.26295625 -3.2649875c0.09049375 -0.09069375 0.1745 -0.18754375 0.2514125 -0.28993125 0.076975 0.1023875 0.16098125 0.1992375 0.2514125 0.28993125l3.26295625 3.26566875c0.10043125 0.100425 0.21965 0.18010625 0.35083125 0.23444375 0.13125 0.05440625 0.2718875 0.0823875 0.4138875 0.0823875 0.14205625 0 0.28263125 -0.02798125 0.41388125 -0.0823875 0.13118125 -0.0543375 0.2504 -0.13401875 0.35083125 -0.23444375l2.209325 -2.209325c0.100425 -0.10043125 0.18010625 -0.21965 0.23444375 -0.35083125 0.05440625 -0.13125 0.0823875 -0.2718875 0.0823875 -0.41388125s-0.02798125 -0.2826375 -0.0823875 -0.4138875c-0.0543375 -0.13118125 -0.13401875 -0.2504 -0.23444375 -0.35083125ZM3.72039375 14.7581125l-2.20865 -2.20864375 0.85764375 -0.85764375 2.209325 2.209325 -0.85831875 0.8569625Zm3.73874375 -4.4098625c0.00108125 0.2133 -0.04014375 0.42463125 -0.12138125 0.6219125 -0.0812375 0.19720625 -0.200725 0.37630625 -0.35170625 0.52701875l-1.6436375 1.6389125 -2.20865 -2.20864375 0.922525 -0.9232c0.0629625 -0.0629875 0.1093875 -0.14050625 0.13516875 -0.22573125l2.5006 -8.260125c0.02534375 -0.09191875 0.08346875 -0.17138125 0.16335 -0.223425 0.07995625 -0.0520375 0.176125 -0.07305625 0.27040625 -0.05909375 0.09435 0.0139625 0.1803125 0.06194375 0.24168125 0.13489375 0.06143125 0.07295625 0.09400625 0.16584375 0.09164375 0.2611625V10.34825Zm1.5544375 1.14893125c-0.15091875 -0.1507125 -0.270475 -0.3298125 -0.3517125 -0.52701875 -0.08116875 -0.19728125 -0.1224625 -0.4086125 -0.12138125 -0.6219125V1.62990625c0.00006875 -0.0936375 0.033725 -0.18415625 0.0948875 -0.2550625 0.06116875 -0.07090625 0.1457125 -0.117475 0.238375 -0.1312375 0.0925875 -0.01375 0.18706875 0.00621875 0.2662125 0.05628125 0.0791375 0.0500625 0.13766875 0.1268875 0.16490625 0.216475l2.50060625 8.26013125c0.02581875 0.08521875 0.07225 0.1627375 0.13516875 0.225725l0.97929375 0.97929375 -2.25730625 2.16269375 -1.64905 -1.647025Zm3.2656625 3.26093125 -0.84885625 -0.84953125 2.25663125 -2.1626875 0.80086875 0.803575 -2.20864375 2.20864375Z" />
  </svg>
);

// Diversity icon (Streamline Sharp Fill Material), not available in lucide-react.
const Diversity = ({ size = 28, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M1 20v-4c0 -0.48335 0.170835 -0.89585 0.5125 -1.2375S2.266665 14.25 2.75 14.25h3.525c0.28335 0 0.55415 0.07085 0.8125 0.2125 0.25835 0.14165 0.47915 0.3375 0.6625 0.5875 0.48335 0.7 1.1 1.24165 1.85 1.625 0.75 0.38335 1.55 0.575 2.4 0.575 0.85 0 1.65 -0.19165 2.4 -0.575 0.75 -0.38335 1.375 -0.925 1.875 -1.625 0.18335 -0.25 0.4 -0.44585 0.65 -0.5875s0.51665 -0.2125 0.8 -0.2125h3.525c0.48335 0 0.89585 0.17085 1.2375 0.5125C22.82915 15.10415 23 15.51665 23 16v4H16.5v-2.975c-0.6 0.55 -1.2875 0.975 -2.0625 1.275 -0.775 0.3 -1.5875 0.45 -2.4375 0.45 -0.85 0 -1.65835 -0.15 -2.425 -0.45 -0.76665 -0.3 -1.45835 -0.725 -2.075 -1.275V20H1Zm11 -4.25c-0.58335 0 -1.14585 -0.1375 -1.6875 -0.4125 -0.54165 -0.275 -0.97915 -0.65415 -1.3125 -1.1375 -0.26665 -0.38335 -0.5875 -0.69165 -0.9625 -0.925 -0.375 -0.23335 -0.77915 -0.39165 -1.2125 -0.475 0.48335 -0.5 1.24165 -0.88335 2.275 -1.15 1.03335 -0.26665 2 -0.4 2.9 -0.4 0.9 0 1.87085 0.13335 2.9125 0.4 1.04165 0.26665 1.80415 0.65 2.2875 1.15 -0.43335 0.08335 -0.8375 0.24165 -1.2125 0.475 -0.375 0.23335 -0.69585 0.54165 -0.9625 0.925 -0.33335 0.48335 -0.77085 0.8625 -1.3125 1.1375 -0.54165 0.275 -1.1125 0.4125 -1.7125 0.4125ZM4 12.5c-0.75 0 -1.395835 -0.27085 -1.9375 -0.8125C1.520835 11.14585 1.25 10.5 1.25 9.75c0 -0.76665 0.270835 -1.41665 0.8125 -1.95C2.604165 7.26665 3.25 7 4 7c0.766665 0 1.41665 0.26665 1.95 0.8s0.8 1.18335 0.8 1.95c0 0.75 -0.26665 1.39585 -0.8 1.9375S4.766665 12.5 4 12.5Zm16 0c-0.75 0 -1.39585 -0.27085 -1.9375 -0.8125S17.25 10.5 17.25 9.75c0 -0.76665 0.27085 -1.41665 0.8125 -1.95S19.25 7 20 7c0.76665 0 1.41665 0.26665 1.95 0.8s0.8 1.18335 0.8 1.95c0 0.75 -0.26665 1.39585 -0.8 1.9375S20.76665 12.5 20 12.5Zm-8 -3c-0.75 0 -1.39585 -0.27085 -1.9375 -0.8125S9.25 7.5 9.25 6.75c0 -0.76665 0.27085 -1.41665 0.8125 -1.95C10.60415 4.266665 11.25 4 12 4c0.76665 0 1.41665 0.266665 1.95 0.8 0.53335 0.53335 0.8 1.18335 0.8 1.95 0 0.75 -0.26665 1.39585 -0.8 1.9375S12.76665 9.5 12 9.5Z" />
  </svg>
);

// Cheer icon (Streamline Sharp Fill Material), not available in lucide-react.
const Cheer = ({ size = 28, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M7.95 4.925 7.1 2.4l0.95 -0.325 0.85 2.525 -0.95 0.325ZM11.5 3.75v-2.5h1v2.5h-1Zm4.55 1.175 -0.95 -0.325 0.85 -2.525 0.95 0.325 -0.85 2.525Zm5.85 18.1 -7 -1.1 -1.625 -5.25 1.4 -2.625 1.4 4.4 0.675 -0.225 -2.925 -9.15 2.975 -1.6 4.65 8.775H23l-1.1 6.775Zm-19.8 0L1 16.25h1.55l4.65 -8.775 2.975 1.6 -2.925 9.15 0.675 0.225 1.4 -4.4 1.4 2.625 -1.625 5.25 -7 1.1Z" />
  </svg>
);

// Prayer icon (Streamline Atlas), not available in lucide-react.
// The card passes a strokeWidth meant for 24px lucide icons; this one is drawn on a 16px grid, so it is ignored.
// eslint-disable-next-line no-unused-vars
const Prayer = ({ size = 28, strokeWidth, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.5 -0.5 16 16"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeMiterlimit="10"
    strokeWidth="1"
    {...props}
  >
    <path d="M3.30625 9.89375V5.699999999999999a1.2 1.2 0 0 0 -1.1937499999999999 -1.1937499999999999 1.2 1.2 0 0 0 -1.2 1.1937499999999999v4.55625a2.36875 2.36875 0 0 0 0.525 1.4937500000000001l1.875 2.3375000000000004v0.625" />
    <path d="m4.50625 11.09375 -0.8250000000000001 -0.8250000000000001a1.25 1.25 0 0 1 -0.375 -0.8937499999999999 1.25 1.25 0 0 1 1.25 -1.25 1.25 1.25 0 0 1 0.8999999999999999 0.36874999999999997l1.66875 1.6312499999999999a1.25 1.25 0 0 1 0.375 0.8937499999999999v3.66875" />
    <path d="M11.693750000000001 9.89375V5.699999999999999a1.2 1.2 0 0 1 1.1937499999999999 -1.1937499999999999 1.2 1.2 0 0 1 1.1937499999999999 1.1937499999999999v4.55625a2.36875 2.36875 0 0 1 -0.525 1.4937500000000001l-1.875 2.3375000000000004v0.625" />
    <path d="m10.493749999999999 11.09375 0.8250000000000001 -0.8250000000000001a1.25 1.25 0 0 0 0.375 -0.8999999999999999 1.25 1.25 0 0 0 -1.25 -1.25 1.25 1.25 0 0 0 -0.8999999999999999 0.36874999999999997L7.875 10.125a1.25 1.25 0 0 0 -0.375 0.8937499999999999v3.66875" />
    <path d="m7.5 0.3125 0 6.5874999999999995" />
    <path d="m5.10625 2.5062499999999996 4.7875 0" />
  </svg>
);

// Arrow-upward-group icon (Streamline Atlas), not available in lucide-react.
// Drawn on a 16px grid, so the card's lucide-sized strokeWidth is ignored.
// eslint-disable-next-line no-unused-vars
const GrowthGroup = ({ size = 28, strokeWidth, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.5 -0.5 16 16"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeMiterlimit="10"
    strokeWidth="1"
    {...props}
  >
    <path d="M10.4875 14.6875a1.7999999999999998 1.7999999999999998 0 0 1 1.7937500000000002 -1.7937500000000002 1.7937500000000002 1.7937500000000002 0 0 1 1.7937500000000002 1.7937500000000002" />
    <path d="M11.087499999999999 10.5a1.1937499999999999 1.1937499999999999 0 1 0 2.3874999999999997 0 1.1937499999999999 1.1937499999999999 0 1 0 -2.3874999999999997 0" />
    <path d="M5.706250000000001 14.6875A1.7999999999999998 1.7999999999999998 0 0 1 7.5 12.893749999999999a1.7999999999999998 1.7999999999999998 0 0 1 1.7937500000000002 1.7937500000000002" />
    <path d="M6.30625 10.5a1.1937499999999999 1.1937499999999999 0 1 0 2.3874999999999997 0 1.1937499999999999 1.1937499999999999 0 1 0 -2.3874999999999997 0" />
    <path d="M0.925 14.6875a1.7937500000000002 1.7937500000000002 0 0 1 1.7937500000000002 -1.7937500000000002 1.7999999999999998 1.7999999999999998 0 0 1 1.7937500000000002 1.7937500000000002" />
    <path d="M1.525 10.5a1.1937499999999999 1.1937499999999999 0 1 0 2.3874999999999997 0 1.1937499999999999 1.1937499999999999 0 1 0 -2.3874999999999997 0" />
    <path d="m2.71875 6.9125000000000005 3.5875000000000004 -3.5812500000000003 1.7937500000000002 1.7937500000000002 4.18125 -4.1875" />
    <path d="m9.89375 0.9375 2.3874999999999997 0 0 2.39375" />
  </svg>
);

const PASTOR_PARAGRAPHS = [
  "Our Senior Pastor has been faithfully serving the Lord for over 25 years, with more than two decades dedicated to Gilgal AG Church. Since 2006 he has led our English Worship service, guiding the congregation with a heart committed to God's Word — alongside his wife, Gladsy, and their twin daughters, Liza and Annie.",
  "The English service is blessed with dedicated and prayerful leaders who, like the pillars in the temple of God, have been instrumental in the church's growth. Their steadfastness reflects the early church, where believers \"devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.\"",
  "Our congregation is richly nourished by the Word of God and united by a bond of love, as Christ commanded — standing together, lifting each other up in prayer and fellowship.",
];

const BELIEFS = [
  {
    title: "The Holy Bible",
    img: "bible.jpg",
    text: "We believe the Bible is the inspired, infallible Word of God, our supreme authority for faith and practice.",
  },
  {
    title: "Salvation Through Christ",
    img: "salvation.jpg",
    text: "We believe in salvation through Jesus Christ alone, by grace through faith, not by works.",
  },
  {
    title: "Water Baptism",
    img: "baptism.jpg",
    text: "We believe in baptism by immersion as an outward expression of an inward transformation.",
  },
  {
    title: "Baptism in the Holy Spirit",
    img: "holy-spirit.jpg",
    text: "We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues.",
  },
  {
    title: "The Great Commission",
    img: "commission.jpg",
    text: "We believe in fulfilling the Great Commission by spreading the Gospel to all nations.",
  },
  {
    title: "The Church",
    img: "church.jpg",
    text: "We believe the Church is the body of Christ, called to worship, fellowship, and serve together.",
  },
];

// `icon` is optional: cards without one show an empty gold circle.
const DOCTRINES = [
  {
    icon: BookOpen,
    title: "The Word of God",
    ref: "Acts 2:42",
    text: "The early believers “devoted themselves to the apostles' teaching.”",
  },
  {
    icon: HandsPraying,
    title: "Prayer",
    ref: "Acts 1:14, 2:42",
    text: "The early church continually engaged in prayer, both individually and corporately.",
  },
  {
    icon: Waves,
    title: "Baptism in the Holy Spirit",
    ref: "Acts 2:42",
    text: "The early believers “devoted themselves to the apostles' teaching.”",
  },
  {
    icon: BookPlus,
    title: "Evangelism & Mission",
    ref: "Acts 1:8, 2:41",
    text: "“You will be my witnesses… to the ends of the earth,” and the rapid growth of the church through preaching.",
  },
  {
    icon: Diversity,
    title: "Fellowship & Community",
    ref: "Acts 2:42-47",
    text: "The early believers shared meals, prayed together, and supported one another.",
  },
  {
    icon: Cheer,
    title: "Worship",
    ref: "Acts 2:47",
    text: "They were “praising God and enjoying the favor of all the people.”",
  },
  {
    icon: Prayer,
    title: "Signs, Wonders, & Healing",
    ref: "Acts 3:6-10, 5:12",
    text: "The apostles performed miraculous signs and healings through the power of the Holy Spirit.",
  },
  {
    icon: GrowthGroup,
    title: "Discipleship & Growth",
    ref: "Acts 2:41, 6:7",
    text: "The church continually grew in numbers and strength as new believers were discipled.",
  },
  {
    icon: Heart,
    title: "Generosity & Care for the Needy",
    ref: "Acts 2:44-45, 4:32-35",
    text: "Early Christians shared their possessions and ensured no one was in need.",
  },
];

// `a` can be a string or JSX (the streaming answer includes a link).
const FAQS = [
  {
    q: "When does your Main Service happen?",
    a: (
      <>
        Our Sunday Service happens every Sunday from 9 am to 11 am in the
        Gilgal AG Church, Singasandra. For more details, please refer our{" "}
        <Link to="/events">Event Page</Link>.
      </>
    ),
  },
  {
    q: "What language is your Service in?",
    a: "Our services are conducted in English, and Hindi worship songs may be included during some services.",
  },
  {
    q: "Are your Services streamed online?",
    a: (
      <>
        Yes our services are streamed online on our Youtube page.
        <br />
        <br />
        {/* Replace the # with the real YouTube channel URL */}
        <a href="#" target="_blank" rel="noopener noreferrer">
          Gilgal AG International Worship Centre - YouTube
        </a>
      </>
    ),
  },
  {
    q: "Do you have anything for children?",
    a: "Yes, we do have our Sunday School Classes which happens every Sunday from 10 am to 11 am in the Gilgal AG Church, Singasandra.",
  },
  {
    q: "What should I wear?",
    a: "There is no dress code for attending our church. We encourage you to wear modest, comfortable clothing. Whether you choose casual or formal attire, you are welcome just as you are.",
  },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="about">
      {/* Hero */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${IMG}/hero.jpg)` }}
      >
        <h1 className="about-hero__title">ABOUT US</h1>
      </section>

      {/* Our Pastors */}
      <section className="about-section about-pastors">
        <h2 className="about-heading">Our Pastors</h2>
        <div className="about-pastors__card">
          <img
            className="about-pastors__photo"
            src={`${IMG}/pastor-family.jpg`}
            alt="Rev. Denny Sam with his wife Gladsy and their twin daughters, Liza and Annie"
          />
          <div className="about-pastors__body">
            <p className="about-pastors__role">SENIOR PASTOR</p>
            <h3 className="about-pastors__name">Rev. Denny Sam</h3>
            {PASTOR_PARAGRAPHS.map((text) => (
              <p key={text.slice(0, 20)}>{text}</p>
            ))}
            <p className="about-pastors__verse">Acts 2:42 · John 13:34–35</p>
          </div>
        </div>

        {/* Replace with videos/photos when the content is ready */}
        {/*<div className="about-media">
          <div className="about-media__placeholder" />
          <div className="about-media__placeholder" />
        </div>*/}
      </section>

      {/* App promo */}
      <section className="about-app">
        <div className="about-app__inner">
          <div className="about-app__text">
            <p className="about-app__eyebrow">GILGAL AG CHURCH PRESENTS</p>
            <h2 className="about-app__title">
              Experience faith at your fingertips: Introducing
              <span> OurChurchLink App!</span>
            </h2>
            <p className="about-app__copy">
              Stay spiritually anchored wherever life takes you. Experience
              uninterrupted connection to Gilgal AG: stream live services with
              real-time prayer chat, receive dawn devotion, also access pastor
              sermon notes offline anytime.
            </p>
            <div className="about-app__download">
              <strong>DOWNLOAD NOW</strong>
              {/* Replace the # with the real store links */}
              <a href="#" aria-label="Download on the App Store">
                <img src={`${IMG}/app-store.png`} alt="" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src={`${IMG}/google-play.png`} alt="" />
              </a>
            </div>
          </div>
          <div className="about-app__phone">
            <img src={`${IMG}/app-phone.png`} alt="OurChurchLink app" />
          </div>
        </div>
      </section>

      {/* Our Belief */}
      <section className="about-section about-beliefs">
        <h2 className="about-heading">Our Belief</h2>
        <div className="about-beliefs__grid">
          {BELIEFS.map(({ title, text, img }) => (
            <article key={title} className="belief-card">
              <img src={`${IMG}/${img}`} alt="" loading="lazy" />
              <div className="belief-card__body">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Our Doctrinal Foundation */}
      <section className="about-doctrine">
        <div className="about-doctrine__inner">
          <h2 className="about-heading about-heading--light">
            Our Doctrinal Foundation
          </h2>
          <div className="about-doctrine__grid">
            {DOCTRINES.map(({ icon: Icon, title, ref, text }) => (
              <article key={title} className="doctrine-card">
                <span className="doctrine-card__icon">
                  {Icon && <Icon size={28} strokeWidth={1.75} aria-hidden="true" />}
                </span>
                <h3>{title}</h3>
                <p className="doctrine-card__ref">{ref}</p>
                <p className="doctrine-card__text">{text}</p>
              </article>
            ))}
          </div>
          <p className="about-doctrine__summary">
            These pillars, drawn from Acts, form the foundation of Gilgal AG
            Church focused on living out the teachings of Christ, empowered by
            the Holy Spirit, and committed to building God’s Kingdom.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="about-section about-faq">
        <h2 className="about-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={q}
                className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-item__question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span>{q}</span>
                  <ChevronDown size={32} strokeWidth={3} aria-hidden="true" />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="faq-item__answer"
                  hidden={!isOpen}
                >
                  <p>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}