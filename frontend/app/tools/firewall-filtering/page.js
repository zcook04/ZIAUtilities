import React from 'react'
import styles from './page.module.scss'
import SummarySection from '@/components/summary-section/SummarySection'

const FirewallFilteringPage = () => {
    return (
        <section className={styles.mainSection}>
            <SummarySection title={'Firewall Filtering'} description={'Review and analyze common security misconfigurations as it relates to the firewall filtering policy withing Zscaler Internet Access.'} />
        </section>
    )
}

export default FirewallFilteringPage