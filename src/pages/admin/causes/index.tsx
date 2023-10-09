import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InterestPageTemplate from '~/components/Core/InterestPageTemplate'
import { getTopics } from '~/redux/slices/topicsSlice'
import { RootState } from '~/redux/store'

const Causes: NextPage = () => {
  const dispatch = useDispatch()
  const { loading, allTopics } = useSelector((state: RootState) => state.topics)
  const labels = {
    interestLabel: "Causes",
    createUrl: "/admin/causes/createCause",
    updateUrl: "/admin/causes/updateCause",
    createBtnLabel: "Create Cause",
    description: "The list of causes are currently on master level, which mean that no subtopics will be displayed at this point.",
  }

  useEffect(() => {
    dispatch(getTopics())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <InterestPageTemplate loading={loading} labels={labels} interests={allTopics} />
}

export default Causes
