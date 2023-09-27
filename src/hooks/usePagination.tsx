import { useState } from "react"

export const usePagination = (defaultLimit: number = 20) => {
  const [total, totalSetter] = useState(0)
  const [limit, limitSetter] = useState(defaultLimit)
  const [page, pageSetter] = useState(1)
  const [navPage, navPageSetter] = useState(1)

  const changePage = (newPage: number) => {
    navPageSetter(newPage)
  }

  return {
    total,
    limit,
    page,
    navPage,
    totalSetter,
    limitSetter,
    pageSetter,
    changePage
  }
}
