import Image from 'next/image'
import Link from 'next/link'

interface Props {
  nft: Nft
  single?: boolean
}

const defaultProps = {
  single: false,
}

const NftItem = ({ nft, single }: Props & typeof defaultProps) => {
  return (
    <div>
      {single ? (
        <Link href={`/nft/${nft.name}`}>
          <div className="group relative cursor-pointer">
            <div className="relative h-72 overflow-hidden rounded-lg">
              <Image
                src={`/img/${nft.image}`}
                alt=""
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
                <p className="relative  text-white">{nft.collection}</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/collection/${nft.collection}`}>
          <div className="group relative cursor-pointer">
            <div className="relative h-72 overflow-hidden rounded-lg">
              <Image
                src={`/img/${nft.image}`}
                alt=""
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
                <p className="relative  text-white">{nft.collection}</p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

export default NftItem
