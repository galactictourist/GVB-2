import { Disclosure } from '@headlessui/react'
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { NftEntity } from '~/types/entity/nft.entity'

const style = {
  wrapper: `flex flex-col divide-y rounded-lg border`,
  icon: `h-5 w-5 text-gray-600`,
  buttonWrapper: `flex items-center justify-between p-4`,
  buttonLeft: `flex items-center space-x-4`,
  title: ``,
  rightIcon: `h-6 w-6 text-gray-400`,
  innerTextContainer: `bg-gray-50 p-4`,
}

const NFTDetails = ({ nft }: { nft: NftEntity }) => {
  return (
    <div className={style.wrapper}>
      <>
        <div className={style.buttonWrapper}>
          <div className={style.buttonLeft}>
            <DocumentTextIcon className={style.icon} />
            <span className={style.title}>Descripton</span>
          </div>
        </div>
        <div className={style.innerTextContainer}>{nft.description}</div>
      </>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <div className={style.buttonWrapper}>
                <div className={style.buttonLeft}>
                  <BookmarkIcon className={style.icon} />
                  <span className={style.title}>Attributes</span>
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
                <div className="grid grid-cols-3 gap-4">
                  {nft.attributes &&
                    nft.attributes.map((attr) => (
                      <div
                        key={`${attr.trait_type}-${attr.value}`}
                        className="rounded-md border border-n4gMediumTeal p-3"
                      >
                        <p className="text-sm text-gray-400">{attr.trait_type}</p>
                        <p>{attr.value}</p>
                      </div>
                    ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default NFTDetails
