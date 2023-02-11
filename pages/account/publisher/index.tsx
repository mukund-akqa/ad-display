import React from 'react'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import PublisherProfile from '../../../components/Publisher/PublisherProfile/PublisherProfile'



import Sidebar from '../../../components/Sidebar/Sidebar'
import styles from './publisher.module.css'

const index = () => {
  return (
    <>
    <Header/>
    <div className={styles.wrapper}>
        <Sidebar/>
        {/* <Publisher/> */}
        {/* <PublisherTable/> */}
        <PublisherProfile/>
        {/* <PublisherProfilePage/> */}
    </div>
    <Footer/>
    </>
  )
}

export default index