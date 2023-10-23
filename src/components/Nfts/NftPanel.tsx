import NftImage from '../Core/NftImage';
import { BatchNftData } from './BatchPanel';

interface Props {
  nft: BatchNftData
}

const NftPanel = ({ nft }: Props) => {
  return (
    <div className="h-18 grow flex gap-5 items-center border-2 rounded-md border-gray-400">
      <NftImage name={nft.name} type={nft.type} src={nft.src!} />
      <div >
        <div className="flex gap-5">
          <div>
            <label>Name:</label>&nbsp;
            <input className="w-200 border rounded-md border-gray-300" value={nft.name} placeholder="" />
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <label>Rank:</label>&nbsp;
            <input className="w-10 border rounded-md border-gray-300" value={nft.rank} placeholder="0" />
          </div>
          <div>
            <label>Price:</label>&nbsp;
            <input className="w-10 border rounded-md border-gray-300" value={nft.price} placeholder="0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftPanel
