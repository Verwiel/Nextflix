import { useState, useEffect, useContext } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { UserContext } from '@/lib/UserContext'
import { magic } from "../lib/magic-client"
import styles from "@/styles/Login.module.css"

const Login = () => {
  const [user, setUser] = useContext(UserContext)
  const [email, setEmail] = useState("")
  const [userMsg, setUserMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
    return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    user?.issuer && router.push('/')
  }, [user, router])

  const handleOnChangeEmail = (e) => {
    const { value } = e.target
    setUserMsg("")
    setEmail(value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      })

      // Send this token to our validation endpoint
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      })

      // If successful, update our user state with their metadata and route to the dashboard
      if (res.ok) {
        const userMetadata = await magic.user.getInfo()
        setUser(userMetadata)
        router.push('/')
      } else {
        setIsLoading(false)
        setUserMsg("Something went wrong logging in")
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      setUserMsg("Something went wrong logging in")
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>

      <main className={styles.main}>
        <form className={styles.mainWrapper} onSubmit={handleLogin}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            name="email"
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            required
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button name='login-submit' type='submit' className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Login
