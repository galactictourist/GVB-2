import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: string
  name: string
  cause: string
  image: string
}

const CollectionItem = ({ id, name, cause, image }: Props) => {
  return (
    <div className="rounded-xl shadow-lg">
      <Link href={`/collection/${id}`}>
        <button
          className="relative flex h-48 w-full rounded-xl border p-2 hover:opacity-80"
          type="button"
        >
          <Image
            src={image}
            alt="Collection image"
            layout="fill"
            sizes="100vw"
            className="ml-2 h-48 rounded-xl object-cover"
          />
        </button>
      </Link>
      <p className="p-4 text-lg  text-gray-900">{name}</p>
    </div>
  )
}

export default CollectionItem
