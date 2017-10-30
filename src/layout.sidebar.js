import { NavLink } from "react-router-dom";
import React from "react";
import logo from "./logo-sgo.svg";
import styles from "sidebar.scss";

const Sidebar = () => (
    <div className={styles.wrapper}>
        <div>
            <img src={logo} className={styles.logo} alt="Logo" />
        </div>
        <ul>
            <li className="sidebar__menu-item">
                <NavLink to="/feed" className="sidebar-link" activeClassName="sidebar-link--active">Activity Feed</NavLink>
            </li>
            <li className="sidebar__menu-item">
                <NavLink to="/alerts" className="sidebar-link" activeClassName="sidebar-link--active">Alerts</NavLink>
            </li>
            <li className="sidebar__menu-item">
                <NavLink to="/repositories" className="sidebar-link" activeClassName="sidebar-link--active">Repositories</NavLink>
            </li>
        </ul>
    </div>
);

export default Sidebar;
