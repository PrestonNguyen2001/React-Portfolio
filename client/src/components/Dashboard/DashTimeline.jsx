import { useState, useEffect } from "react";

const DashTimeline = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    date: "",
    icon: "",
    location: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/timeline");
        if (!response.ok) {
          throw new Error("Failed to fetch timeline data");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    try {
      const response = await fetch("/api/timeline/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    try {
      const response = await fetch(`/api/timeline/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Timeline Events</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          name="icon"
          value={form.icon}
          onChange={handleChange}
          placeholder="Icon"
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="block mb-2 p-2 border"
        />
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="block mb-2 p-2 border"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="block mb-2 p-2 border"
        ></textarea>
        <button type="submit" className="p-2 bg-blue-500 text-white">
          Add Event
        </button>
      </form>
      <ul>
        {events.map((event) => (
          <li key={event._id} className="mb-4">
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <button
              onClick={() => handleDelete(event._id)}
              className="p-2 bg-red-500 text-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashTimeline;
