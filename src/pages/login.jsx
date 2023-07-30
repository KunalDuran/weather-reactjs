import React, { useState, useContext } from 'react';
import { AuthContext } from '@/config/Auth';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <>
            <ToastContainer />
            <div className='container'>
                <section className="text-center">
                    <div className="card mx-4 mx-md-5 shadow">
                        <div className="card-body py-5 px-md-5">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8">
                                    <h2 className="fw-bold mb-5">Login</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" htmlFor="username">Username</label>
                                                    <input type="email" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="pass">Password</label>
                                            <input type="password" id="pass" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block mb-4">
                                            Login
                                        </button>
                                    </form>
                                    <p>Don't have an account? <Link href="/register" passHref>Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default LoginForm;
