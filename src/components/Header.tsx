import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
//import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import Link from 'next/link'
import { destroyCookie, parseCookies } from 'nookies'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { injectedConnector } from '~/config'
import { generateNonce, signOut, verifySignature } from '~/redux/slices/authSlice'
import { RootState } from '~/redux/store'
import { USER_COOKIES } from '~/utils/constants'
import { formatWalletAddress } from '~/utils/wallet'
//import { signMessage } from '~/utils/web3'
import { useMetaMask } from '~/utils/ethers-react/useMetaMask'
import { useWeb3 } from '~/utils/ethers-react/useWeb3'
import { signMessageEthers } from '~/utils/web3'
import Logo from '../../public/img/givabit_full_logo2.svg'

const explore = [
  {
    name: 'Education',
    description:
      'The future of the world depends on the children of today, so investing in them is to take care of humanities future',
    href: '/cause/Education',
    icon: ChartBarIcon,
  },
  {
    name: 'Animal Welfare',
    description:
      'Many animals across the world are in danger, whether it is from direct human intervention or climate change. Lets help them',
    href: '/cause/Animals',
    icon: Squares2X2Icon,
  },
  {
    name: 'Environment',
    description:
      'We have only one earth, and it is our responsibility for our future grandchildren to take care of it',
    href: '/cause/Environment',
    icon: CursorArrowRaysIcon,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Header: React.FC<any> = () => {
  const dispatch = useDispatch()
  const cookies = parseCookies()
  // const { active, account, error, connector, activate, deactivate } = useWeb3React()

  const {
    isInstalledWallet, // Determine whether the wallet is installed
    isConnected, // Determine whether the wallet is connected
    connectedAccount, // Metamask current connected account
    connectWallet, // Connect metamask function
  } = useMetaMask()
  const { web3Provider } = useWeb3()

  const { nonce, wallet, loading } = useSelector((state: RootState) => state.auth)
  const isSignedIn = cookies[USER_COOKIES.JWT] && wallet

  const [isScrolled, setIsScrolled] = useState(false)

  const onConnect = async () => {
    try {
      dispatch(generateNonce({ wallet: connectedAccount }))
    } catch {
      alert('Please install MetaMask in your browser')
    }
  }

  // Verifying the signature once the nonce is created
  useEffect(() => {
    ;(async () => {
      if (!isSignedIn && nonce && !wallet) {
        try {
          if (!connectedAccount) {
            //await activate(injectedConnector, undefined, true)
            const result = await connectWallet()
            if (!result) {
              console.log('Not signed in')
            }
          } else {
            const signResponse = await signMessageEthers(web3Provider, nonce, connectedAccount)
            dispatch(
              verifySignature({
                wallet: connectedAccount,
                signature: signResponse,
              })
            )
          }
        } catch (e) {
          //dispatch(actions.setSigningIn(false))
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce, connectedAccount])

  // Get the Nonce from the BE once the Metamask account is detected
  useEffect(() => {
    ;(async () => {
      try {
        //await activate(injectedConnector)
        await connectWallet()
      } catch {
        //alert('Please install MetaMask in your browser')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDisconnect = async () => {
    try {
      destroyCookie(null, USER_COOKIES.JWT)
      //deactivate()
      dispatch(signOut())
    } catch (ex) {
      console.log(ex)
    }
  }

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

  return (
    <Popover
      className={`fixed z-30 w-full ${isScrolled && 'bg-white shadow-sm '} ${
        !isScrolled && 'transition duration-700'
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
                      'group inline-flex items-center rounded-md text-lg font-medium transition duration-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-n4gMediumTeal focus:ring-offset-2'
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
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {explore.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-start rounded-lg p-3 transition duration-700 hover:bg-gray-50"
                            >
                              <item.icon
                                className="h-6 w-6 flex-shrink-0 text-n4gMediumTeal"
                                aria-hidden="true"
                              />
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <Link href="/profile/">
              <div className="text-lg font-medium text-gray-500 transition duration-500 hover:cursor-pointer hover:text-gray-900">
                Profile
              </div>
            </Link>
            <Link href="/collection/create">
              <div className="text-lg font-medium text-gray-500 transition duration-500 hover:cursor-pointer hover:text-gray-900">
                Collection
              </div>
            </Link>
            <Link href="/admin/login">
              <div className="text-lg font-medium text-gray-500 transition duration-500 hover:cursor-pointer hover:text-gray-900">
                Admin
              </div>
            </Link>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {isSignedIn ? (
              <div
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                onClick={() => onDisconnect()}
              >
                {formatWalletAddress(wallet)}
              </div>
            ) : (
              <div
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                onClick={() => {
                  onConnect()
                }}
              >
                Signin using MetaMask
              </div>
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
                  {explore.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 text-n4gMediumTeal"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link href="/profile/">
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
              </div>
              <div>
                {isSignedIn ? (
                  <div
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                    onClick={() => onDisconnect()}
                  >
                    {formatWalletAddress(wallet)}
                  </div>
                ) : (
                  <div
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal"
                    onClick={() => {
                      onConnect()
                    }}
                  >
                    Signin using MetaMask
                  </div>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Header
