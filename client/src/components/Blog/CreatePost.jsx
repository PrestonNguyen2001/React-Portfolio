import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/authUtils";
import MagicButton from "../Common/MagicButton";


export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const navigate = useNavigate();

  const quillRef = useRef(null); // Create a ref for ReactQuill

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`); // Log upload progress
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.error("Image upload error:", error); // Log upload error
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL); // Log download URL
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting new post data:", formData);
    try {
      const token = getToken();
      if (!token) {
        setPublishError("No authentication token found");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/posts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error("Error creating post:", data.message);
        setPublishError(data.message);
        return;
      }
      console.log("Post created successfully, new slug:", data.slug);
      navigate(`/posts/${data.slug}`);
    } catch (error) {
      console.error("Something went wrong during post creation:", error);
      setPublishError("Something went wrong");
    }
  };

  const handleQuillChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "other") {
      setIsOtherCategory(true);
      setFormData({ ...formData, category: "" });
    } else {
      setIsOtherCategory(false);
      setFormData({ ...formData, category: value });
    }
  };

  return (
    <div className="py-20 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {isOtherCategory ? (
            <TextInput
              type="text"
              placeholder="Enter category"
              required
              id="category"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          ) : (
            <Select onChange={handleCategoryChange} className="flex-1">
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="other">Other</option>
            </Select>
          )}
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          ref={quillRef} // Attach the ref to ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={handleQuillChange}
        />
        <MagicButton
          title="Publish"
          handleClick={handleSubmit}
          className="w-full"
        />{" "}
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
        {publishSuccess && (
          <Alert className="mt-5" color="success">
            {publishSuccess}
          </Alert>
        )}
      </form>
    </div>
  );
}
