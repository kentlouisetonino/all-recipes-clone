import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'src/components/Navbar'
import Header from 'src/components/Head'
import { PageRoute } from 'src/helpers/enums'
import { getAllRecipesByTitle } from 'src/api/recipe'

const Search = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])

  const onSubmit = () => {
    getAllRecipesByTitle({
      search: search,
      setRecipes: setRecipes,
    })
  }

  return (
    <Fragment>
      <Header title='All Recipes | Search' />
      <Navbar currentPage='search' />

      <div className='mt-5 d-flex justify-content-center'>
        <input
          className='me-2 px-2 w-50'
          type='search'
          placeholder='Search for recipe'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='btn btn-outline-success' onClick={() => onSubmit()}>
          Search
        </button>
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

export default Search
