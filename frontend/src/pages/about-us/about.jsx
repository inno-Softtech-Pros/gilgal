// frontend/src/pages/about-us/about.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, BookPlus, ChevronDown, Heart, Waves } from "lucide-react";
// import apiClient from "../../config/axios";
import { Cheer, Diversity, GrowthGroup, HandsPraying, Prayer } from "../../components/customIcons";
import useFeatureHeader from "../../hooks/useFeatureHeader";
import "./about.css";

const FEATURE_HEADER = {
  backgroundImage: "/images/heroes/about-us-hero.jpg",
  title: "About Us",
  subtitle: "<Replace with suitable subtitle>"
};

/* ---------- Image paths (put these files in /public/images) ---------- */
const IMG = "/images/about";

const PASTOR_PARAGRAPHS = [
  "Our Senior Pastor has been faithfully serving the Lord for over 25 years, with more than two decades dedicated to Gilgal AG Church. Since 2006 he has led our English Worship service, guiding the congregation with a heart committed to God's Word — alongside his wife, Gladsy, and their twin daughters, Liza and Annie.",
  "The English service is blessed with dedicated and prayerful leaders who, like the pillars in the temple of God, have been instrumental in the church's growth. Their steadfastness reflects the early church, where believers \"devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.\"",
  "Our congregation is richly nourished by the Word of God and united by a bond of love, as Christ commanded — standing together, lifting each other up in prayer and fellowship."
];

const BELIEFS = [
  {
    title: "The Holy Bible",
    img: "bible.jpg",
    text: "We believe the Bible is the inspired, infallible Word of God, our supreme authority for faith and practice."
  },
  {
    title: "Salvation Through Christ",
    img: "salvation.jpg",
    text: "We believe in salvation through Jesus Christ alone, by grace through faith, not by works."
  },
  {
    title: "Water Baptism",
    img: "baptism.jpg",
    text: "We believe in baptism by immersion as an outward expression of an inward transformation."
  },
  {
    title: "Baptism in the Holy Spirit",
    img: "holy-spirit.jpg",
    text: "We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues."
  },
  {
    title: "The Great Commission",
    img: "commission.jpg",
    text: "We believe in fulfilling the Great Commission by spreading the Gospel to all nations."
  },
  {
    title: "The Church",
    img: "church.jpg",
    text: "We believe the Church is the body of Christ, called to worship, fellowship, and serve together."
  }
];

// `icon` is optional: cards without one show an empty gold circle.
const DOCTRINES = [
  {
    icon: BookOpen,
    title: "The Word of God",
    ref: "Acts 2:42",
    text: "The early believers “devoted themselves to the apostles' teaching.”"
  },
  {
    icon: HandsPraying,
    title: "Prayer",
    ref: "Acts 1:14, 2:42",
    text: "The early church continually engaged in prayer, both individually and corporately."
  },
  {
    icon: Waves,
    title: "Baptism in the Holy Spirit",
    ref: "Acts 2:42",
    text: "The early believers “devoted themselves to the apostles' teaching.”"
  },
  {
    icon: BookPlus,
    title: "Evangelism & Mission",
    ref: "Acts 1:8, 2:41",
    text: "“You will be my witnesses… to the ends of the earth,” and the rapid growth of the church through preaching."
  },
  {
    icon: Diversity,
    title: "Fellowship & Community",
    ref: "Acts 2:42-47",
    text: "The early believers shared meals, prayed together, and supported one another."
  },
  {
    icon: Cheer,
    title: "Worship",
    ref: "Acts 2:47",
    text: "They were “praising God and enjoying the favor of all the people.”"
  },
  {
    icon: Prayer,
    title: "Signs, Wonders, & Healing",
    ref: "Acts 3:6-10, 5:12",
    text: "The apostles performed miraculous signs and healings through the power of the Holy Spirit."
  },
  {
    icon: GrowthGroup,
    title: "Discipleship & Growth",
    ref: "Acts 2:41, 6:7",
    text: "The church continually grew in numbers and strength as new believers were discipled."
  },
  {
    icon: Heart,
    title: "Generosity & Care for the Needy",
    ref: "Acts 2:44-45, 4:32-35",
    text: "Early Christians shared their possessions and ensured no one was in need."
  }
];

// `a` can be a string or JSX (the streaming answer includes a link).
const FAQS = [
  {
    q: "When does your Main Service happen?",
    a: (
      <>
        Our Sunday Service happens every Sunday from 9 am to 11 am in the Gilgal AG Church, Singasandra. For more details, please refer our{" "}
        <Link to="/events">Event Page</Link>.
      </>
    )
  },
  {
    q: "What language is your Service in?",
    a: "Our services are conducted in English, and Hindi worship songs may be included during some services."
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
    )
  },
  {
    q: "Do you have anything for children?",
    a: "Yes, we do have our Sunday School Classes which happens every Sunday from 10 am to 11 am in the Gilgal AG Church, Singasandra."
  },
  {
    q: "What should I wear?",
    a: "There is no dress code for attending our church. We encourage you to wear modest, comfortable clothing. Whether you choose casual or formal attire, you are welcome just as you are."
  }
];

export default function About() {
  useFeatureHeader(FEATURE_HEADER);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="about">
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
          <h2 className="about-heading about-heading--light">Our Doctrinal Foundation</h2>
          <div className="about-doctrine__grid">
            {DOCTRINES.map(({ icon: Icon, title, ref, text }) => (
              <article key={title} className="doctrine-card">
                <span className="doctrine-card__icon">{Icon && <Icon size={28} strokeWidth={1.75} aria-hidden="true" />}</span>
                <h3>{title}</h3>
                <p className="doctrine-card__ref">{ref}</p>
                <p className="doctrine-card__text">{text}</p>
              </article>
            ))}
          </div>
          <p className="about-doctrine__summary">
            These pillars, drawn from Acts, form the foundation of Gilgal AG Church focused on living out the teachings of Christ, empowered
            by the Holy Spirit, and committed to building God’s Kingdom.
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
              <div key={q} className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
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
                <div id={`faq-panel-${i}`} className="faq-item__answer" hidden={!isOpen}>
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
