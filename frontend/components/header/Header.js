'use client'

import React from 'react'
import styles from './Header.module.scss'
import { toast } from 'react-toastify'

const Header = () => {

    const signOffHandler = async () => {
        try {
            const response = await fetch('/api/auth/logoff', {
                method: "DELETE"
            })
            if (response.ok) {
                toast.success("Signed off successfully.")
            } else {
                toast.error("Failed to sign off.")
            }
        } catch (error) {
            console.log(error)
            toast.error("An Error Occurred. Failed to sign off.")
        }
    }

    return (
        <header className={styles.header}>
            <h2>Zscaler Internet Access Utilities</h2>
            <ul>
                <li>Optimize GRE POPs</li>
                <li onClick={signOffHandler}>Sign Off</li>
            </ul>
        </header>
    )
}

export default Header;