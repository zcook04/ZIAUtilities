'use client'

import React from 'react'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <h2>Zscaler Internet Access Utilities</h2>
            <ul>
                <li>Optimize GRE POPs</li>
            </ul>
        </header>
    )
}

export default Header