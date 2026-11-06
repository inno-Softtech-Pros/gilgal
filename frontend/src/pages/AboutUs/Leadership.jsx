import { useEffect } from "react";
import "./About.css"; // reuses the About Us hero so all About pages share one header
import "./Leadership.css";

const IMG = "/images/about";
const PHOTOS = "/images/about/leadership";

const TEAM = [
  { name: "Rev. Denny Sam", role: "President & Pastor", photo: "denny-sam.jpg" },
  { name: "Philip C. Varghese", role: "Secretary" },
  { name: "Biju Sam", role: "Treasurer" },
  { name: "Bincy Philip", role: "Sunday School Director" },
  { name: "Joel George", role: "Youth Director", photo: "joel-george.jpg" },
  { name: "Jessy Yeshudas", role: "Sister's Fellowship Coordinator" },
];

export default function Leadership() {
  // Always open the page from the top when arriving from the navbar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="leadership">
      {/* Hero: same classes as the About Us page */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${IMG}/hero.jpg)` }}
      >
        <h1 className="about-hero__title">OUR TEAM</h1>
      </section>

      {/* Team grid */}
      <section className="leadership__team">
        <h2 className="leadership__heading">Meet our Leadership Team</h2>

        <div className="leadership__grid">
          {TEAM.map(({ name, role, photo }) => (
            <article key={name} className="leader-card">
              <div className="leader-card__avatar">
                {photo && (
                  <img
                    src={`${PHOTOS}/${photo}`}
                    alt={name}
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="leader-card__name">{name}</h3>
              <p className="leader-card__role">{role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Our Leadership */}
      <section className="leadership__about">
        <div className="leadership__about-inner">
          <h2 className="leadership__heading">Our Leadership</h2>
          <h3 className="leadership__subheading">Shepherding with Purpose</h3>
          <p>
            At Gilgal AG Church, leadership is not about position but about
            serving people with Christ's heart. Every pastor, elder, ministry
            leader, and volunteer is committed to helping individuals grow
            spiritually while building a Christ-centered community rooted in
            prayer, discipleship, and love.
          </p>
        </div>
      </section>
    </div>
  );
}