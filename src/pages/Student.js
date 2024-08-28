import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

function Student() {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://66cd97b28ca9aa6c8ccaeb37.mockapi.io/api/Students`)
            .then(res => {
                setStudents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch student data.');
                setLoading(false);
            });
    }, []);

    const deleteStudent = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`https://66cd97b28ca9aa6c8ccaeb37.mockapi.io/api/Students/${id}`);
            setStudents(students.filter(student => student.id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete student data.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    const studentDetails = students.map((item) => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.course}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
                <Link to={`/students/${item.id}/edit`} className="btn btn-success">Edit</Link>
            </td>
            <td>
                <button type='button' className="btn btn-danger" onClick={(e) => deleteStudent(item.id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Students List
                                <Link to="/students/create" className="btn btn-primary float-end">Add Student</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;
