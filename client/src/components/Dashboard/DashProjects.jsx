// client/src/components/Dashboard/DashProjects.jsx

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProjects() {
  const { currentUser } = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // Add modal state
  const [projectIdToDelete, setProjectIdToDelete] = useState("");
  const [newProject, setNewProject] = useState({
    // Add state for new project
    title: "",
    imgPath: "",
    category: "",
    description: "",
    ghLink: "",
    demoLink: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (res.ok) {
          setProjects(data);
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
        `/api/projects/${projectIdToDelete}/${currentUser._id}`,
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

  const handleAddProject = async () => {
    setShowAddModal(false);
    try {
      const res = await fetch(`/api/projects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newProject, userId: currentUser._id }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setProjects((prev) => [...prev, data]);
        setNewProject({
          title: "",
          imgPath: "",
          category: "",
          description: "",
          ghLink: "",
          demoLink: "",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.id]: e.target.value });
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
              <Table.HeadCell>Category</Table.HeadCell>
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
                    <Link to={`/project/${project.slug}`}>
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
                      to={`/project/${project.slug}`}
                    >
                      {project.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{project.category}</Table.Cell>
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
          <div className="flex flex-col gap-4">
            <TextInput
              id="title"
              placeholder="Title"
              onChange={handleChange}
              value={newProject.title}
            />
            <TextInput
              id="imgPath"
              placeholder="Image URL"
              onChange={handleChange}
              value={newProject.imgPath}
            />
            <TextInput
              id="category"
              placeholder="Category"
              onChange={handleChange}
              value={newProject.category}
            />
            <textarea
              id="description"
              placeholder="Description"
              rows="4"
              onChange={handleChange}
              value={newProject.description}
              className="p-2 border border-gray-300 rounded-md"
            />
            <TextInput
              id="ghLink"
              placeholder="GitHub Link"
              onChange={handleChange}
              value={newProject.ghLink}
            />
            <TextInput
              id="demoLink"
              placeholder="Demo Link"
              onChange={handleChange}
              value={newProject.demoLink}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddProject}>Add Project</Button>
          <Button color="gray" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
