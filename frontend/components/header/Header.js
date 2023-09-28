'use client'

import React, { useEffect } from 'react'
import styles from './Header.module.scss'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch('/api/auth/validate', {
                    method: "GET"
                })
                if (response.ok) {
                    return
                } else {
                    router.push("/")
                }
            } catch (error) {
                console.log(error)
            }
        }
        validateToken()
    }, [])

    const signOffHandler = async () => {
        try {
            const response = await fetch('/api/auth/logoff', {
                method: "DELETE"
            })
            if (response.ok) {
                router.push("/")
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