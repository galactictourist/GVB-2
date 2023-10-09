import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InterestPageTemplate from '~/components/Core/InterestPageTemplate'
import { getCharities } from '~/redux/slices/charitiesSlice'
import { RootState } from '~/redux/store'

const Charities: NextPage = () => {
  const dispatch = useDispatch()
  const { loading, allCharities } = useSelector((state: RootState) => state.charities)

  const labels = {
    interestLabel: "Charities",
    createUrl: "/admin/charities/createCharity",
    updateUrl: "/admin/charities/updateCharity",
    createBtnLabel: "Create Charity",
    description: "A list of charities that Givabit is partnered with.",
  }

  useEffect(() => {
    dispatch(getCharities())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <InterestPageTemplate loading={loading} labels={labels} interests={allCharities} />
}

export default Charities
