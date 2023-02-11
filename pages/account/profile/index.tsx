import React from 'react'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import Sidebar from '../../../components/Sidebar/Sidebar'
import UserProfile from '../../../components/UserProfile/UserProfile'
import styles from './profile.module.css'

const index = () => {
  return (
    <>
    <Header/>
    <div className={styles.wrapper}>
        <Sidebar/>
        <UserProfile/>
    </div>
    <Footer/>
    </>
  )
}

export default index