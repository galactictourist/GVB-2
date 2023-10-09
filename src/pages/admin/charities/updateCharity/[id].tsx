import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import UpdateInterestTemplate from '~/components/Core/UpdateInterestTemplate'
import { updateCharity } from '~/redux/slices/adminSlice'
import { getCharityById } from '~/redux/slices/charitiesSlice'
import { RootState } from '~/redux/store'

const CreateCause: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const charityId = router.query.id
  const { loading, currentCharity } = useSelector((state: RootState) => state.charities)
  const { name } = currentCharity
  const labels = {
    interestLabel: "Update Charity",
    description: "Update an existing charity."
  }

  useEffect(() => {
    if (charityId) {
      dispatch(
        getCharityById({
          id: charityId,
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
    dispatch(
      updateCharity({
        id: charityId,
        payload: {
          name,
        },
      })
    )
    successMessage(name)
    router.push('/admin/charities')
  }

  return <UpdateInterestTemplate loading={loading} labels={labels} value={name} submitHandler={submitHandler} />
}

export default CreateCause
