import { Disclosure } from '@headlessui/react'
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const style = {
  wrapper: `flex flex-col divide-y rounded-lg overflow-hidden border`,
  icon: `h-5 w-5 text-gray-600`,
  buttonWrapper: `flex items-center justify-between p-4`,
  buttonLeft: `flex items-center space-x-4`,
  title: ``,
  rightIcon: `h-6 w-6 text-gray-400`,
  innerTextContainer: `bg-gray-50 p-4`,
}

const NFTDetails = () => {
  return (
    <div className={style.wrapper}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <div className={style.buttonWrapper}>
                <div className={style.buttonLeft}>
                  <DocumentTextIcon className={style.icon} />
                  <span className={style.title}>Descripton</span>
                </div>

                {open ? (
                  <ChevronUpIcon className={style.rightIcon} />
                ) : (
                  <ChevronDownIcon className={style.rightIcon} />
                )}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className={style.innerTextContainer}>
                Detailed description about the NFT to be added here
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <div className={style.buttonWrapper}>
                <div className={style.buttonLeft}>
                  <BookmarkIcon className={style.icon} />
                  <span className={style.title}>Properties</span>
                </div>

                {open ? (
                  <ChevronUpIcon className={style.rightIcon} />
                ) : (
                  <ChevronDownIcon className={style.rightIcon} />
                )}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className={style.innerTextContainer}>NFT traits to be added here</div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default NFTDetails
