import {
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface Props {
  name: string
  sortOrder: string
  sortHandler: Function
}

const SortButton = ({ name, sortOrder, sortHandler }: Props) => {
  return (<button name={name} onClick={(e) => sortHandler(e.target)}>
    {sortOrder === "ASC" ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
  </button>)

}

export default SortButton
