import getTextFrames, { GetTextFramesParams } from "@/utils/getTextFrames"

interface GetVideoFromTextParams extends GetTextFramesParams {
  textarea: HTMLTextAreaElement
  framerate: number
  onFinished?: () => void
}

const getVideoFromText = async ({ textarea, framerate, onFinished, ...params}: GetVideoFromTextParams) => {
  const video = await getTextFrames(params)
  let intervalRef: number;
  let currentFrame = 0

  const handlePlay = () => {
    intervalRef = setInterval(() => {
      if (currentFrame >= video.length) {
        if(onFinished) onFinished()
        return clearInterval(intervalRef)
      }
      textarea.value = video[currentFrame]
      currentFrame++
    }, framerate)
  }
  const handlePause = () => {
    clearInterval(intervalRef)
    textarea.value = video[currentFrame]
  }
  const handleReset = () => {
    currentFrame = 0
    textarea.value = video[0]
    handlePause()
  }

  return {
    play: handlePlay,
    pause: handlePause,
    reset: handleReset,
  }
}

export default getVideoFromText