import { NavLink } from "react-router-dom";
import React, { ReactElement } from "react";
import styles from './Sidebar.module.css';

export function Sidebar(): ReactElement {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.ul}>
                <li>
                    <NavLink to="/">home</NavLink>
                </li>
                <li>
                    <NavLink to="/applied">applied</NavLink>
                </li>
                <li>
                    <NavLink to="/leads">leads</NavLink>
                </li>
                <li>
                    <NavLink to="/archived">archived</NavLink>
                </li>
                <li>
                    <NavLink to="/metrics">metrics</NavLink>
                </li>
            </ul>
        </div>
    )
}