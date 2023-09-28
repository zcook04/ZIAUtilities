'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import SummarySection from '@/components/summary-section/SummarySection'
import { toast } from 'react-toastify'

const FirewallFilteringPage = () => {
    const [filteringRules, setFilteringRules] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchFilteringRules = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/firewall/get-filtering-rules')

                if (response.ok) {
                    const { data } = await response.json()
                    setFilteringRules(data)
                } else {
                    toast.warning("Failed to fetch firewall rules.")
                }

            } catch (error) {
                setLoading(false)
                console.error(error)
                toast.error("An Error Occurred. Failed to fetch firewall rules.")
            } finally {
                setLoading(false)
            }
        }
        fetchFilteringRules()
    }, [])

    console.log(filteringRules)

    return (
        <>
            <section className={styles.summarySection}>
                <SummarySection title={'Firewall Filtering'} description={'Review and analyze common security misconfigurations as it relates to the firewall filtering policy withing Zscaler Internet Access.'} />
            </section>
            <section className={styles.mainSection}>
                <h2>Ruleset</h2>
                {filteringRules && filteringRules.length > 0 && filteringRules.map((rule) => <p key={rule.id}>{rule.name}</p>)}
                {!filteringRules && !loading && <p>An Error Occurred. Failed to retrieve firewall rules.</p>}
                {loading && <p>Loading Filtering Rules...</p>}
            </section>
        </>
    )
}

export default FirewallFilteringPage