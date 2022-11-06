import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import NftSubInfo from './NftSubInfo'

interface Props {
  name: string
  collection: string
}

const style = {
  topContainer: `flex items-center justify-between`,
  collectionTitle: `text-lg font-semibold text-n4gMediumTeal`,
  actionItems: `flex divide-x divide-gray-300 rounded-lg border border-gray-300,`,
  actionItemContainer: `flex cursor-pointer items-center justify-center p-3`,
  icon: `h-6 w-6 text-gray-500`,
  assetTitle: `pt-6 text-4xl text-gray-900`,
  subInfoContainer: `hidden lg:block`,
}

const NFTBasicInfo = ({ name, collection }: Props) => {
  const actionItems = [
    {
      icon: <ArrowPathIcon className={style.icon} />,
    },
    {
      icon: <LinkIcon className={style.icon} />,
    },
    {
      icon: <ShareIcon className={style.icon} />,
    },
    {
      icon: <EllipsisVerticalIcon className={style.icon} />,
    },
  ]

  return (
    <div>
      <div className={style.topContainer}>
        <div className={style.collectionTitle}>{collection}</div>

        <div className={style.actionItems}>
          {actionItems.map((item, index) => (
            <div key={index} className={style.actionItemContainer}>
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      <div className={style.assetTitle}>{name}</div>

      <div className={style.subInfoContainer}>
        <NftSubInfo />
      </div>
    </div>
  )
}

export default NFTBasicInfo
