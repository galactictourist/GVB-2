import NftImage from './NftImage'
import NftBasicInfo from './NftBasicInfo'
import NftDetails from './NftDetails'
import NftSalesInfo from './NftSalesInfo'
import Header from '~/components/Header'

interface Props {
  nft: Nft
}

const style = {
  wrapper: `h-[100vh] mx-auto flex max-w-2xl flex-col space-y-4 p-4 lg:max-w-none lg:py-8 lg:px-24`,
  nftContainer: `flex flex-col lg:flex-row lg:space-x-4`,
  leftContainer: `flex flex-col space-y-4`,
  leftElement: `hidden lg:block`,
  rightContainer: `flex flex-1 flex-col space-y-4`,
  buyoutContainer: `flex-1,`,
}

const NftSingleItem = ({ nft }: Props) => {
  return (
    <>
      <Header />
      <div className="flex h-[10vh]" />
      <div className={style.wrapper}>
        <div className={style.nftContainer}>
          <div className={style.leftContainer}>
            <div className={style.leftElement}>
              <NftImage image={nft.image} />
            </div>

            <div className={style.leftElement}>
              <NftDetails />
            </div>
          </div>

          <div className={style.rightContainer}>
            <NftBasicInfo name={nft.name} collection={nft.collection} />

            <div className={style.buyoutContainer}>
              <NftSalesInfo price={10} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NftSingleItem
