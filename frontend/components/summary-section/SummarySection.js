import React from 'react'
import styles from './summary-section.module.scss'

const SummarySection = ({ title, description }) => {
    return (
        <section className={styles.mainWrapper}>
            <h2>{title}</h2>
            <p>{description}</p>
        </section>
    )
}

export default SummarySection