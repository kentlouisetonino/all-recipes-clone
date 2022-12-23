import axios from 'axios'
import Swal from 'sweetalert2'

import { APIEndpoint, PageRoute } from 'src/helpers/enums'

export const getRecipeAPI = ({
  recipeId,
  setTitle,
  setDescription,
  setIngredients,
  setSteps,
  setAuthor,
}: {
  recipeId: any
  setTitle: any
  setDescription: any
  setIngredients: any
  setSteps: any
  setAuthor?: any
}) => {
  axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.RECIPE,
    params: {
      id: Number(recipeId),
    },
  })
    .then((res) => {
      setTitle(res.data.title)
      setDescription(res.data.description)
      setIngredients(res.data.ingredients)
      setSteps(res.data.steps)

      if (setAuthor) {
        setAuthor(res.data.author)
      }
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const getAllRecipesAPI = ({ setRecipes }: { setRecipes: any }) => {
  axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.RECIPE_ALL,
  })
    .then((res) => {
      setRecipes(res.data)
    })
    .catch((err) => {
      console.log(err.response.data.message)
    })
}

export const getAllRecipesByTitle = ({
  search,
  setRecipes,
}: {
  search: string
  setRecipes: any
}) => {
  axios({
    method: 'get',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
      APIEndpoint.RECIPE_ALL_BY_TITLE,
    params: {
      search: search,
    },
  })
    .then((res) => {
      setRecipes(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const getAllRecipesByUserAPI = ({
  accessToken,
  userId,
  setRecipes,
}: {
  accessToken: string
  userId: string
  setRecipes: any
}) => {
  axios({
    method: 'get',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
      APIEndpoint.RECIPE_ALL_BY_USER,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: userId,
    },
  })
    .then((res) => {
      setRecipes(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const deleteRecipeAPI = ({
  accessToken,
  recipeId,
  router,
}: {
  accessToken: string
  recipeId: number
  router: any
}) => {
  axios({
    method: 'delete',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.RECIPE_DELETE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: recipeId,
    },
  })
    .then(() => {
      Swal.fire('Recipe Successfully Deleted', 'Reload Page', 'success').then(
        () => {
          router.reload()
        }
      )
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const createRecipeAPI = ({
  accessToken,
  title,
  description,
  ingredients,
  steps,
  userId,
  setIsLoading,
  router,
}: {
  accessToken: string
  title: string
  description: string
  ingredients: string
  steps: string
  userId: number
  setIsLoading: any
  router: any
}) => {
  axios({
    method: 'post',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.RECIPE_CREATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      title: title,
      description: description,
      ingredients: ingredients,
      steps: steps,
      userId: userId,
    },
  })
    .then(() => {
      setIsLoading(false)

      Swal.fire('Success', 'Go Back to Home Page', 'success').then(() => {
        router.push(PageRoute.HOME)
      })
    })
    .catch((err) => {
      setIsLoading(false)
      console.error(err.response.data.message)
    })
}

export const updateRecipeAPI = ({
  accessToken,
  recipeId,
  title,
  description,
  ingredients,
  steps,
  userId,
  setIsLoading,
  router,
}: {
  accessToken: string
  recipeId: any
  title: string
  description: string
  ingredients: string
  steps: string
  userId: number
  setIsLoading: any
  router: any
}) => {
  axios({
    method: 'post',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.RECIPE_UPDATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      id: Number(recipeId),
      title: title,
      description: description,
      ingredients: ingredients,
      steps: steps,
      userId: userId,
    },
  })
    .then(() => {
      setIsLoading(false)

      Swal.fire(
        'Recipe Successfully Updated',
        'Go Back to Profile',
        'success'
      ).then(() => {
        router.push(PageRoute.PROFILE)
      })
    })
    .catch((err) => {
      setIsLoading(false)
      console.error(err.response.data.message)
    })
}
