import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'
//import { selectAuth } from '../../redux/selectors'

interface Props {
  id: string
}

const CollectionOverview = ({ id }: Props) => {
  const { loading, myCollections } = useSelector((state: RootState) => state.collections)
  const collection = myCollections.filter((collection) => collection.id === id)[0]

  return (
    <div className="bg-n4gLightTeal">
      <div className="p-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
        <div className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56">
          <Image
            src="/img/1.png"
            width={160}
            height={160}
            alt="NftPicture"
            className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
          />
        </div>
      </div>
      <div className="p-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
        <h2 className="mx-auto text-xl font-semibold">{collection.name}</h2>
        <h3 className="py-2">{collection.description}</h3>
      </div>
    </div>
  )
}

export default CollectionOverview
