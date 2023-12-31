import Head from "next/head"
import { redirectUser } from "../../utils/redirectUser"
import { getMyList } from "../../lib/videos"
import SectionCards from "@/components/card/section-cards"
import styles from "@/styles/MyList.module.css"

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context)
  const videos = await getMyList(userId, token)

  return {
    props: {
      myListVideos: videos,
    },
  }
}

const MyList = ({ myListVideos }) => {
  return (
    <>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.sectionWrapper}>
          <SectionCards 
            title="My List" 
            videos={myListVideos} 
            size="small" 
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </>
  )
}

export default MyList