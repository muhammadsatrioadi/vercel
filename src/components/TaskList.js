// TaskList.js

// Impor di bagian atas file, sebelum kode lainnya
import React from 'react';
import { Card, Button } from 'react-bootstrap';

// Fungsi untuk mengecek apakah deadline mendekati
const isDeadlineNear = (deadline) => {
    if (!deadline) return false; // Jika tidak ada deadline, return false
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate - today;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Konversi milidetik ke hari
    return daysDiff <= 3 && daysDiff >= 0; // True jika deadline dalam 3 hari ke depan
};

// Komponen TaskList
const TaskList = ({ tasks, deleteTask, showEditForm }) => {
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'High': return 'bg-danger text-white';
            case 'Medium': return 'bg-warning text-dark';
            case 'Low': return 'bg-success text-white';
            default: return 'bg-secondary text-white';
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'To Do': return 'text-muted';
            case 'In Progress': return 'text-primary';
            case 'Done': return 'text-success';
            default: return 'text-secondary';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'To Do':
                return <i className="bi bi-circle"></i>;
            case 'In Progress':
                return <i className="spinner-border spinner-border-sm text-primary" role="status"></i>;
            case 'Done':
                return <i className="bi bi-check-circle-fill text-success"></i>;
            default:
                return null;
        }
    };

    return (
        <div>
            {tasks.map((task) => (
                <Card className={`mb-3 shadow-sm rounded border-0 ${isDeadlineNear(task.deadline) ? "near-deadline" : ""}`} key={task.id}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        {/* Left Section */}
                        <div>
                            <h5 className="mb-2 fw-bold">{task.name}</h5>
                            <div className="d-flex align-items-center">
                                <span className={`badge ${getPriorityStyle(task.priority)} me-2`}>
                                    {task.priority}
                                </span>
                                <span className={`d-flex align-items-center ${getStatusStyle(task.status)}`}>
                                    {getStatusIcon(task.status)} &nbsp; {task.status}
                                </span>
                            </div>
                            {/* Deadline */}
                            <div>
                                <strong>Deadline:</strong>{" "}
                                {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Deadline"}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="d-flex align-items-center">
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                className="form-check-input me-3"
                                title="Mark as completed"
                                style={{ transform: 'scale(1.3)' }}
                            />
                            {/* Edit Button */}
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                className="me-2 d-flex align-items-center"
                                onClick={() => showEditForm(task)}
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>
                            {/* Delete Button */}
                            <Button
                                variant="outline-danger"
                                size="sm"
                                className="d-flex align-items-center"
                                onClick={() => deleteTask(task.id)}
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default TaskList;
