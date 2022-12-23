import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'src/components/Navbar'
import Header from 'src/components/Head'
import decodeToken from 'src/helpers/decode-token'
import Spinner from 'src/components/Spinner'
import InputField from 'src/components/InputField'
import TextAreaField from 'src/components/TextAreaField'
import { getUserAPI } from 'src/api/user'
import { updateRecipeAPI, getRecipeAPI } from 'src/api/recipe'
import { CookiesStorage } from 'src/helpers/enums'
import { recipeValidator } from 'src/helpers/validators'

const UpdateRecipe = () => {
  const router = useRouter()
  const recipeId = router.query?.recipeId
  const [accessToken, setAccessToken] = useState('')
  const [userId, setUserId] = useState(0)
  const [userInfo, setUserInfo] = useState<any>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [isInputsValid, setIsInputsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    setIsLoading(true)

    updateRecipeAPI({
      accessToken: accessToken,
      recipeId: recipeId,
      title: title,
      description: description,
      ingredients: ingredients,
      steps: steps,
      userId: userId,
      setIsLoading: setIsLoading,
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
        setUserId(decodedToken?.id)

        getUserAPI({
          accessToken: accessToken,
          userId: decodedToken?.id,
          setUserInfo: setUserInfo,
        })

        getRecipeAPI({
          recipeId: recipeId,
          setTitle: setTitle,
          setDescription: setDescription,
          setIngredients: setIngredients,
          setSteps: setSteps,
        })
      }
    }
  }, [])

  useEffect(() => {
    recipeValidator
      .isValid({
        title: title,
        description: description,
        ingredients: ingredients,
        steps: steps,
      })
      .then((valid) => {
        if (valid) setIsInputsValid(true)
        else setIsInputsValid(false)
      })
  }, [title, description, ingredients, steps])

  return (
    <>
      <Header title='All Recipes| Update Recipe' />
      <Navbar currentPage='Update Recipe' />

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
            <button className='btn btn-primary'>Add Recipe</button>
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='flex-shrink-1' style={{ width: '800px' }}>
            <div className='mx-5'>
              <h3 className='fw-bolder'>Update Recipe Information</h3>
              <div className='w-75 mt-5'>
                <div className='mb-4'>
                  <InputField
                    label='Title'
                    type='text'
                    placeholder='Enter a short title'
                    value={title}
                    onChange={setTitle}
                  />
                </div>
                <div className='mb-4'>
                  <InputField
                    label='Description'
                    type='text'
                    placeholder='Enter a short description'
                    value={description}
                    onChange={setDescription}
                  />
                </div>
                <div className='mb-4'>
                  <TextAreaField
                    label='Ingredients'
                    placeholder='Enter the list of ingredients. Arrange it to bullet or numbered list'
                    value={ingredients}
                    onChange={setIngredients}
                  />
                </div>
                <div className='mb-4'>
                  <TextAreaField
                    label='Cooking Steps'
                    placeholder='Enter the steps. Arrange it to bullet or numbered list'
                    value={steps}
                    onChange={setSteps}
                  />
                </div>
                <button
                  className={`btn btn-secondary w-100 mt-3`}
                  onClick={() => onSubmit()}
                  disabled={!isInputsValid}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UpdateRecipe
