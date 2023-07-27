import React from 'react'
import { AuthContext } from '@/config/Auth';

export default function Navbar() {

    const { user, logout } = React.useContext(AuthContext);

    return (
        <div>
            <nav className="navbar navbar-secondary bg-dark  px-5">
                <a className="navbar-brand text-white">Weather Application</a>
                <a className="text-white ms-auto me-5"> <b>Welcome</b>  : {user}</a>
                <button onClick={logout} className="btn btn-danger my-2 my-sm-0" type="submit">Logout</button>
            </nav>
        </div>
    )
}
