import videosData from '@/data/videos.json'

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3"
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    )

    const data = await response.json()

    if (data?.error) {
      console.error("Youtube API error", data.error)
      return {
        data: [],
        error: true,
        errorMsg: 'Videos currently unavailable. API limit reached.'
      }
    }

    const videoMap = data?.items.map((item) => {
      console.log({ id: item.id })
      const id = item.id?.videoId || item.id
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
      }
    })
    
    return {
      data: videoMap,
      error: false,
      errorMsg: ''
    }

  } catch (error) {
    console.error("Something went wrong with video library", error)
    return {
      data: [],
      error: true,
      errorMsg: 'Server Error.'
    }
  }
}

export const getVideos = (searchQuery) => {
  // const URL = `search?part=snippet&q=${searchQuery}&type=video`
  // return getCommonVideos(URL)

  return {
    data: videosData.items,
    error: false,
    errorMsg: ''
  }
}

export const getPopularVideos = () => {
  // const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US"
  // return getCommonVideos(URL)

  return {
    data: videosData.items,
    error: false,
    errorMsg: ''
  }
}
