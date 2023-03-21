import Image from 'next/image'
import Link from 'next/link'
import { NftEntity } from '~/types/entity/nft.entity'

interface Props {
  nft: NftEntity
}

const NftItem = ({ nft }: Props) => {
  return (
    <div>
      <Link href={`/nft/${nft.id}`}>
        <div className="group relative cursor-pointer">
          <div className="relative h-72 overflow-hidden rounded-lg">
            <Image
              src={nft.imageUrl ?? '/img/image-placeholder.png'}
              alt={nft.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
              layout="fill"
            ></Image>
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
