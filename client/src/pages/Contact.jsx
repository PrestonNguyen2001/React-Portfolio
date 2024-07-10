import { useState } from "react";
import { Alert, TextInput, Textarea } from "flowbite-react";
import MagicButton from "../components/Hero/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBlur = (field) => {
    if (!field.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: `${
          field.name.charAt(0).toUpperCase() + field.name.slice(1)
        } is required`,
      }));
    } else if (field.name === "email" && !validateEmail(field.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: "Invalid email address",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message);
        return;
      }

      setSubmitError(null);
      alert("Email sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative pb-36 pt-24 " id="contact">
      {/* Background Grid */}
      <div className="absolute inset-0 flex items-center justify-center h-80 ">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <h1 className="heading">
        Contact <span className="text-purple">Me</span>
      </h1>
      <div className="mt-20 relative container mx-auto p-4 z-10 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <TextInput
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              className="mt-1 rounded-md w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <TextInput
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              className="mt-1 rounded-md w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-white"
            >
              Message
            </label>
            <Textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows="4"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
          <MagicButton
            title="Submit"
            icon={<FaLocationArrow />}
            position="right"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          />
          {submitError && (
            <Alert className="mt-5" color="failure">
              {submitError}
            </Alert>
          )}
        </form>
      </div>
    </section>
  );
}
