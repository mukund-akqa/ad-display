import Link from 'next/link'
import React from 'react'
import styles from './Content.module.css'

const Content = () => {
  return (
    <main className={styles.main}>
        <div className={styles.main__hero}>
            <h1>Your Advertisement</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <Link href='#'>Read More</Link>
        </div>
    </main>
  )
}

export default Content