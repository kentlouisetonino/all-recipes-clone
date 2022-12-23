import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'src/components/Navbar'
import Header from 'src/components/Head'
import decodeToken from 'src/helpers/decode-token'
import { getUserAPI } from 'src/api/user'
import { getAllRecipesByUserAPI, deleteRecipeAPI } from 'src/api/recipe'
import { CookiesStorage, PageRoute } from 'src/helpers/enums'

const Profile = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState('')
  const [userInfo, setUserInfo] = useState<any>()
  const [recipes, setRecipes] = useState<any[]>([])

  const onDeleteRecipe = (recipeId: number) => {
    deleteRecipeAPI({
      accessToken: accessToken,
      recipeId: recipeId,
      router: router,
    })
  }

  useEffect(() => {
    const accessToken = Cookies.get(CookiesStorage.ACCESS_TOKEN)
    if (accessToken) {
      setAccessToken(accessToken)
      const decodedToken = decodeToken({ token: accessToken })

      if (!decodedToken) {
        Cookies.remove(CookiesStorage.ACCESS_TOKEN)
        router.push('/login')
      } else {
        getUserAPI({
          accessToken: accessToken,
          userId: decodedToken?.id,
          setUserInfo: setUserInfo,
        })

        getAllRecipesByUserAPI({
          accessToken: accessToken,
          userId: decodedToken?.id,
          setRecipes: setRecipes,
        })
      }
    }
  }, [])

  return (
    <>
      <Header title='All Recipes | Profile' />
      <Navbar currentPage='profile' />

      <div className='d-flex'>
        <div
          className='flex-shrink-0 p-3 text-white bg-secondary'
          style={{ width: '280px', height: '100vh' }}
        >
          <p className='display-5 fs-6'>First Name | {userInfo?.firstName}</p>
          <p className='display-5 fs-6'>Last Name | {userInfo?.lastName}</p>
          <p className='display-5 fs-6'>Email | {userInfo?.email}</p>
          <hr />
          <div>
            <button
              className='btn btn-primary'
              onClick={() => router.push(PageRoute.PROFILE_ADD_RECIPE)}
            >
              Add Recipe
            </button>
          </div>
        </div>

        <div className='flex-shrink-1' style={{ width: '800px' }}>
          <div className='d-flex flex-wrap justify-content-between mx-3 mt-5'>
            {recipes.length ? (
              recipes.map((recipe, index) => (
                <div
                  key={index}
                  className='card'
                  style={{ width: '48%', margin: '7px' }}
                >
                  <div className='card-body'>
                    <h5 className='card-title text-truncate'>
                      {recipe?.title}
                    </h5>
                    <p
                      className='card-text'
                      style={{ height: '150px', overflow: 'hidden' }}
                    >
                      {recipe?.description}
                    </p>
                    <button
                      className='btn btn-secondary w-100'
                      onClick={() =>
                        router.push(PageRoute.RECIPE + `/${recipe.id}/details`)
                      }
                    >
                      Details
                    </button>
                    <button
                      className='btn btn-primary w-100 mt-2'
                      onClick={() =>
                        router.push(
                          PageRoute.PROFILE_RECIPE + `/${recipe.id}/update`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger w-100 mt-2'
                      onClick={() => onDeleteRecipe(recipe?.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className='mx-auto text-center'>
                <h1 className='fw-bolder'>No Posted Recipes</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
