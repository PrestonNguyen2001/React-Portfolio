import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [createPostError, setCreatePostError] = useState(null);
  const [createPostSuccess, setCreatePostSuccess] = useState(null);
  const navigate = useNavigate();
  const filePickerRef = useRef(); // Define the filePickerRef using useRef

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file); // Call uploadImage when a file is selected
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreatePostError(null);
    setCreatePostSuccess(null);
    if (!formData.title || !formData.content) {
      setCreatePostError("Title and content are required");
      return;
    }
    if (imageFileUploading) {
      setCreatePostError("Please wait for image to upload");
      return;
    }
    try {
      const res = await fetch(`/api/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent with the request
        body: JSON.stringify({ ...formData, userId: currentUser._id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreatePostError(data.message);
      } else {
        setCreatePostSuccess("Post created successfully");
        navigate("/blogs");
      }
    } catch (error) {
      setCreatePostError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Create Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={filePickerRef}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl}
            alt="post"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="category"
          placeholder="Category"
          onChange={handleChange}
        />
        <textarea
          id="content"
          placeholder="Content"
          rows="10"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={imageFileUploading}
        >
          {imageFileUploading ? "Uploading..." : "Create Post"}
        </Button>
      </form>
      {createPostSuccess && (
        <Alert color="success" className="mt-5">
          {createPostSuccess}
        </Alert>
      )}
      {createPostError && (
        <Alert color="failure" className="mt-5">
          {createPostError}
        </Alert>
      )}
    </div>
  );
}
