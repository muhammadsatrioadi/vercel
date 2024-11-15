import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
    const [task, setTask] = useState({
        name: '',
        priority: 'Medium',
        status: 'To Do',
        deadline: '' // Tambahkan default value untuk deadline
    });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        }
    }, [taskToEdit]);

    const handleSubmit = () => {
        if (!task.name.trim()) {
            alert("Task name cannot be empty!");
            return;
        }
        taskToEdit ? editTask(task) : addTask(task);
        setTask({ name: '', priority: 'Medium', status: 'To Do', deadline: '' }); // Reset termasuk deadline
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="taskPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            as="select"
                            name="priority"
                            value={task.priority}
                            onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value })}
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="taskStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={task.status}
                            onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value })}
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control
                            type="date"
                            name="deadline"
                            value={task.deadline}
                            onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskForm;
