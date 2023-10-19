interface Props {
  src: string
}

const Video = ({ src }: Props) => {
  return (
    <video width="50" autoPlay loop muted preload="metadata">
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default Video
