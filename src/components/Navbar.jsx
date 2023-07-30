import React from 'react'
import { AuthContext } from '@/config/Auth';

export default function Navbar() {

    const { user, logout } = React.useContext(AuthContext);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="h3 text-white" href="#">Weather App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                            <li className="nav-item text-white">
                                <a> <b>Welcome</b>  : {user}</a>
                            </li>
                        </ul>
                        <button onClick={logout} className="btn btn-danger my-2 my-sm-0" type="submit">Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
