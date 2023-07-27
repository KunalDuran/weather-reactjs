import React, { useState, useContext } from 'react';
import { AuthContext } from '@/config/Auth';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);

    };

    return (

        <section class="container text-center">
            <div class="p-5 bg-image"></div>

            <div class="card mx-4 mx-md-5 shadow-5-strong">
                <div class="card-body py-5 px-md-5">

                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <h2 class="fw-bold mb-5">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div class="row">
                                    <div class="col mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="username">Username</label>
                                            <input type="text" id="username" class="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="pass">Password</label>
                                    <input type="password" id="pass" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4">
                                    Login
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;
