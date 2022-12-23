import { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Header from 'src/components/Head'
import Navbar from 'src/components/Navbar'
import { getRecipeAPI } from 'src/api/recipe'

const Details: NextPage = () => {
  const router = useRouter()
  const recipeId = router.query?.recipeId
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [author, setAuthor] = useState('')
  const [steps, setSteps] = useState('')

  useEffect(() => {
    getRecipeAPI({
      recipeId: recipeId,
      setTitle: setTitle,
      setDescription: setDescription,
      setIngredients: setIngredients,
      setSteps: setSteps,
      setAuthor: setAuthor,
    })
  }, [])

  return (
    <Fragment>
      <Header title='All Recipes | Recipe Details' />
      <Navbar />

      <div
        className='mx-5 mt-5 row justify-content-center mx-auto'
        style={{ width: '800px' }}
      >
        <h3 className='text-center fw-bolder mt-5'>{title}</h3>

        <div className='mt-5'>
          <h5 className='fw-bold'>Description</h5>
          <p>{description}</p>
        </div>

        <div className='mt-5'>
          <h5 className='fw-bold'>Ingredients</h5>
          <p>{ingredients}</p>
        </div>

        <div className='mt-5'>
          <h5 className='fw-bold'>Cooking Steps</h5>
          <p>{steps}</p>
        </div>

        <div className='mt-5'>
          <p className='fw-lighter fst-italic'>Posted By: {author}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default Details
