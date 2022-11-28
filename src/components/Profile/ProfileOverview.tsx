import Image from 'next/image'
import { useSelector } from 'react-redux'
import ProfilePicture from '../../../public/img/avatar.png'
import { selectAuth } from '../../redux/selectors'

// interface Props {
//   name: string
//   wallet: string
// }

const ProfileOverview = () => {
  const { wallet } = useSelector(selectAuth)

  //console.log(name)

  return (
    <div className="">
      <div className="sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
        <div className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56">
          <Image
            src={ProfilePicture}
            alt="ProfilePicture"
            className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
          />
        </div>
      </div>
      <div className="pt-8 pb-4">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <h3 className="py-2">{wallet}</h3>
      </div>
    </div>
  )
}

export default ProfileOverview
