import React from "react";
import { Link } from "react-router-dom"
import styles from "./LandingPage.module.css"

export default function LandingPage() {
    return(
        <div className={styles.text}>
            <h3> Wherever You Go, <br />
            Go With All Your Heart </h3>
            <Link to = '/home'> 
            <button className={styles.btn}>Enter</button></Link>
        </div>
    )
}