import { useState } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import styles from './card.module.css'

const Card = ({ imgUrl, size='medium', index, shouldScale = true }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl)

  const classMap = {
    'large': styles.lgItem,
    'medium': styles.mdItem,
    'small': styles.smItem,
  }

  const scale = index === 0 ? { scaleY: 1.1 } : { scale: 1.1 }

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  }

  const handleOnError = () => {
    console.error('img error')
    setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80')
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles.imgMotionWrapper} ${classMap[size]}`}
        {...shouldHover}
      >
        <Image 
          src={imgSrc || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'}
          alt='image'
          className={styles.cardImg}
          fill
          sizes={'100%'} // fixes warning, size is set by parent
          onError={handleOnError}
        />
      </motion.div>
    </div>
  )
}

export default Card
