import React from 'react'
import styles from './summary-section.module.scss'

const SummarySection = ({ title, description }) => {
    return (
        <article className={styles.articleSection}>
            <h2>{title}</h2>
            <p>{description}</p>
        </article>
    )
}

export default SummarySection