import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function StudentCreate() {
    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState({});
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        course: ''
    });

    const handleInput = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const saveStudent = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic client-side validation
        if (!student.name || !student.email || !student.phone || !student.course) {
            setInputErrorList({ general: 'All fields are required' });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`https://66cd97b28ca9aa6c8ccaeb37.mockapi.io/api/Students`, student);
            // Check if the response contains a success message
            if (response.data && response.data.id) {
                alert('Student added successfully!');
                navigate('/students');
            } else {
                alert('Student added, but no confirmation message received.');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    setInputErrorList(error.response.data.errors || {});
                } else if (error.response.status === 500) {
                    alert('An internal server error occurred.');
                } else {
                    alert('An unexpected error occurred.');
                }
            } else {
                alert('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Add Student
                                <Link to="/students" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                {inputErrorList.general && (
                                    <div className="alert alert-danger">
                                        {inputErrorList.general}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={student.name}
                                        onChange={handleInput}
                                        className="form-control"
                                    />
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={student.email}
                                        onChange={handleInput}
                                        className="form-control"
                                    />
                                    <span className="text-danger">{inputErrorList.email}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={student.phone}
                                        onChange={handleInput}
                                        className="form-control"
                                    />
                                    <span className="text-danger">{inputErrorList.phone}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Course</label>
                                    <input
                                        type="text"
                                        name="course"
                                        value={student.course}
                                        onChange={handleInput}
                                        className="form-control"
                                    />
                                    <span className="text-danger">{inputErrorList.course}</span>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Student'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentCreate;
