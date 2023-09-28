'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import SummarySection from '@/components/summary-section/SummarySection'
import { toast } from 'react-toastify'

const FirewallFilteringPage = () => {
    const [filteringRules, setFilteringRules] = useState([])

    useEffect(() => {
        const fetchFilteringRules = async () => {
            try {
                const response = await fetch('/api/firewall/get-filtering-rules')

                if (response.ok) {
                    const { data } = await response.json()
                    setFilteringRules(data)
                } else {
                    toast.warning("Failed to fetch firewall rules.")
                }

            } catch (error) {
                console.error(error)
                toast.error("An Error Occurred. Failed to fetch firewall rules.")
            }
        }
        fetchFilteringRules()
    }, [])

    console.log(filteringRules)

    return (
        <section className={styles.mainSection}>
            <SummarySection title={'Firewall Filtering'} description={'Review and analyze common security misconfigurations as it relates to the firewall filtering policy withing Zscaler Internet Access.'} />
        </section>
    )
}

export default FirewallFilteringPage