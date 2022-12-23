import axios from 'axios'

import { APIEndpoint } from 'src/helpers/enums'

export const getUserAPI = ({
  accessToken,
  userId,
  setUserInfo,
}: {
  accessToken: string
  userId: string
  setUserInfo: any
}) => {
  axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.USER,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: userId,
    },
  })
    .then((res) => {
      setUserInfo(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}
