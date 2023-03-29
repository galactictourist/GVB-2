import { useSelector } from 'react-redux'
import { RootState } from '~/types'

const MyItemsTab = () => {
  const { id } = useSelector((state: RootState) => state.auth)

  return <div className=""></div>
}

export default MyItemsTab
