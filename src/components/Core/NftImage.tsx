
interface Props {
  name: string
  type: string
  src: string
  size?: number
  style?: string
}

const NftImage = ({ name, type, src, size = 50, style = "" }: Props) => {
  if (type === "VIDEO") {
    return (
      <video className={style} width={size} autoPlay loop muted preload="metadata">
        <source src={src} type="video/mp4" />
      </video>
    )
  }

  return <img className={style} src={src} alt={name} width={size} height={size} />
}

export default NftImage
