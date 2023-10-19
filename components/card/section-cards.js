import Card from "./card"
import styles from "./section-cards.module.css"

const SectionCards = ({ title, videos, size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.cardWrapper}>
        {videos.map((video, i) => {
          return <Card key={i} index={i} imgUrl={video.imgUrl} size={size} />
        })}
      </div>
    </section>
  )
}

export default SectionCards
