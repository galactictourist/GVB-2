import Link from 'next/link'
import { NftEntity } from '~/types/entity/nft.entity'
import NftImage from './Core/NftImage'

interface Props {
  nft: NftEntity
}

const NftItem = ({ nft }: Props) => {
  const style = "my-8 h-full w-full object-cover object-center group-hover:opacity-75"

  return (
    <div>
      <Link href={`/nft/${nft.id}`}>
        <div className="group relative cursor-pointer">
          <div className="relative overflow-hidden rounded-lg">
            <NftImage name={nft.name} type={nft.type} src={nft.imageUrl ?? '/img/image-placeholder.png'} size={400} style={style} />
          </div>
          <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
            <div className="flex-col">
              <p className="relative text-lg font-semibold text-white">{nft.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NftItem
