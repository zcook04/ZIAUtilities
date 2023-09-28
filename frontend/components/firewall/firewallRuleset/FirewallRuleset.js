import React from 'react'
import styles from './firewallRuleset.module.scss'

const FirewallRuleset = ({ filteringRules, loading }) => {
    const customSort = (a, b) => {
        if (a.order === -1) return 1;
        if (b.order === -1) return -1;
        return a.order - b.order;
    }

    console.log(filteringRules)

    return (
        <section className={styles.mainSection}>
            <h2>Ruleset</h2>
            <ul>
                <li className={styles.filteringHeaders}>Order</li>
                <li className={styles.filteringHeaders}>Name</li>
                <li className={styles.filteringHeaders}>Action</li>
                <li className={styles.filteringHeaders}>State</li>
                <li className={styles.filteringHeaders}>Severity</li>
                <li className={styles.filteringHeaders}>Description</li>

                {filteringRules && filteringRules.length > 0 && filteringRules.sort((a, b) => (customSort(a, b))).map((rule) => {
                    return (
                        <React.Fragment key={rule.id}>
                            <li className={styles.filteringRules} >{rule.order}</li>
                            <li className={styles.filteringRules} >{rule.name}</li>
                            <li className={styles.filteringRules} >{rule.action}</li>
                            <li className={styles.filteringRules} >{rule.state}</li>
                            <li className={styles.filteringRules} >N/A</li>
                            <li className={styles.filteringRules} >{rule.description || "None"}</li>
                        </React.Fragment>
                    )
                })}
            </ul>

            {!filteringRules && !loading && <p>An Error Occurred. Failed to retrieve firewall rules.</p>}
            {loading && <p>Loading Filtering Rules...</p>}
        </section>
    )
}

export default FirewallRuleset