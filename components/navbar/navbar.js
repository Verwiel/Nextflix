import { useState } from "react"
import Image from 'next/image'
// import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './navbar.module.css'

const NavBar = ({ username }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleToggleDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>      
            <Image                 
              src="/static/nextflix_logo.svg"
              alt="Nextflix logo"
              width={128}
              height={34}
            />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem2}>
            <Link href="/browse/my-list">My List</Link>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleToggleDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login" className={styles.linkName}>Sign out</Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
