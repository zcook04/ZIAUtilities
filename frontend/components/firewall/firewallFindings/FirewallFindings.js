import React from 'react'
import styles from './firewallFindings.module.scss'
import Link from 'next/link'

const FirewallFindings = ({ findings }) => {
    return (
        <section>
            <h2>Summarized Findings</h2>
            <div className={styles.findingGrid}>
                <Link href={`/tools/firewall-filtering/finding/-findingId-`}>
                    <div className={styles.findingItem}>
                        Finding 1
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default FirewallFindings