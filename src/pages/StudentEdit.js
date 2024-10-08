import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function StudentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        city: ''
    });
    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({});

    useEffect(() => {
        console.log("Editing student with ID:", id); // Debugging line
        axios.get(`https://66cd97b28ca9aa6c8ccaeb37.mockapi.io/api/Students/${id}`)
            .then(res => {
                setStudent(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to fetch student data.');
                setLoading(false);
            });
    }, [id]);
    
    const handleInput = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const updateStudent = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic client-side validation
        if (!student.name || !student.email || !student.phone || !student.city) {
            setInputErrorList({ general: 'All fields are required' });
            setLoading(false);
            return;
        }

        try {
            await axios.put(`https://66cd97b28ca9aa6c8ccaeb37.mockapi.io/api/Students/${id}`, student);
            alert('Student updated successfully!');
            navigate('/students');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setInputErrorList(error.response.data.errors || {});
            } else if (error.response && error.response.status === 500) {
                alert('An internal server error occurred.');
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
                                Edit Student
                                <Link to="/students" className="btn btn-danger float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateStudent}>
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
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={student.city}
                                        onChange={handleInput}
                                        className="form-control"
                                    />
                                    <span className="text-danger">{inputErrorList.city}</span>
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Update Student'}
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

export default StudentEdit;
