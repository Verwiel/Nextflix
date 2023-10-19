import Head from 'next/head'
import NavBar from '@/components/navbar/navbar'
import Banner from '@/components/banner/banner'
import SectionCards from '@/components/card/section-cards'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const disneyVideos = [
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' },
    { imgUrl: '/static/clifford.webp' }
  ]

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
