import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Modal,
  Table,
  Button,
  TextInput,
  Alert,
  FileInput,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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

export default function DashProjects() {
  const { currentUser } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState("");
  const [newProject, setNewProject] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [addProjectError, setAddProjectError] = useState(null);
  const [addProjectSuccess, setAddProjectSuccess] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/projects`
        );
        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchProjects();
    }
  }, [currentUser]);

  const handleDeleteProject = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${projectIdToDelete}/${
          currentUser._id
        }`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setProjects((prev) =>
          prev.filter((project) => project._id !== projectIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setNewProject({ ...newProject, imgPath: downloadURL });
        });
      }
    );
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setAddProjectError(null);
    setAddProjectSuccess(null);
    if (
      !newProject.title ||
      !newProject.description ||
      !newProject.imgPath ||
      !newProject.ghLink
    ) {
      setAddProjectError("All required fields must be filled");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/projects/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...newProject, userId: currentUser._id }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setAddProjectError(data.message);
      } else {
        setAddProjectSuccess("Project added successfully");
        setProjects((prev) => [...prev, data]);
        setNewProject({});
      }
    } catch (error) {
      setAddProjectError(error.message);
    }
  };

  const handleQuillChange = (content) => {
    setNewProject({ ...newProject, description: content });
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && (
        <Button className="mb-4" onClick={() => setShowAddModal(true)}>
          Add Project
        </Button>
      )}
      {currentUser.isAdmin && projects.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Project image</Table.HeadCell>
              <Table.HeadCell>Project title</Table.HeadCell>
              <Table.HeadCell>GitHub Link</Table.HeadCell>
              <Table.HeadCell>Demo Link</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {projects.map((project) => (
              <Table.Body className="divide-y" key={project._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/project/${project._id}`}>
                      <img
                        src={project.imgPath}
                        alt={project.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/project/${project._id}`}
                    >
                      {project.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href={project.ghLink}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </a>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setProjectIdToDelete(project._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-project/${project._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no projects yet!</p>
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
              Are you sure you want to delete this project?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteProject}>
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
        <Modal.Header>Add New Project</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={handleAddProject}>
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              value={newProject.title || ""}
              className="flex-1"
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
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
            {imageUploadError && (
              <Alert color="failure">{imageUploadError}</Alert>
            )}
            {newProject.imgPath && (
              <img
                src={newProject.imgPath}
                alt="upload"
                className="w-full h-72 object-cover"
              />
            )}
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Write something..."
              className="h-72 mb-12"
              required
              value={newProject.description || ""}
              onChange={handleQuillChange}
            />
            <TextInput
              type="text"
              placeholder="GitHub Link"
              required
              id="ghLink"
              value={newProject.ghLink || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, ghLink: e.target.value })
              }
            />
            <TextInput
              type="text"
              placeholder="Demo Link (optional)"
              id="demoLink"
              value={newProject.demoLink || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, demoLink: e.target.value })
              }
            />
            <Button type="submit" gradientDuoTone="purpleToPink">
              Add Project
            </Button>
            {addProjectError && (
              <Alert className="mt-5" color="failure">
                {addProjectError}
              </Alert>
            )}
            {addProjectSuccess && (
              <Alert className="mt-5" color="success">
                {addProjectSuccess}
              </Alert>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
