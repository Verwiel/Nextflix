import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Modal from "react-modal"
import { getYoutubeVideoById } from "../../lib/videos"
import Like from "../../components/icons/like-icon"
import Dislike from "../../components/icons/dislike-icon"
import styles from "../../styles/Video.module.css"

Modal.setAppElement("#__next")

export async function getStaticProps(context) {
  const videoId = context.params.videoId
  const videoRes = await getYoutubeVideoById(videoId)
  const videoArray = videoRes.data

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {}
    },
    revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"]
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }))

  return { paths, fallback: "blocking" }
}

const Video = ({ video }) => {
  const router = useRouter()
  const videoId = router.query.videoId
  
  const [toggleLike, setToggleLike] = useState(false)
  const [toggleDislike, setToggleDislike] = useState(false)

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video

  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      })
      const data = await response.json()

      if (data.length > 0) {
        const favorited = data[0].favorited
        if (favorited === 1) {
          setToggleLike(true)
        } else if (favorited === 0) {
          setToggleDislike(true)
        }
      }
    }
    handleLikeDislikeService()
  }, [videoId])

  const runRatingService = async (favorited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favorited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const handleToggleDislike = async () => {
    setToggleDislike(!toggleDislike)
    setToggleLike(toggleDislike)
    const val = !toggleDislike
    const favorited = val ? 0 : 1
    const response = await runRatingService(favorited)
  }

  const handleToggleLike = async () => {
    const val = !toggleLike
    setToggleLike(val)
    setToggleDislike(toggleLike)
    const favorited = val ? 1 : 0
    const response = await runRatingService(favorited)
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          className={styles.videoPlayer}
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike selected={toggleDislike} />
            </div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={`styles.subText styles.subTextWrapper`}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={`styles.subText styles.subTextWrapper`}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Video
