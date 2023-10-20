import { useState, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { magic } from "../lib/magic-client"
import styles from "@/styles/Login.module.css"

const Login = () => {
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

  const handleOnChangeEmail = (e) => {
    const { value } = e.target
    setUserMsg("")
    setEmail(value)
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (email) {
      // route to dashboard
      if (email === "drew_verwiel@outlook.com"){
        //  log in a user by their email
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          })
          console.log({ didToken })
          if (didToken) {
            router.push("/")
          }
        } catch (error) {
          // Handle errors if required!
          console.error("Something went wrong logging in", error)
          setIsLoading(false)
          setUserMsg("Something went wrong logging in")
        }
      } else {
        setIsLoading(false)
        setUserMsg("Something went wrong logging in")
      }
    } else {
      // show user message
      setIsLoading(false)
      setUserMsg("Enter a valid email address")
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix SignIn</title>
      </Head>

      <main className={styles.main}>
        <form className={styles.mainWrapper} onSubmit={handleLoginWithEmail}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
            required
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button type='submit' className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Login
