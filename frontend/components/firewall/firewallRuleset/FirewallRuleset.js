import React from 'react'
import styles from './firewallRuleset.module.scss'

const FirewallRuleset = ({ filteringRules, loading }) => {

    return (
        <section className={styles.mainSection}>
            <h2>Ruleset</h2>
            <ul className={styles.filteringHeaders}>
                <p>Name</p>
                <p>Description</p>
                <p>Action</p>
                <p>Protocol</p>
                <p>Source</p>
                <p>Destination</p>
                <p>Port</p>
                <p>Priority</p>
            </ul>
            {filteringRules && filteringRules.length > 0 && filteringRules.map((rule) => <p
                key={rule.id}>{rule.name}</p>)}
            {!filteringRules && !loading && <p>An Error Occurred. Failed to retrieve firewall rules.</p>}
            {loading && <p>Loading Filtering Rules...</p>}
        </section>
    )
}

export default FirewallRuleset