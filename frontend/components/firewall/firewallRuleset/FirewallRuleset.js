import React from 'react'
import styles from './firewallRuleset.module.scss'
import Link from 'next/link'

const FirewallRuleset = ({ filteringRules, loading }) => {
    const customSort = (a, b) => {
        if (a.order === -1) return 1;
        if (b.order === -1) return -1;
        return a.order - b.order;
    }

    return (
        <section className={styles.mainSection}>
            <h2>Ruleset</h2>
            <ul>
                <li className={styles.filteringHeaders}>Order</li>
                <li className={styles.filteringHeaders}>Name</li>
                <li className={styles.filteringHeaders}>Action</li>
                <li className={styles.filteringHeaders}>State</li>
                <li className={styles.filteringHeaders}>Sev</li>
                <li className={styles.filteringHeaders}>Findings</li>
                <li className={styles.filteringHeaders}>Description</li>
            </ul>

            {filteringRules && filteringRules.length > 0 && filteringRules.sort((a, b) => (customSort(a, b))).map((rule) => {
                return (
                    <Link key={rule.id} href={`/tools/firewall-filtering/${rule.id}`}>
                        <ul className={styles.filteringRules}>
                            <li  >{rule.order}</li>
                            <li >{rule.name}</li>
                            <li >{rule.action}</li>
                            <li >{rule.state}</li>
                            <li >N/A</li>
                            <li >N/A</li>
                            <li >{rule.description || "None"}</li>
                        </ul>
                    </Link>
                )
            })}

            {!filteringRules && !loading && <p>An Error Occurred. Failed to retrieve firewall rules.</p>}
            {loading && <p>Loading Filtering Rules...</p>}
        </section>
    )
}

export default FirewallRuleset