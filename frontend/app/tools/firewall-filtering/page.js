'use client'

import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import SummarySection from '@/components/summary-section/SummarySection'
import { toast } from 'react-toastify'
import FirewallRuleset from '@/components/firewall/firewallRuleset/FirewallRuleset'
import FirewallFindings from '@/components/firewall/firewallFindings/FirewallFindings'

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

    return (
        <>
            <SummarySection title={'Firewall Filtering'} description={'Review and analyze common security misconfigurations as it relates to the firewall filtering policy withing Zscaler Internet Access.'} />
            <FirewallRuleset filteringRules={filteringRules} loading={loading} setLoading={setLoading} />
            <FirewallFindings />
        </>
    )
}

export default FirewallFilteringPage