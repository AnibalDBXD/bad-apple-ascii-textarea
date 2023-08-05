export type GetTextFramesParams = {
  videoPath: string,
  split: string
}

const getTextFrames = async ({ videoPath, split }: GetTextFramesParams) => {
  const text = await fetch(videoPath, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })

  const textData = await text.text()
  return textData.split(split)
}

export default getTextFrames