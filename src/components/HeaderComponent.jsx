import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {isUserLoggedIn, logout} from "../services/AuthService";

const HeaderComponent = () => {
    const isAuth = isUserLoggedIn();

    const navigater = useNavigate();

    function handleLogout() {
       logout();
         navigater('/login');
    }
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">Todo Management App</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {
                                isAuth &&
                                <li className="nav-item">
                                    <NavLink to="/todos" className="nav-link">Todos</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                        <ul className="navbar-nav">
                            {
                                !isAuth &&
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                            }
                            {
                                !isAuth &&
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            }
                            {
                                isAuth &&
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            }
                        </ul>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;