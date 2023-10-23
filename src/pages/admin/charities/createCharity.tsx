import { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import CharityTemplate, { CharityValues } from '~/components/Charities/CharityTemplate'
import { createCharity } from '~/redux/slices/adminSlice'

const CreateCharity: NextPage = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const labels = {
    pageLabel: "Add Charity",
    submitBtnLabel: "Create"
  }

  const successMessage = () => {
    toast.success('Charity created', {
      position: 'bottom-center',
    })
  }

  const submitHandler = (values: CharityValues) => {
    dispatch(
      createCharity(values)
    )
    router.push('/admin/charities')
    successMessage()
  }

  return <CharityTemplate labels={labels} submitHandler={submitHandler} />
}

export default CreateCharity
