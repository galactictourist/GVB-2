import { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import CreateInterestTemplate from '~/components/Core/CreateInterestTemplate'
import { createTopic } from '~/redux/slices/adminSlice'

const CreateCause: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const labels = {
    interestLabel: "Causes",
    description: "The list of causes are currently on master level, which mean that no subtopics will be created or displayed to the users at this point."
  }

  const successMessage = () => {
    toast.success('Collection created', {
      position: 'bottom-center',
    })
  }

  const submitHandler = (name: string) => {
    dispatch(
      createTopic({
        name
      })
    )
    router.push('/admin/causes')
    successMessage()
  }

  return <CreateInterestTemplate labels={labels} submitHandler={submitHandler} />
}

export default CreateCause
