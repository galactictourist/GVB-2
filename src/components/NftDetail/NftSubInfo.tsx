import { HeartIcon, EyeIcon } from '@heroicons/react/24/outline'

const style = {
  wrapper: `flex space-x-6 py-6`,
  textInfoContainer: `text-lg font-medium text-gray-500`,
  owner: `text-n4gMediumTeal`,
  iconTextInfoContainer: `flex items-center space-x-2`,
  icon: `h-7 w-7 text-gray-500`,
}

const NFTSubInfo = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.textInfoContainer}>
        Owned by <span className={style.owner}>ABC</span>
      </div>
      <div className={style.iconTextInfoContainer}>
        <EyeIcon className={style.icon} />
        <div className={style.textInfoContainer}>4.4K views</div>
      </div>
      <div className={style.iconTextInfoContainer}>
        <HeartIcon className={style.icon} />
        <div className={style.textInfoContainer}>200 favorites</div>
      </div>
    </div>
  )
}

export default NFTSubInfo
