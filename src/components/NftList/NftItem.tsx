import React from 'react'
import Image from 'next/image'

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
        <a href={`/nft/${nft.name}`} className="group relative">
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
        </a>
      ) : (
        <a href={`/collection/${nft.collection}`} className="group relative">
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
        </a>
      )}
    </div>
  )
}

export default NftItem
