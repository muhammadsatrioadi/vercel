import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; // Pastikan CSS ini sudah dipanggil

function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filter, setFilter] = useState({ status: "All", priority: "All" });
    const [darkMode, setDarkMode] = useState(false);

    // Fungsi untuk menambahkan task
    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), deadline: task.deadline }]);
    };

    // Fungsi untuk mengedit task
    const editTask = (updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    };

    // Fungsi untuk mengecek apakah deadline mendekati
    const isDeadlineNear = (deadline) => {
        if (!deadline) return false;
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff <= 3; // Tugas dianggap mendekati jika kurang dari atau sama dengan 3 hari
    };

    // Fungsi untuk konfirmasi penghapusan dengan SweetAlert2
    const deleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",  // Warna tombol konfirmasi hijau
            cancelButtonColor: "#dc3545",   // Warna tombol pembatalan merah
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: "#f8f9fa",  // Warna latar belakang
            animation: true, // Mengaktifkan animasi
            customClass: {
                popup: 'animated bounceIn', // Menambahkan animasi bounce pada pop-up
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks(tasks.filter((task) => task.id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#28a745", // Hijau setelah sukses
                    background: "#d4edda", // Warna latar belakang sukses
                    animation: true, // Menambahkan animasi
                    customClass: {
                        popup: 'animated fadeIn', // Menambahkan animasi fadeIn setelah penghapusan
                    },
                });
            }
        });
    };

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    };

    const showEditForm = (task) => {
        setTaskToEdit(task);
        handleShowForm();
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const filteredTasks = tasks.filter((task) => {
        return (
            (filter.status === "All" || task.status === filter.status) &&
            (filter.priority === "All" || task.priority === filter.priority)
        );
    });

    // Mengubah background berdasarkan mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // Ganti gambar latar belakang saat dark mode toggle
        const backgroundImage = !darkMode
            ? 'url("/img/layered-peaks-haikei(1).svg")'  // Ganti dengan path gambar dark mode Anda
            : 'url("/img/layered-peaks-haikei.svg")'; // Ganti dengan path gambar light mode Anda

        // Update gambar latar belakang di seluruh body
        document.body.style.backgroundImage = backgroundImage;
    };

    return (
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <Container className="my-5">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="fw-bold">
                        <i className="bi bi-list-check"></i> To Do List PFS
                    </h1>
                    <p className="text-muted">Tentukan Prioritasmu</p>
                </div>

                {/* Controls */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button variant="primary" onClick={handleShowForm}>
                        <i className="bi bi-plus-circle"></i> Add Task
                    </Button>
                    <div className="d-flex">
                        <Form className="d-flex me-3">
                            <Form.Group className="me-3">
                                <Form.Label className="me-2">Status:</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={filter.status}
                                    onChange={handleFilterChange}
                                >
                                    <option value="All">All</option>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="me-2">Priority:</Form.Label>
                                <Form.Select
                                    name="priority"
                                    value={filter.priority}
                                    onChange={handleFilterChange}
                                >
                                    <option value="All">All</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                        {/* Button untuk Dark Mode */}
                        <Button variant={darkMode ? "light" : "dark"} onClick={toggleDarkMode}>
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </Button>
                    </div>
                </div>

                {/* Task List */}
                <TaskList
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    showEditForm={showEditForm}
                />

                {/* Task Form */}
                <TaskForm
                    show={showForm}
                    handleClose={handleCloseForm}
                    addTask={addTask}
                    editTask={editTask}
                    taskToEdit={taskToEdit}
                />
            </Container>
        </div>
    );
}

export default App;
