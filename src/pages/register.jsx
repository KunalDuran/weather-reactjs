import React, { useState, useContext } from 'react';
import { AuthContext } from '@/config/Auth';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';


function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDOB] = useState('');

    const { register } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, password, dob);
    };

    return (

        <div className="container">
            <ToastContainer />
            <section className="container text-center">
                <div className="card mx-4 mx-md-5 shadow">
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Sign Up</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="username">Username</label>
                                                <input type="email" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="dob">Date of Birth</label>
                                                <input type="date" id="dob" className="form-control" value={dob} onChange={(e) => setDOB(e.target.value)} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="pass">Password</label>
                                        <input type="password" id="pass" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Signup
                                    </button>
                                </form>
                                <p>Already have an account? <Link href="/login" passHref>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default RegistrationForm;
