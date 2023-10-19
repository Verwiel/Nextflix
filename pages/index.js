import Head from 'next/head'
import NavBar from '@/components/navbar/navbar'
import Banner from '@/components/banner/banner'
import SectionCards from '@/components/card/section-cards'
import { getPopularVideos, getVideos } from '@/lib/videos'
import styles from '@/styles/Home.module.css'


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const disneyVideos = await getVideos('disney trailer')
  const travelVideos = await getVideos('travel')
  const productivityVideos = await getVideos('productivity')
  const popularVideos = await getPopularVideos()
  // Pass data to the page via props
  return { 
    props: { 
      disneyVideos, 
      travelVideos, 
      productivityVideos, 
      popularVideos 
    } 
  }
}


export default function Home({ 
  disneyVideos, 
  travelVideos, 
  productivityVideos, 
  popularVideos 
}) {
  return (
    <>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Netflix clone app called Nextflix. Uses Youtube API." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.main}>
        <NavBar username='Drew' />
        <Banner 
          title='Clifford the Big Red Dog' 
          subTitle='subtitle' 
          imgUrl='/static/clifford.webp' 
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </>
  )
}
