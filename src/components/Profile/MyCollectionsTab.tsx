import { useSelector } from 'react-redux'
import { useMyCollections } from '~/hooks/useMyCollections'
import { RootState } from '~/types'
import CollectionItem from '../CollectionItem'

const MyCollectionsTab = () => {
  const { id } = useSelector((state: RootState) => state.auth)
  const { data: collections } = useMyCollections(id)

  return (
    <div className="relative pt-4 pb-8">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {collections &&
          collections.map((collection) => (
            <CollectionItem
              id={collection.id}
              key={collection.id}
              name={collection.name}
              cause={collection.topicId}
              image={collection.imageUrl}
            />
          ))}
      </div>
    </div>
  )
}

export default MyCollectionsTab
