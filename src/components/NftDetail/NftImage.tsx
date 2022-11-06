import Image from 'next/image'

import { ArrowPathIcon } from '@heroicons/react/24/outline'

interface Props {
  image: string
}

const style = {
  wrapper: `rounded-lg border`,
  nftHeader: `flex items-center justify-between p-4`,
  likesContainer: `flex items-center justify-end space-x-2`,
  heartIcon: `h-5 w-5 text-gray-500`,
  likesCount: `text-sm font-semibold text-gray-500`,
  nftImage: `rounded-b-lg object-cover`,
}

const NftImage = ({ image }: Props) => {
  console.log(image)
  return (
    <div className={style.wrapper}>
      <div className={style.nftHeader}>
        <Image height={20} width={20} src="/img/eth-logo.svg" alt="eth" />

        <div className={style.likesContainer}>
          <ArrowPathIcon className={style.heartIcon} />
          <div className={style.likesCount}>200</div>
        </div>
      </div>

      <div>
        {image && (
          <Image
            className={style.nftImage}
            height={448}
            width={448}
            src={`/img/${image}`}
            alt="NFT Image"
          />
        )}
      </div>
    </div>
  )
}

export default NftImage
