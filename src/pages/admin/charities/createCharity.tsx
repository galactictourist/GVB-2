import { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import CreateInterestTemplate from '~/components/Core/CreateInterestTemplate'
import { createCharity } from '~/redux/slices/adminSlice'

const CreateCharity: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const labels = {
    interestLabel: "Charities",
    description: "A list of charities that Givabit is partnered with."
  }

  const successMessage = () => {
    toast.success('Charity created', {
      position: 'bottom-center',
    })
  }

  const submitHandler = (name: string) => {
    dispatch(
      createCharity({
        name
      })
    )
    router.push('/admin/charities')
    successMessage()
  }

  return <CreateInterestTemplate labels={labels} submitHandler={submitHandler} />
}

export default CreateCharity
