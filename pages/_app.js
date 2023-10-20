import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Roboto_Slab } from 'next/font/google'
import { magic } from "../lib/magic-client"
import NavBar from "@/components/navbar/navbar"
import Loading from "@/components/loading/loading"
import "../styles/globals.css"

const roboto_slab = Roboto_Slab({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn()
      if (isLoggedIn) {
        // route to /
        router.push("/")
      } else {
        // route to /login
        router.push("/login")
      }
    }
    handleLoggedIn()
  }, [])

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

  return isLoading ? (
    <Loading />
  ) : (
    <div className={roboto_slab.className}>
      <NavBar />
      <Component {...pageProps} />
    </div>
  )
}
