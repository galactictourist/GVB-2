import { ListBulletIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
  name: string
  description: string
  cause: string
  image: string
}

const CollectionRow = ({ id, name, description, cause, image }: Props) => {
  return (
    <div className="mb-4 rounded-lg border bg-gray-50 p-2">
      <div className="space-x-6 py-4 sm:flex">
        <div className="ml-6 sm:ml-2">
          <Image
            src={image}
            alt="Collection image"
            width={120}
            height={120}
            className="ml-2 rounded-xl"
          />
        </div>
        <div className="flex-auto space-y-1">
          <h2 className="pt-4 text-xl">{name}</h2>
          <h4 className="pt-2">{description}</h4>
          <h4 className="pt-2 uppercase text-gray-500">{cause}</h4>
        </div>
        <div className="mt-auto pt-4"></div>
        <div className="mt-auto pt-4">
          <Link href={`/collection/${id}`}>
            <button className="flex h-10 w-24 items-center justify-center gap-2 rounded-md border border-transparent bg-n4gLightTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              <ListBulletIcon />
              View
            </button>
          </Link>
          <Link href={`/collection/${id}/edit`}>
            <button className="mt-2 flex h-10 w-24 items-center justify-center gap-2 rounded-md border border-transparent bg-n4gMediumTeal px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-n4gDarkTeal">
              <PencilSquareIcon />
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CollectionRow
