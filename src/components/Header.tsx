import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signMessage } from '@wagmi/core'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useHandleCreateNonce } from '~/handlers/useHandleCreateNonce'
import { useHandleVerifySignature } from '~/handlers/useHandleVerifySignature'
import { useAllCauses } from '~/hooks/useAllCauses'
import { metamaskConnector } from '~/providers/Web3ContextProvider'
import { signOut, verifySignature } from '~/redux/slices/authSlice'
import { RootState } from '~/types'
import { classNames, getCauseBgColor, getCauseTextColor } from '~/utils'
import { CHAIN_ID } from '~/utils/constants'
import { formatWalletAddress } from '~/utils/wallet'
import Logo from '../../public/img/givabit_logo_v8.svg'

const HeaderNoSSR: React.FC<any> = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { wallet, loading } = useSelector((state: RootState) => state.auth)

  const handleCreateNonce = useHandleCreateNonce()
  const handleVerifySignature = useHandleVerifySignature()
  const { data: causes } = useAllCauses()

  const { address, status } = useAccount()
  const { connect } = useConnect({
    chainId: CHAIN_ID,
    connector: metamaskConnector,
  })
  const { disconnect } = useDisconnect()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isSigning, setIsSigning] = useState(false)

  useEffect(() => {
    const signNonce = async () => {
      if (address) {
        if (wallet == address) {
          return
        }

        setIsSigning(true)

        handleCreateNonce.mutate(
          { address },
          {
            onSuccess: async (nonceResp) => {
              try {
                const signature = await signMessage({
                  message: nonceResp.nonce,
                })
                if (signature) {
                  handleVerifySignature.mutate(
                    {
                      address,
                      signature,
                    },
                    {
                      onSuccess(data, variables, context) {
                        dispatch(verifySignature(data))
                        setIsSigning(false)
                      },
                      onError(error) {
                        setIsSigning(false)
                      },
                    }
                  )
                }
              } catch (ex) {
                console.log(ex)
                setIsSigning(false)
              }
            },
            onError: () => {
              setIsSigning(false)
            },
          }
        )
      }
    }

    if (address && !loading && status == 'connected') {
      signNonce()
    } else if (wallet) {
      connect()
    }
  }, [address, wallet, loading, status])

  // Adjusting the menu bar when scrolling.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleDisconnect = () => {
    Object.keys(Cookies.get()).forEach(cookieName => Cookies.remove(cookieName))
    disconnect()
    dispatch(signOut())
  }

  return (
    <Popover
      className={`fixed z-30 w-full ${isScrolled && 'bg-white shadow-sm '} ${!isScrolled && 'transition duration-700'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between  py-2 md:justify-start md:space-x-10">
          <div className="flex h-12 justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Givabit</span>
                <Image src={Logo} alt="Givabit logo" height={50} width={170} />
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-n4gMediumTeal">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-full pl-2 pr-1 text-lg font-medium transition duration-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-n4gMediumTeal focus:ring-offset-2'
                    )}
                  >
                    <span>Causes</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-[240px] transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      {({ close }) => (
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {causes &&
                              causes.map((cause) => (
                                <Link key={cause.id} href={`/cause/${cause.id}`}>
                                  <div
                                    className={`-m-3 flex cursor-pointer items-center rounded-3xl py-3 px-6 text-white transition duration-700 hover:opacity-50 ${getCauseBgColor(
                                      cause.name
                                    )}`}
                                    style={{
                                      color: getCauseTextColor(cause.name),
                                    }}
                                    onClick={() => close()}
                                  >
                                    <p className="w-full text-center font-medium">{cause.name}</p>
                                  </div>
                                </Link>
                              ))}
                          </div>
                        </div>
                      )}
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* <Link href="/account/">
              <div className="text-lg font-medium text-gray-500 transition duration-500 hover:cursor-pointer hover:text-gray-900">
                Profile
              </div>
            </Link> */}
            {/* <Link href="/collection/create">
              <div className="text-lg font-medium text-gray-500 transition duration-500 hover:cursor-pointer hover:text-gray-900">
                Collection
              </div>
            </Link>
            <Link href="/admin/login">
              <div className="text-lg font-medium text-gray-500 transition duration-500 hover:cursor-pointer hover:text-gray-900">
                Admin
              </div>
            </Link> */}
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {address ? (
              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button>
                    <div className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
                      {isSigning ? 'Signing...' : formatWalletAddress(address)}
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 flex w-48 flex-col gap-4 rounded-md bg-white px-4 py-2 shadow-lg">
                    <Menu.Item>
                      <button
                        type="button"
                        className="flex items-center gap-2"
                        onClick={() => router.push('/account')}
                      >
                        <UserIcon className="h-6 w-6" />
                        My Account
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        type="button"
                        className="flex gap-2"
                        onClick={() => handleDisconnect()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        Disconnect
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button
                type="button"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                onClick={() => connect()}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          {({ close }) => (
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Image src={Logo} alt="Givabit logo" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-n4gMediumTeal">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {causes &&
                      causes.map((cause) => (
                        <Link key={cause.id} href={`/collection/${cause.name}`}>
                          <div
                            className="-m-3 flex cursor-pointer items-start rounded-lg p-3 transition duration-700 hover:bg-gray-50"
                            onClick={() => close()}
                          >
                            <p className="text-base font-medium text-gray-900">{cause.name}</p>
                          </div>
                        </Link>
                      ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                {/* <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <Link href="/account/">
                    <div className="text-base font-medium text-gray-900 hover:cursor-pointer hover:text-gray-700">
                      Profile
                    </div>
                  </Link>
                  <Link href="/collection/create">
                    <div className="text-base font-medium text-gray-900 hover:cursor-pointer hover:text-gray-700">
                      Collection
                    </div>
                  </Link>
                  <Link href="/admin/login">
                    <div className="text-base font-medium text-gray-900 hover:cursor-pointer hover:text-gray-700">
                      Admin
                    </div>
                  </Link>
                </div> */}
                <div>
                  {address ? (
                    <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
                      {formatWalletAddress(address)}
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                      onClick={() => {
                        connect()
                      }}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

const Header = dynamic(() => Promise.resolve(HeaderNoSSR), {
  ssr: false,
})

export default Header
