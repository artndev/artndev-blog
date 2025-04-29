import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios'
import ArticleBack from '../components/ArticleBack'
import Button from '../components/Button'
import ErrorHandler from '../components/ErrorHandler'
import config from '../config.json'
import { useAdminContext } from '../contexts/Admin'
import { useAuthContext } from '../contexts/Auth'
import exit from '../imgs/exit.svg'
import '../styles/css/Profile.css'

const Profile = () => {
  const navigator = useNavigate()
  const { admin, setAdmin } = useAdminContext()
  const {
    removeCookie,
    accessToken,
    setAccessToken,
    setRefreshToken,
    userData,
    setUserData,
  } = useAuthContext()
  const [data, setData] = useState<IArticlesData | undefined>(undefined)
  const [err, setErr] = useState<IAxiosErrorResponse>(undefined)

  const logout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    navigator('/articles')
    setTimeout(() => {
      removeCookie('refresh_token')
      setRefreshToken(undefined)
      setAccessToken(undefined)
      setUserData(undefined)
      setAdmin(undefined)
    }, 4)
  }

  useEffect(() => {
    axios
      .get('/saves', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setData(response.data.answer)
      })
      .catch(err => {
        console.log(err)

        if (config.ACCEPTED_ERR_CODES.includes(err.response.status)) {
          setAccessToken(undefined)
          return
        }

        setErr(err.response)
      })
  }, [accessToken]) // Don't forget about dependencies!

  // useEffect(() => {
  //     console.log(data)
  // }, [data])

  // useEffect(() => {
  //   console.log(admin)
  // }, [admin])

  return (
    <div className="profile__container f-md">
      {data ? (
        <div className="profile">
          <div className="profile__group">
            <div className="profile__info">
              You are logged as{' '}
              <span className="bold">@{userData!.username}</span> (
              {admin ? (
                <span id="red">admin</span>
              ) : (
                <span id="blue">user</span>
              )}
              )
            </div>
            <form className="profile__form" method="post" onSubmit={logout}>
              <Button
                width={35}
                height={35}
                isInverted={true}
                type={'submit'}
                content={<img src={exit} alt="Logout" />}
              />
            </form>
          </div>
          {data.length > 0 ? (
            <div className="profile__articles">
              {data.map((val, i) => {
                return (
                  <Link key={i} to={`/articles/${val.Id}`}>
                    <ArticleBack data={val} />
                  </Link>
                )
              })}
            </div>
          ) : (
            'You seem to like reading a lot. By the way, you have not saved any articles yet...'
          )}
        </div>
      ) : (
        <ErrorHandler err={err} />
      )}
    </div>
  )
}

export default Profile
