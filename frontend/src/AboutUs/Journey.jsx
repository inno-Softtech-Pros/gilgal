import { useEffect } from "react";
import "./About.css";
import "./Journey.css";

const IMG = "/images/about";

// Photos live in frontend/public/images/about/ (served from the site root).
const FOUNDERS_IMG = "/images/about/pastor-parents.jpg";
const CONGREGATION_IMG = "/images/about/journey-congregation.jpg";

const LED_BY = [
  "Multiple language pastors catering to our diverse congregation",
  "Committed ministry leaders overseeing various aspects of church life",
  "A group of devoted volunteers who serve in different capacities",
];

const PROVIDES = [
  "Spirit-filled worship services in multiple languages",
  "Biblical teaching and preaching",
  "Prayer meetings and intercessory groups",
  "Children and youth ministries",
  "Outreach and evangelism programs",
  "Discipleship and spiritual growth classes",
  "Community service initiatives",
];

export default function Journey() {
  // Always open the page from the top when arriving from the navbar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="journey">
      {/* Hero: same classes as the About Us page */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${IMG}/hero.jpg)` }}
      >
        <h1 className="about-hero__title">OUR JOURNEY</h1>
      </section>

      <div className="journey__container">
        <h2 className="journey__heading">Our Journey</h2>

        {/* Block 1: text + founders photo */}
        <section className="journey__row">
          <div className="journey__text">
            <p>
              Guided by the clear direction of the Holy Spirit in 1986, Pastor
              T. Samkutty and his wife, Mariamma, were called to Koramangala, a
              then-outlying area of Bangalore, to begin a ministry. With
              unwavering faith, they walked the streets, praying and weeping for
              the lost souls in the streets of Koramangala and adjoining areas.
              Thus birthed Gilgal AG Church, under the leadership of Assemblies
              of God in CDSIAG. Gilgal meaning "My reproach has been removed"
              was a testimony in the lives of Rev Samkutty and his family.
              Though the early years were marked by challenges and sacrifices,
              they persevered, trusting in God's promises.
            </p>
            <p>
              Through their dedication, countless lives have been touched and
              transformed by the work of Gilgal AG Church. Their prayers and
              tears have borne fruit, with the impact of their ministry still
              felt today.
            </p>
          </div>

          <figure className="journey__media">
            <img
              src={FOUNDERS_IMG}
              alt="Pastor T. Samkutty and Mrs. Mariamma Samkutty"
              loading="lazy"
            />
          </figure>
        </section>

        {/* Full-width paragraphs */}
        <section className="journey__wide">
          <p>
            Although Pastor Samkutty and Mrs. Mariamma Samkutty have been
            promoted to Glory, their legacy lives on. Their children, Rev. John
            Sam, Rev. Denny Sam and Merlin Tomy, and their families, have
            faithfully taken up the mantle, continuing to serve and expand the
            ministry in Koramangala.
          </p>
          <p>
            Gilgal AG Church has been a beacon of faith in Koramangala,
            Bangalore, for over three decades. What began as a humble vision to
            reach the lost in an area devoid of Pentecostal churches has
            blossomed into a vibrant spiritual community. From its modest
            beginnings, Gilgal AG has grown to include 3 branch churches and 5
            language services, serving a diverse congregation united in their
            love for Christ.
          </p>
        </section>

        {/* Block 2: congregation photo + lists */}
        <section className="journey__row journey__row--reverse">
          <figure className="journey__media journey__media--left">
            <img
              src={CONGREGATION_IMG}
              alt="Gilgal AG congregation during a worship service"
              loading="lazy"
            />
          </figure>

          <div className="journey__text">
            <p>
              Led by a team of dedicated pastors and spiritual leaders, Gilgal
              AG Church is blessed with:
            </p>
            <ul>
              {LED_BY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p>
              Together, we strive to create an environment where every member
              can grow, serve, and experience God's love.
            </p>

            <p>Gilgal AG Church provides:</p>
            <ul>
              {PROVIDES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}