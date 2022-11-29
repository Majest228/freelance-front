import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../../api/axios.js'
import './ProfilePage.scss'

const ProfilePage = () => {
  const [profile, setProfile] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  useEffect(() => {
    axios.get(`/user/profile/${id}`).then((res) => {
      setProfile(res.data)
      setIsLoading(false)
    })
  }, [])

  console.log(profile)
  if (isLoading) {
    return <p>Идет загрузка</p>
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-content">
          <img src={`http://localhost:8080/${profile.avatarPath}`} alt="" />
          <div className="profile-content__info">
            <div className="profile-content__info__fields">
              <div className="profile-content__info__fields__main">
                <div className="profile-content__info__fields__main__field">
                  <span>Имя и Фамилия</span>
                  <p>
                    {profile.name} {profile.surname}
                  </p>
                </div>
                <div className="profile-content__info__fields__main__field">
                  <span>Электронная почта</span>
                  <p>{profile.email}</p>
                </div>
                <div className="profile-content__info__fields__main__field">
                  <span>Номер Телефона</span>
                  <p>{profile.phoneNumber}</p>
                </div>
                <div className="profile-content__info__fields__main__field">
                  <span>Логин</span>
                  <p>{profile.login}</p>
                </div>
              </div>
              <div className="profile-content__info__fields__tags">
                <p className="profile-content__info__fields__tags__title">Список тэгов:</p>
                {profile.tagSelect
                  ? profile.tagSelect.map((item) => (
                      <div className="profile-content__info__fields__tags__field">
                        <p className="profile-content__info__fields__tags__field__text">
                          {item.tag.name}
                        </p>
                      </div>
                    ))
                  : 'Ошибка'}
              </div>
              <div className="profile-content__info__fields__language">
                <div className="profile-content__info__fields__language__field">
                  <span>Язык</span>
                  {profile.language == undefined || null ? '' : <p>{profile.language.name}</p>}
                </div>
                <div className="profile-content__info__fields__language__field">
                  <span>Страна</span>
                  {profile.country == undefined || null ? '' : <p>{profile.country.name}</p>}
                </div>
              </div>
              <div className="profile-content__info__fields__language">
                <div className="profile-content__info__fields__language__field">
                  <span>Цена за час</span>
                  <p>{profile.price}</p>
                </div>
                <div className="profile-content__info__fields__language__field">
                  <span>Подписчики</span>
                  <p>{profile.subscribers}</p>
                </div>
              </div>
              <div className="profile-content__links">
                <a href={profile.instagram}>Instagram</a>
                <a href={profile.github}>Github</a>
                <a href={profile.facebook}>Facebook</a>
              </div>
              <div className="profile-content__info__fields__about">
                <div className="profile-content__info__fields__about__field">
                  <span>Описание</span>
                  <p>{profile.about}</p>
                </div>
              </div>
            </div>
            {/*<div className="profile-content__info__fields">*/}

            {/*  <div className="profile-tags">*/}
            {/*    <div>*/}
            {/*      <p>Список тэгов:</p>*/}
            {/*    </div>*/}

            {/*{profile.tagSelect*/}
            {/*  ? profile.tagSelect.map((item) => (*/}
            {/*      <div className="profile-tags__tag">*/}
            {/*        <p className="profile-tags__text">{item.tag.name}</p>*/}
            {/*      </div>*/}
            {/*    ))*/}
            {/*  : 'Ошибка'}*/}
            {/*  </div>*/}
            {/*  <div className="profile-content__info__fields__field">*/}
            {/*    <span>Язык</span>*/}
            {/*    <p>{profile.country.name}</p>*/}
            {/*  </div>*/}
            {/*  <div className="profile-content__info__fields__field">*/}
            {/*    <span>Язык</span>*/}
            {/*    <p>{profile.language.name}</p>*/}
            {/*  </div>*/}
            {/*  <div className="profile-content__info__fields__field">*/}
            {/*    <span>Описание</span>*/}
            {/*    <p>{profile.about}</p>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
