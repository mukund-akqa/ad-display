import React, { useEffect } from 'react'
import styles from "./Header.module.css";
import headerIcon from "../../public/headerIcon.svg";

import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

const Header = () => {
    const [isNavExpanded,setIsNavExpanded]=useState(false)
    const router=useRouter()
    const [state,setState]=useState(false)

    useEffect(()=>{
      const auth=sessionStorage.getItem("login")
      if(auth!==null){
        setState(true)
      }
      
      console.log(auth)
    },[])
    const handleLogout = () =>{
      sessionStorage.removeItem("login")
    }
   
  
  return (
    <header className={styles.header}>
      <div className={styles.header_brand}>
        <Image
          src={headerIcon}
          alt="logo"
          className={styles.header_brand_logo}
        />
        <Link href='/' className={styles.header_brand_text}>AdXchange</Link>
      </div>

      <nav className={styles.nav}>
        <FaBars className={styles.hamburgerMenu} onClick={() => {
          setIsNavExpanded((prevState)=>!prevState);
        }}/>
        <ul className={isNavExpanded ? styles.nav_links_expanded : styles.nav_links}>
          <li>
            {state ? <Link href="/" className={styles.nav_text} onClick={handleLogout}>
              Logout
            </Link>
            :
            <Link href="/login" className={styles.nav_text}>
              Login
            </Link>}
            
          </li>
          <li>

            {state ? <Link href="/account" className={styles.nav_text}>
              My account
            </Link>
            :
            <Link href="/register" className={styles.nav_text}>
              Sign Up
            </Link>}
            
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header