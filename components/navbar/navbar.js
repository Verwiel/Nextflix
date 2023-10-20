import { useState, useEffect } from "react"
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { magic } from "../../lib/magic-client"
import styles from './navbar.module.css'

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [username, setUsername] = useState("")

  const router = useRouter()

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getInfo()
        if (email) {
          setUsername(email)
        }
      } catch (error) {
        console.log("Error retrieving email:", error)
      }
    }
    getUsername()
  }, [])

  const handleSignout = async (e) => {
    e.preventDefault()

    try {
      await magic.user.logout()
      router.push("/login")
    } catch (error) {
      console.error("Error logging out", error)
      router.push("/login")
    }
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

        {username.length > 0 && <>
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
                    <Link href="/login" className={styles.linkName} onClick={handleSignout}>Sign out</Link>
                    <div className={styles.lineWrapper}></div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </> }
      </div>
    </header>
  )
}

export default NavBar
