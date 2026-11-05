// frontend/src/pages/events/events.jsx
import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import useFeatureHeader from "../../hooks/useFeatureHeader";
import "./events.css";

const FEATURE_HEADER = {
  backgroundImage: "/dark-sky-cross.jpeg",
  title: "Events",
  subtitle: "Discover what is happening at Gilgal AG Church this month"
};

const EVENTS = [
  {
    day: 1,
    month: 8,
    year: 2026,
    title: "Carmel Prayer",
    time: "5 PM to 8 PM",
    description: "A focused prayer gathering for every season of life. Together we seek the Lord and encourage one another.",
    tone: "purple"
  },
  {
    day: 2,
    month: 8,
    year: 2026,
    title: "Spiritual Emphasis Bible Study",
    time: "7 PM to 9 PM",
    description: "Wednesday Bible study with practical teaching and conversation.",
    tone: "green"
  },
  {
    day: 4,
    month: 8,
    year: 2026,
    title: "Cornerstone Prayer",
    time: "10 AM to 12 PM",
    description: "A community prayer meeting centered on intercession and faith.",
    tone: "orange"
  },
  {
    day: 6,
    month: 8,
    year: 2026,
    title: "Women's Fellowship",
    time: "7 PM to 9 PM",
    description: "A warm gathering for women to grow, connect, and encourage one another.",
    tone: "pink"
  },
  {
    day: 8,
    month: 8,
    year: 2026,
    title: "Sunday Service",
    time: "9 AM to 11 AM",
    description: "Join us for worship, fellowship, and a message from God's Word.",
    tone: "blue"
  },
  {
    day: 10,
    month: 8,
    year: 2026,
    title: "Youth Fellowship",
    time: "6 PM to 8 PM",
    description: "Worship, discussion, and activities for our young people.",
    tone: "yellow"
  },
  {
    day: 12,
    month: 8,
    year: 2026,
    title: "Sunday Service",
    time: "9 AM to 11 AM",
    description: "A joyful Sunday gathering for the whole church family.",
    tone: "blue"
  },
  {
    day: 13,
    month: 8,
    year: 2026,
    title: "Church Sports Day",
    time: "10 AM to 2 PM",
    description: "Team games, fellowship, and friendly competition for all ages.",
    tone: "orange"
  },
  {
    day: 15,
    month: 8,
    year: 2026,
    title: "Praise Quake",
    time: "6 PM to 9 PM",
    description: "An evening of energetic praise and heartfelt worship.",
    tone: "green"
  },
  {
    day: 19,
    month: 8,
    year: 2026,
    title: "Community Outreach",
    time: "4 PM to 7 PM",
    description: "Serving our neighborhood through prayer and practical support.",
    tone: "purple"
  },
  {
    day: 22,
    month: 8,
    year: 2026,
    title: "Sunday Service",
    time: "9 AM to 11 AM",
    description: "Sunday worship and teaching for the church family.",
    tone: "blue"
  },
  {
    day: 27,
    month: 8,
    year: 2026,
    title: "Prayer Night",
    time: "7 PM to 9 PM",
    description: "Come together to pray for the church, city, and the nations.",
    tone: "pink"
  }
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getEventTimestamp = (event) => {
  const startTime = event.time.match(/(\d+)\s*(AM|PM)/i);
  let hours = startTime ? Number(startTime[1]) : 0;
  const period = startTime?.[2]?.toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return new Date(event.year, event.month, event.day, hours).getTime();
};

export default function Events() {
  useFeatureHeader(FEATURE_HEADER);
  const [view, setView] = useState(new Date(2026, 8, 1));
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  const year = view.getFullYear();
  const month = view.getMonth();
  const grid = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      if (index < first)
        return { day: daysInPrev - first + index + 1, current: false, month: month - 1, year: month === 0 ? year - 1 : year };
      if (index >= first + daysInMonth)
        return { day: index - first - daysInMonth + 1, current: false, month: month + 1, year: month === 11 ? year + 1 : year };
      return { day: index - first + 1, current: true, month, year };
    });
  }, [year, month]);

  const sortedEvents = useMemo(() => [...EVENTS].sort((first, second) => getEventTimestamp(first) - getEventTimestamp(second)), []);

  const upcomingEvents = sortedEvents.filter((event) =>
    `${event.title} ${event.description}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  const drawerEvents =
    dateFilterActive && selectedDate
      ? sortedEvents.filter(
          (event) => event.day === selectedDate.day && event.month === selectedDate.month && event.year === selectedDate.year
        )
      : sortedEvents.filter((event) => `${event.title} ${event.description}`.toLowerCase().includes(query.trim().toLowerCase()));

  const changeMonth = (amount) => {
    setView(new Date(year, month + amount, 1));
    setSelectedDate(null);
    setDateFilterActive(false);
  };

  const openDate = (cell) => {
    const normalized = new Date(cell.year, cell.month, cell.day);
    setSelectedDate({
      day: normalized.getDate(),
      month: normalized.getMonth(),
      year: normalized.getFullYear()
    });
    setDateFilterActive(true);
  };

  return (
    <section className="events-page feature-page">
      <label className="events-search">
        <Search size={17} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisibleCount(3);
          }}
          placeholder="Search events..."
          aria-label="Search events"
        />
      </label>

      <div className="events-upcoming-heading">
        <p>What's next</p>
        <h1>Upcoming Events</h1>
      </div>

      <div className="events-feature-list" aria-label="Upcoming events">
        {upcomingEvents.slice(0, visibleCount).map((event) => (
          <article className="events-feature-card" key={`${event.day}-${event.title}`}>
            <div className="events-feature-image" />
            <div className="events-feature-body">
              <p className="events-meta">
                <CalendarDays size={13} /> {MONTHS[event.month].slice(0, 3).toUpperCase()} {event.day} · {event.time}
              </p>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div className="events-actions">
                <button type="button">Register</button>
                <button type="button" className="volunteer">
                  Volunteer with us
                </button>
              </div>
            </div>
          </article>
        ))}
        {upcomingEvents.length === 0 && <p className="events-empty">No upcoming events match your search.</p>}
      </div>

      {visibleCount < upcomingEvents.length && (
        <button type="button" className="events-more-button" onClick={() => setVisibleCount((count) => count + 3)}>
          More...
        </button>
      )}

      <div className="events-calendar-card">
        <h2>Event Calendar</h2>
        <div className="events-month-nav">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">
            <ChevronLeft size={22} />
          </button>
          <strong>
            {MONTHS[month]} {year}
          </strong>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
            <ChevronRight size={22} />
          </button>
        </div>
        <div className="events-calendar-grid events-weekdays">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="events-calendar-grid events-days">
          {grid.map((cell, index) => {
            const normalizedCell = new Date(cell.year, cell.month, cell.day);
            const eventCount = EVENTS.filter(
              (event) =>
                event.day === normalizedCell.getDate() &&
                event.month === normalizedCell.getMonth() &&
                event.year === normalizedCell.getFullYear()
            ).length;
            return (
              <button
                type="button"
                className={`${cell.current ? "" : "other-month"}`}
                key={`${cell.year}-${cell.month}-${index}`}
                onClick={() => openDate(cell)}
                aria-label={`Open events for ${MONTHS[cell.month]} ${cell.day}, ${cell.year}`}
              >
                <span>{cell.day}</span>
                {eventCount > 0 && <i aria-label={`${eventCount} events`} />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <>
          <button type="button" className="events-drawer-backdrop" onClick={() => setSelectedDate(null)} aria-label="Close events panel" />
          <aside className="events-drawer" aria-label="Events panel">
            <button type="button" className="events-drawer-close" onClick={() => setSelectedDate(null)} aria-label="Close events panel">
              <X size={22} />
            </button>

            <div className="events-drawer-header">
              <p>{dateFilterActive ? "Selected date" : "All events"}</p>
              <h2>{dateFilterActive ? `${MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}` : "Event Schedule"}</h2>
              {dateFilterActive && (
                <button type="button" className="events-filter-chip" onClick={() => setDateFilterActive(false)}>
                  <span>Show events for Selected Date</span>
                  <X size={14} aria-label="Remove date filter" />
                </button>
              )}
            </div>

            <div className="events-drawer-list">
              {drawerEvents.map((event) => (
                <article className={`events-drawer-item ${event.tone}`} key={`${event.year}-${event.month}-${event.day}-${event.title}`}>
                  <div className="events-date-block">
                    <span>{MONTHS[event.month].slice(0, 3).toUpperCase()}</span>
                    <strong>{event.day}</strong>
                  </div>
                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <small>{event.time}</small>
                  </div>
                </article>
              ))}
              {drawerEvents.length === 0 && <p className="events-empty">No events for this date.</p>}
            </div>
          </aside>
        </>
      )}
    </section>
  );
}
