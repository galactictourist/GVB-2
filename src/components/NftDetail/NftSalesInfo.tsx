import {
  ClockIcon,
  QuestionMarkCircleIcon,
  CreditCardIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

import Image from 'next/image'

const style = {
  wrapper: `flex flex-col divide-y border `,
  header: `flex items-center justify-between rounded-t-lg px-6 py-4`,
  headerContent: `flex items-center space-x-2`,
  headerIcon: `h-6 w-6`,
  greyText: `text-gray-400`,
  mainContainer: `space-y-4 rounded-b-lg px-6 py-4`,
  priceInfoContainer: `space-y-1`,
  mediumFont: `font-medium`,
  priceContainer: `flex items-center space-x-2`,
  price: `text-3xl font-bold`,
  buttonsContainer: `flex space-x-4`,
  button: `flex w-[14rem] items-center cursor-pointer justify-center space-x-4 rounded-lg py-2 text-white`,
  purchaseButton: `bg-n4gMediumTeal`,
  offerButton: `border border-black bg-[#363840]`,
  buttonIcon: `h-6 w-6`,
}

interface Props {
  price: number
}

const NFTSalesInfo = ({ price }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerContent}>
          <ClockIcon className={`${style.headerIcon} ${style.greyText}`} />

          <div className={style.greyText}>Sales end December 30, 2022 at 8:20pm GMT-7</div>
        </div>

        <QuestionMarkCircleIcon className={style.headerIcon} />
      </div>

      <div className={style.mainContainer}>
        <div className={style.priceInfoContainer}>
          <div className={`${style.greyText} ${style.mediumFont}`}>Buy at</div>

          <div className={style.priceContainer}>
            <Image width={24} height={24} src="/img/eth-logo.svg" alt="weth" />
            <span className={style.price}>{price}</span>
          </div>
        </div>

        <div className={style.buttonsContainer}>
          <div className={`${style.button} ${style.purchaseButton}`}>
            <CreditCardIcon className={style.buttonIcon} />
            <span className="text-lg ">Buy now</span>
          </div>
          <div className={`${style.button} ${style.offerButton}`}>
            <TagIcon className={style.buttonIcon} />
            <span className="text-lg ">Increase offer</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTSalesInfo
