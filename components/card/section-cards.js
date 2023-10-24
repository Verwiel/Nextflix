import Link from "next/link"
import Card from "./card"
import styles from "./section-cards.module.css"

const SectionCards = ({ title, videos=[], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.cardWrapper}>
        {videos.map((video, i) => {
          return (
            <Link key={i} href={`/video/${video.id.videoId}`}>
              <Card index={i} imgUrl={video.imgUrl} size={size} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SectionCards
