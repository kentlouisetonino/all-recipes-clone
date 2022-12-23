import Cookies from 'js-cookie'
import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'src/components/Navbar'
import Header from 'src/components/Head'
import styles from './index.module.css'
import Like from 'src/components/icons/Like'
import UnLike from 'src/components/icons/Unlike'
import decodeToken from 'src/helpers/decode-token'
import { deleteLikeAPI, createLikeAPI } from 'src/api/like'
import { getAllRecipesAPI } from 'src/api/recipe'
import { PageRoute, CookiesStorage } from 'src/helpers/enums'

const Home = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState('')
  const [userId, setUserId] = useState(0)
  const [recipes, setRecipes] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const onUnLike = (likeId: number) => {
    deleteLikeAPI({
      accessToken: accessToken,
      likeId: likeId,
      router: router,
    })
  }

  const onLike = (recipeId: number) => {
    createLikeAPI({
      accessToken: accessToken,
      userId: userId,
      recipeId: recipeId,
      router: router,
    })
  }

  useEffect(() => {
    const accessToken = Cookies.get(CookiesStorage.ACCESS_TOKEN)
    getAllRecipesAPI({ setRecipes: setRecipes })

    if (accessToken) {
      const decodedToken = decodeToken({ token: accessToken })
      setAccessToken(accessToken)

      if (decodedToken) {
        setIsLoggedIn(true)
        setUserId(decodedToken?.id)
      } else {
        Cookies.remove(CookiesStorage.ACCESS_TOKEN)
        router.push(PageRoute.LOGIN)
      }
    }
  }, [])

  return (
    <Fragment>
      <Header title='All Recipes | Home' />
      <Navbar />

      <div className='container-fluid py-5 bg-dark text-white text-center align-items-center mx-auto justify-content-center mt-4'>
        <h1 className='display-5 fw-bold'>A Guide to Cooking</h1>
        <p className={`display-5 fs-6 fw-lighter ${styles.jumbotronParagraph}`}>
          Search for your favorites recipes. Login to like other author recipes
          and post your own recipe.
        </p>
      </div>

      {!recipes.length ? (
        <div className='text-center align-items-center mx-auto justify-content-center mt-5'>
          <h3 className='fw-bolder'>No Recipes Found</h3>
        </div>
      ) : (
        <div className='container'>
          <div className='row d-flex flex-wrap justify-content-between mt-4'>
            {recipes.map((recipe: any, index) => (
              <div
                key={index}
                className='card'
                style={{ width: '48%', margin: '7px' }}
              >
                <div className='card-body'>
                  <h5 className='card-title text-truncate'>{recipe?.title}</h5>
                  <p
                    className='card-text mb-4'
                    style={{ height: '150px', overflow: 'hidden' }}
                  >
                    {recipe?.description}
                  </p>
                  {isLoggedIn ? (
                    <h5 className='mb-2 d-flex align-items-center mx-auto fw-lighter'>
                      {recipe?.likes?.length}{' '}
                      {recipe?.likes?.some(
                        (like: any) => like.userId === userId
                      ) ? (
                        <Like
                          isLoggedIn={true}
                          onClick={() =>
                            onUnLike(
                              recipe?.likes?.filter(
                                (like: any) =>
                                  like.userId === userId &&
                                  like.recipeId === recipe.id
                              )[0].id
                            )
                          }
                        />
                      ) : (
                        <UnLike
                          onClick={() => {
                            onLike(recipe?.id)
                          }}
                        />
                      )}
                    </h5>
                  ) : (
                    <Fragment>
                      <h5 className='mb-2 d-flex align-items-center mx-auto fw-lighter'>
                        {recipe?.likes?.length} <Like />
                      </h5>
                    </Fragment>
                  )}
                  <button
                    className='btn btn-secondary w-100'
                    onClick={() =>
                      router.push(PageRoute.RECIPE + `/${recipe.id}/details`)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Home
