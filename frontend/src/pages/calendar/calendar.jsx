// frontend/src/pages/calendar/calendar.jsx
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import useFeatureHeader from "../../hooks/useFeatureHeader";
import apiClient from "../../config/axios";
import "./calendar.css";

const FEATURE_HEADER = {
  backgroundImage: "",
  title: "Events",
  subtitle: "Discover what is happening at Gilgal AG Church this month"
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TONES = [
  { name: "purple", color: "#8f78d4" },
  { name: "green", color: "#58b778" },
  { name: "orange", color: "#d89a52" },
  { name: "pink", color: "#e87982" },
  { name: "blue", color: "#5797c7" },
  { name: "yellow", color: "#d7b657" }
];

const transformEvent = (event, index) => {
  const [year, month, day] = event.date.split("-").map(Number);
  return {
    ...event,
    day,
    month: month - 1,
    year,
    time: event.timings,
    tone: TONES[index % TONES.length].name,
    color: TONES[index % TONES.length].color
  };
};

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
  const [view, setView] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilterActive, setDateFilterActive] = useState(false);

  const year = view.getFullYear();
  const month = view.getMonth();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
        const lastDay = new Date(year, month + 1, 0).getDate();
        const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`;

        const res = await apiClient.get("/calendar", {
          params: { startDate, endDate, status: "scheduled" }
        });
        if (!res.data.success) throw new Error("Failed to fetch events");
        setEvents(res.data.events.map(transformEvent));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [year, month]);

  
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

  const sortedEvents = useMemo(() => [...events].sort((a, b) => getEventTimestamp(a) - getEventTimestamp(b)), [events]);

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
      {loading && <p className="events-empty">Loading events...</p>}
      {error && <p className="events-empty">Could not load events.</p>}
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
            const dayEvents = events.filter((event) =>
              event.day === normalizedCell.getDate() &&
              event.month === normalizedCell.getMonth() &&
              event.year === normalizedCell.getFullYear()
            ).slice(0, 3);

            return (
              <button
                type="button"
                className={`${cell.current ? "" : "other-month"}`}
                key={`${cell.year}-${cell.month}-${index}`}
                onClick={() => openDate(cell)}
                aria-label={`Open events for ${MONTHS[cell.month]} ${cell.day}, ${cell.year}`}
              >
                <span>{cell.day}</span>
                {dayEvents.length > 0 && (
                  <span className="events-day-dots" aria-label={`${dayEvents.length} events`}>
                    {dayEvents.map((ev, i) => (
                      <i key={i} style={{ background: ev.color }} />
                    ))}
                  </span>
                )}
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
