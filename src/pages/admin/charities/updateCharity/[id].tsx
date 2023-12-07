import { NextPage } from 'next'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import CharityTemplate, { CharityValues } from '~/components/Charities/CharityTemplate'
import { updateCharity } from '~/redux/slices/adminSlice'

const UpdateCharity: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const values = {
    name: router.query.name as string,
    causeId: router.query.causeId as string,
    wallet: router.query.walletAddress as string,
    status: router.query.status as string,
  }

  const labels = {
    pageLabel: "Edit Charity",
    submitBtnLabel: "Update"
  }

  const successMessage = (name: string) => {
    toast.success(`Collection ${name} updated`, {
      position: 'bottom-center',
    })
  }

  const submitHandler = (values: CharityValues) => {
    dispatch(
      updateCharity({
        id: router.query.id,
        payload: values,
      })
    )
    successMessage("Update successful!")
    router.push('/admin/charities')
  }


  return <CharityTemplate labels={labels} values={values} submitHandler={submitHandler} />
}

export default UpdateCharity
