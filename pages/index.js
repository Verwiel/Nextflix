import Head from 'next/head'
import Banner from '@/components/banner/banner'
import NavBar from '@/components/navbar/navbar'
// import Image from 'next/image'
// import styles from '@/styles/Home.module.css'

export default function Home() {
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

      </div>
    </>
  )
}
