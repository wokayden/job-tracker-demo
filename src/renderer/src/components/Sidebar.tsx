import { NavLink } from "react-router-dom";
import React, { ReactElement } from "react";
import styles from './Sidebar.module.css';
import { RiLightbulbFill, RiBarChart2Fill, RiHome7Fill, RiFolder6Fill, RiBookMarkedFill  } from "react-icons/ri";

export function Sidebar(): ReactElement {
    return (
        <div className={styles.sidebar}>
            <ul>
                <li>
                    <NavLink to="/">
                        <div className={styles.menuButton}>
                            <RiHome7Fill />
                            <span>home</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/applied">
                        <div className={styles.menuButton}>
                            <RiBookMarkedFill />
                            <span>applied</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/leads">
                        <div className={styles.menuButton}>
                            <RiLightbulbFill />
                            <span>leads</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/archived">
                        <div className={styles.menuButton}>
                            <RiFolder6Fill />
                            <span>archived</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/metrics">
                        <div className={styles.menuButton}>
                            <RiBarChart2Fill />
                            <span>metrics</span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}