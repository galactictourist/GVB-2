import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InterestPageTemplate from '~/components/Core/InterestPageTemplate'
import { useChildCauses } from '~/hooks/useChildCauses'
import { getCharities } from '~/redux/slices/charitiesSlice'
import { RootState } from '~/redux/store'

const Charities: NextPage = () => {
  const dispatch = useDispatch()
  const { loading, allCharities } = useSelector((state: RootState) => state.charities)
  const { data } = useChildCauses()

  const childCauses = data?.reduce((obj: any, cause) => {
    cause.children.forEach(child => obj[child.id] = child.name)
    return obj;
  }, {})

  const charities: any = childCauses && allCharities.map(charity => {
    return {
      ...charity,
      cause: charity.charityTopics.length > 0 ? childCauses[charity.charityTopics[0].topicId] : ""
    }
  })

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

  return <InterestPageTemplate loading={loading} labels={labels} interests={charities !== undefined ? charities : allCharities} />
}

export default Charities
