import { Tab } from '@headlessui/react'

interface Props {
  title: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const NavTab = ({ title }: Props) => {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          'border-b px-8 py-2.5 text-lg font-medium leading-5 focus:outline-none',
          selected
            ? 'border-n4gMediumTeal text-n4gMediumTeal'
            : 'border-gray-200 text-gray-500 hover:border-gray-900'
        )
      }
    >
      {title}
    </Tab>
  )
}

export default NavTab
