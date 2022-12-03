import axios from 'axios'
import { parseCookies } from 'nookies'
import { COOKIES } from '~/utils/constants'

export const adminClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
  })

  instance.interceptors.request.use(
    async function (config) {
      const cookies = await parseCookies()
      if (cookies[COOKIES.JWT]) {
        config.headers!.Authorization = `Bearer ${cookies[COOKIES.JWT]}`
      }
      return { ...config }
    },
    function (error) {
      // Do something with request error
      console.log('ADMIN ERROR')
      console.log(error)
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
