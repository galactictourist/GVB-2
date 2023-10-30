import NftImage from '../Core/NftImage';
import { BatchNftData } from './BatchPanel';

interface Props {
  index: number
  nft: BatchNftData
  changeHandler: (index: number, property: string, value: string) => void
}

const NftPanel = ({ index, nft, changeHandler }: Props) => {
  return (
    <div className="h-18 grow flex gap-5 items-center border-2 rounded-md border-gray-400">
      <NftImage name={nft.name} type={nft.type} src={nft.src!} />
      <div>
        <div className="flex gap-5">
          <div>
            <label>Name:</label>&nbsp;
            <input className="w-200 border rounded-md border-gray-300" onChange={(e) => changeHandler(index, "name", e.target.value)} value={nft.name} />
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <label>Rank:</label>&nbsp;
            <input className="w-10 border rounded-md border-gray-300" onChange={(e) => changeHandler(index, "rank", e.target.value)} value={nft.rank} />
          </div>
          <div>
            <label>Price:</label>&nbsp;
            <input className="w-10 border rounded-md border-gray-300" onChange={(e) => changeHandler(index, "price", e.target.value)} value={nft.price} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftPanel
