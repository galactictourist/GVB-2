import { useState } from 'react';
import NftImage from '../Core/NftImage';
import { BatchNftData } from './BatchPanel';

interface Props {
  nft: BatchNftData
}

const NftPanel = ({ nft }: Props) => {
  console.log({ nft })
  const [name, setName] = useState(nft.name);
  const [rank, setRank] = useState(nft.rank ? nft.rank : 0);
  const [price, setPrice] = useState(nft.price ? nft.price : 0)

  const onChangeHandler = (field: string, value: (string | number)) => {
    if (field === "name") {
      setName(value as string);
    }

    if (field === "rank") {
      setRank(value as number);
    }

    if (field === "price") {
      setPrice(value as number);
    }
  }

  return (
    <div className="h-18 grow flex gap-5 items-center border-2 rounded-md border-gray-400">
      <NftImage name={nft.name} type={nft.type} src={nft.src!} />
      <div>
        <div className="flex gap-5">
          <div>
            <label>Name:</label>&nbsp;
            <input className="w-200 border rounded-md border-gray-300" onChange={(e) => onChangeHandler("name", e.target.value)} value={name} />
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <label>Rank:</label>&nbsp;
            <input className="w-10 border rounded-md border-gray-300" onChange={(e) => onChangeHandler("rank", e.target.value)} value={rank} />
          </div>
          <div>
            <label>Price:</label>&nbsp;
            <input className="w-10 border rounded-md border-gray-300" onChange={(e) => onChangeHandler("price", e.target.value)} value={price} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftPanel
