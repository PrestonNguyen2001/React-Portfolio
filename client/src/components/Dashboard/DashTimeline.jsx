import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Modal, Table, Button, TextInput, Alert } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import educationIcon from "../../assets/svg/education.svg";
import personalIcon from "../../assets/svg/personal.svg";
import workIcon from "../../assets/svg/work.svg";
import MagicButton from "../Common/MagicButton";
import { FaPen } from "react-icons/fa";

export default function DashTimeline() {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState("");
  const [eventToEdit, setEventToEdit] = useState({});
  const [newEvent, setNewEvent] = useState({});
  const [addEventError, setAddEventError] = useState(null);
  const [addEventSuccess, setAddEventSuccess] = useState(null);
  const [editEventError, setEditEventError] = useState(null);
  const [editEventSuccess, setEditEventSuccess] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/timeline`,
          {
            headers: {
              Authorization: `Bearer ${document.cookie.replace(
                /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
              )}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching timeline data:", error);
      }
    };
    if (currentUser.isAdmin) {
      fetchEvents();
    }
  }, [currentUser]);

  const handleDeleteEvent = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/timeline/${eventIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
              "$1"
            )}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        setEvents((prev) =>
          prev.filter((event) => event._id !== eventIdToDelete)
        );
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setAddEventError(null);
    setAddEventSuccess(null);
    if (
      !newEvent.date ||
      !newEvent.icon ||
      !newEvent.location ||
      !newEvent.title ||
      !newEvent.content
    ) {
      setAddEventError("All required fields must be filled");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/timeline/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
              "$1"
            )}`,
          },
          body: JSON.stringify(newEvent),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setAddEventError(data.message);
      } else {
        setAddEventSuccess("Event added successfully");
        setEvents((prev) => [...prev, data]);
        setNewEvent({});
      }
    } catch (error) {
      setAddEventError(error.message);
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    setEditEventError(null);
    setEditEventSuccess(null);
    if (
      !eventToEdit.date ||
      !eventToEdit.icon ||
      !eventToEdit.location ||
      !eventToEdit.title ||
      !eventToEdit.content
    ) {
      setEditEventError("All required fields must be filled");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/timeline/${eventToEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
              "$1"
            )}`,
          },
          body: JSON.stringify(eventToEdit),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setEditEventError(data.message);
      } else {
        setEditEventSuccess("Event updated successfully");
        setEvents((prev) =>
          prev.map((event) => (event._id === eventToEdit._id ? data : event))
        );
        setEventToEdit({});
        setShowEditModal(false);
      }
    } catch (error) {
      setEditEventError(error.message);
    }
  };

  const handleQuillChange = (content) => {
    setNewEvent({ ...newEvent, content });
  };

  const handleEditQuillChange = (content) => {
    setEventToEdit({ ...eventToEdit, content });
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEventToEdit({ ...eventToEdit, [e.target.name]: e.target.value });
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "education":
        return (
          <img src={educationIcon} alt="Education Icon" className="w-10 h-10" />
        );
      case "personal":
        return (
          <img src={personalIcon} alt="Personal Icon" className="w-10 h-10" />
        );
      case "work":
        return <img src={workIcon} alt="Work Icon" className="w-10 h-10" />;
      default:
        return null;
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && events.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Icon</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            {events.map((event) => (
              <Table.Body className="divide-y" key={event._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{event.date}</Table.Cell>
                  <Table.Cell>{getIcon(event.icon)}</Table.Cell>
                  <Table.Cell>{event.location}</Table.Cell>
                  <Table.Cell>{event.title}</Table.Cell>
                  <Table.Cell>{event.content}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setEventIdToDelete(event._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                    <span
                      onClick={() => {
                        setEventToEdit(event);
                        setShowEditModal(true);
                      }}
                      className="font-medium text-blue-500 hover:underline cursor-pointer ml-4"
                    >
                      Edit
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no events yet!</p>
      )}
      {currentUser.isAdmin && (
        <MagicButton
          title="Add Event"
          icon={<FaPen />}
          position="right"
          otherClasses="mb-4 w-full"
          handleClick={() => setShowAddModal(true)}
        />
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteEvent}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Add New Event</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleAddEvent}>
            <TextInput
              type="text"
              name="date"
              placeholder="Date"
              required
              value={newEvent.date || ""}
              className="flex-1"
              onChange={handleChange}
            />
            <TextInput
              type="text"
              name="icon"
              placeholder="Icon"
              required
              value={newEvent.icon || ""}
              className="flex-1"
              onChange={handleChange}
            />
            <TextInput
              type="text"
              name="location"
              placeholder="Location"
              required
              value={newEvent.location || ""}
              className="flex-1"
              onChange={handleChange}
            />
            <TextInput
              type="text"
              name="title"
              placeholder="Title"
              required
              value={newEvent.title || ""}
              className="flex-1"
              onChange={handleChange}
            />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Write something..."
              className="h-72 mb-12"
              required
              value={newEvent.content || ""}
              onChange={handleQuillChange}
            />
            <Button type="submit" gradientDuoTone="purpleToPink">
              Add Event
            </Button>
            {addEventError && (
              <Alert className="mt-5" color="failure">
                {addEventError}
              </Alert>
            )}
            {addEventSuccess && (
              <Alert className="mt-5" color="success">
                {addEventSuccess}
              </Alert>
            )}
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Edit Event</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleEditEvent}>
            <TextInput
              type="text"
              name="date"
              placeholder="Date"
              required
              value={eventToEdit.date || ""}
              className="flex-1"
              onChange={handleEditChange}
            />
            <TextInput
              type="text"
              name="icon"
              placeholder="Icon"
              required
              value={eventToEdit.icon || ""}
              className="flex-1"
              onChange={handleEditChange}
            />
            <TextInput
              type="text"
              name="location"
              placeholder="Location"
              required
              value={eventToEdit.location || ""}
              className="flex-1"
              onChange={handleEditChange}
            />
            <TextInput
              type="text"
              name="title"
              placeholder="Title"
              required
              value={eventToEdit.title || ""}
              className="flex-1"
              onChange={handleEditChange}
            />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Write something..."
              className="h-72 mb-12"
              required
              value={eventToEdit.content || ""}
              onChange={handleEditQuillChange}
            />
            <Button type="submit" gradientDuoTone="purpleToPink">
              Update Event
            </Button>
            {editEventError && (
              <Alert className="mt-5" color="failure">
                {editEventError}
              </Alert>
            )}
            {editEventSuccess && (
              <Alert className="mt-5" color="success">
                {editEventSuccess}
              </Alert>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
