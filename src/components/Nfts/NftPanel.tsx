import { BatchNftData } from './BatchPanel';

interface Props {
  nft: BatchNftData
}

const NftPanel = ({ nft }: Props) => {
  return (
    <div className="h-18 grow flex gap-5 items-center border-2 rounded-md border-gray-400">
      <img src={nft.src} width="50" />
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
