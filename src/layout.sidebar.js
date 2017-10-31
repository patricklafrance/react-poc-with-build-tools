import { NavLink } from "react-router-dom";
import React from "react";
import logo from "./logo-sgo.svg";
import styles from "layout.sidebar.scss";

const Sidebar = () => (
    <div className={styles.wrapper}>
        <div>
            <img src={logo} className={styles.logo} alt="Logo" />
        </div>
        <ul>
            <li className="sidebar__menu-item">
                <NavLink to="/feed" className={styles.link} activeClassName={styles.linkActive}>Activity Feed</NavLink>
            </li>
            <li className="sidebar__menu-item">
                <NavLink to="/alerts" className={styles.link} activeClassName={styles.linkActive}>Alerts</NavLink>
            </li>
            <li className="sidebar__menu-item">
                <NavLink to="/repositories" className={styles.link} activeClassName={styles.linkActive}>Repositories</NavLink>
            </li>
        </ul>
    </div>
);

export default Sidebar;
