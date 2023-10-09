import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import UpdateInterestTemplate from '~/components/Core/UpdateInterestTemplate'
import { updateTopic } from '~/redux/slices/adminSlice'
import { getTopicById } from '~/redux/slices/topicsSlice'
import { RootState } from '~/redux/store'

const UpdateCause: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const topicId = router.query.id
  const { loading, currentTopic } = useSelector((state: RootState) => state.topics)
  const { name } = currentTopic
  const labels = {
    interestLabel: "Update Cause",
    description: "Update an existing cause."
  }

  useEffect(() => {
    if (topicId) {
      dispatch(
        getTopicById({
          id: topicId,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const successMessage = (name: string) => {
    toast.success(`Collection ${name} updated`, {
      position: 'bottom-center',
    })
  }

  const submitHandler = (name: string) => {
    console.log("update")
    console.log({ name })

    dispatch(
      updateTopic({
        id: topicId,
        payload: {
          name,
        },
      })
    )
    successMessage(name)
    router.push('/admin/causes')
  }

  return <UpdateInterestTemplate loading={loading} labels={labels} value={name} submitHandler={submitHandler} />
}

export default UpdateCause
