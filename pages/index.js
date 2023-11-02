import Head from 'next/head'
import Banner from '@/components/banner/banner'
import SectionCards from '@/components/card/section-cards'
import { getPopularVideos, getVideos, getWatchItAgainVideos } from '@/lib/videos'
import { redirectUser } from "@/utils/redirectUser"
import styles from '@/styles/Home.module.css'

// This gets called on every request
export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context)
  
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
  const disneyVideos = await getVideos('disney trailer')
  const travelVideos = await getVideos('travel')
  const productivityVideos = await getVideos('productivity')
  const popularVideos = await getPopularVideos()

  let error = false
  let errorMessage = ''

  if(
    disneyVideos.error || 
    travelVideos.error || 
    productivityVideos.error || 
    popularVideos.error
  ){
    error = true
    errorMessage = disneyVideos.errorMsg
  }

  // Pass data to the page via props
  return { 
    props: { 
      disneyVideos: disneyVideos.data, 
      travelVideos: travelVideos.data, 
      productivityVideos: productivityVideos.data, 
      popularVideos: popularVideos.data,
      watchItAgainVideos,
      error,
      errorMessage
    } 
  }
}


export default function Home({ 
  disneyVideos, 
  travelVideos, 
  productivityVideos, 
  popularVideos,
  watchItAgainVideos,
  error,
  errorMessage
}) {
  return (
    <>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Netflix clone app called Nextflix. Uses Youtube API." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <Banner 
          videoId="4zH5iYM4wJo"
          title='Clifford the Big Red Dog' 
          subTitle='subtitle' 
          imgUrl='/static/clifford.webp' 
        />

        <div className={styles.sectionWrapper}>
          {error ?
            <p style={{textAlign: 'center'}}>{errorMessage}</p>
            :
            <>
              {disneyVideos.length &&
                <SectionCards title="Disney" videos={disneyVideos} size="large" />
              }
              {watchItAgainVideos.length &&
                <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small" />
              }
              {travelVideos.length &&
                <SectionCards title="Travel" videos={travelVideos} size="small" />
              }
              {productivityVideos.length &&
                <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
              }
              {popularVideos.length &&
                <SectionCards title="Popular" videos={popularVideos} size="small" />
              }
            </>
            }
        </div>
      </main>
    </>
  )
}
