import Head from 'next/head'
import NavBar from '@/components/navbar/navbar'
import Banner from '@/components/banner/banner'
import SectionCards from '@/components/card/section-cards'
import { getVideos } from '@/lib/videos'
import styles from '@/styles/Home.module.css'


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const disneyVideos = await getVideos()
  // Pass data to the page via props
  return { props: { disneyVideos } }
}


export default function Home({ disneyVideos }) {
  return (
    <>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Netflix clone app called Nextflix. Uses Youtube API." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>
        <NavBar username='Drew' />
        <Banner 
          title='Clifford the Big Red Dog' 
          subTitle='subtitle' 
          imgUrl='/static/clifford.webp' 
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney Large" videos={disneyVideos} size="large" />
          <SectionCards title="Disney Medium" videos={disneyVideos} size="medium" />
          <SectionCards title="Disney Small" videos={disneyVideos} size="small" />
        </div>
      </div>
    </>
  )
}
