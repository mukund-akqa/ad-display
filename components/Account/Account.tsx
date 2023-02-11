import React from 'react'
import Advertizer from '../Advertizer/Advertizer'
import Dashboard from '../Dashboard/Dashboard'
import Publisher from '../Publisher/Publisher'
import Sidebar from '../Sidebar/Sidebar'
import UserProfile from '../UserProfile/UserProfile'
import styles from './Account.module.css'

const Account = () => {
  return (
    <div className={styles.account}>
        <Sidebar/>
        {/* <UserProfile/> */}
        {/* <Advertizer/> */}
        <Dashboard/>
        {/* <Publisher/> */}
    </div>
  )
}

export default Account