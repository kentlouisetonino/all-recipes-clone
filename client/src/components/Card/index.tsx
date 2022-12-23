import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import styles from './index.module.css'
import { CookiesStorage } from 'src/helpers/enums'

type Props = {
  title: string
  description: string
  author: string
}

const Card = ({ title, description, author }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    const accessToken = Cookies.get(CookiesStorage.ACCESS_TOKEN)
    if (accessToken) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [])

  return (
    <div className='card' style={{ width: '21rem' }}>
      <div className='card-body'>
        <h5 className='card-title text-truncate'>{title}</h5>
        <p
          className='card-text'
          style={{ height: '150px', overflow: 'hidden' }}
        >
          {description}
        </p>
        <p>
          By <span className={`fw-bold ${styles.authorName}`}>{author}</span>
        </p>
        <a href='#' className='btn btn-secondary w-100'>
          Details
        </a>
        {isLoggedIn && (
          <button className='btn btn-primary w-100 mt-2'>Like</button>
        )}
      </div>
    </div>
  )
}

export default Card
