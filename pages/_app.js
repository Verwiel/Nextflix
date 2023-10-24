import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Roboto_Slab } from 'next/font/google'
import { magic } from "../lib/magic-client"
import { UserContext } from '@/lib/UserContext'
import NavBar from "@/components/navbar/navbar"
import Loading from "@/components/loading/loading"
import "@/styles/globals.css"

const roboto_slab = Roboto_Slab({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState()

  useEffect(() => {
    // Set loading to true to display our loading message within pages/index.js
    setUser({ loading: true })
    // Check if the user is authenticated already
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getInfo().then((userData) => setUser(userData))
        // router.push('/')
      } else {
        router.push('/login')
        setUser({ user: null })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return user?.loading ? (
    <Loading />
  ) : (
    <div className={roboto_slab.className}>
      <UserContext.Provider value={[user, setUser]}>
        <NavBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}
