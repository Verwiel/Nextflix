import { useState, useContext } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { magic } from "../../lib/magic-client"
import { UserContext } from '@/lib/UserContext'
import styles from './navbar.module.css'

const NavBar = () => {
  const [user, setUser] = useContext(UserContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  const logout = () => {
    // Call Magic's logout method, reset the user state, and route to the login page
    magic.user.logout().then(() => {
      setUser({ user: null })
      router.push('/login')
    })
  }

  const handleToggleDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
  }
  
  return (
    <header className={styles.container}>
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

        {user?.issuer && (<>
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
                <p className={styles.username}>{user.email}</p>
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
                    <Link href="/login" className={styles.linkName} onClick={logout}>Sign out</Link>
                    <div className={styles.lineWrapper}></div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </> )}
      </div>
    </header>
  )
}

export default NavBar
