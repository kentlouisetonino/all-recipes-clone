import axios from 'axios'

import { APIEndpoint } from 'src/helpers/enums'

export const deleteLikeAPI = ({
  accessToken,
  likeId,
  router,
}: {
  accessToken: string
  likeId: number
  router: any
}) => {
  axios({
    method: 'delete',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.LIKE_DELETE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: likeId,
    },
  })
    .then(() => {
      router.reload()
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const createLikeAPI = ({
  accessToken,
  userId,
  recipeId,
  router,
}: {
  accessToken: string
  userId: number
  recipeId: number
  router: any
}) => {
  axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.LIKE_CREATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      userId: userId,
      recipeId: recipeId,
    },
  })
    .then(() => {
      router.reload()
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}
