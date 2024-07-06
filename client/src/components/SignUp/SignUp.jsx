import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../OAuth/OAuth";
import { saveToken } from "../../utils/authUtils";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log("Form data updated:", { [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!formData.username || !formData.email || !formData.password) {
      const errorMsg = "Please fill in all fields.";
      console.log("Form validation failed:", formData);
      return setErrorMessage(errorMsg);
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      console.log("Starting sign-up process...");
      console.log("Form data:", formData);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include", // Include credentials in the request
        }
      );
      console.log("Response status:", res.status);
      console.log("Response headers:", [...res.headers]);

      const data = await res.json();
      console.log("Response data:", data);

      if (data.success === false) {
        console.log("Sign-up failed with message:", data.message);
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        saveToken(data.token); // Save the token
        console.log("Sign-up successful:", data);
        navigate("/");
      } else {
        console.log("Sign-up failed with status:", res.status);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Preston&apos;s
            </span>
            Portfolio{" "}
          </Link>
          <p className="text-sm mt-5">
            Welcome to Preston&apos;s Portfolio! Please sign up to continue.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-small mt-5">
            <span>Already Have An Account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
