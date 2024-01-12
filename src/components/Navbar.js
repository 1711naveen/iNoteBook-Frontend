import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(location.pathname)
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">i-NoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                            <li>
                                {/* <Link className="nav-link" to="/blog">Message</Link> */}
                                <Link className="nav-link mx-2" to="/message"><i className="fa-regular fa-message"></i></Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('authToken') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary btn-sm mx-2" to="/signup" role="button">Sign Up</Link>
                            <Link className="btn btn-primary btn-sm mx-2" to="/login" role="button">Login</Link>
                        </form> : <Link className="btn btn-primary btn-sm mx-2" to="/login" role="button" onClick={handleLogout}>Log Out</Link>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
