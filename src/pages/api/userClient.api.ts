import axios from 'axios'
import Cookies from 'js-cookie'
import { USER_COOKIES } from '~/utils/constants'

export const userClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
  })

  instance.interceptors.request.use(
    async function (config) {
      const cookies = Cookies.get(USER_COOKIES.JWT)
      if (cookies) {
        config.headers!.Authorization = `Bearer ${cookies}`
      }
      return { ...config }
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  return instance
}
