import React from 'react'
import './Profile.scss'
import { Link } from 'react-router-dom'

const Profile = ({ item }) => {
  return (
    <Link to={`/user/${item.id}`}>
      <div className="profile-page">
        <div className="profile-page-content">
          <div className="profile-page-content__left">
            <img src={`http://localhost:8080/${item.avatarPath}`} alt="" />
          </div>
          <div className="profile-page-content__right">
            <h2 className="profile-page-content__right__name">{item.name + ' ' + item.surname}</h2>
            <div className="profile-page__login">
              <p> Логин - {item.login}</p>
              <div className="profile-page-tags">
                <p>Стэк:</p>
                {item.tagSelect.map((tag, id) => (
                  <div className="profile-page-tags__tag" key={id}>
                    <p>{tag.tag.name} </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-page__items">
              <div className="profile-page__price">
                <p>Цена за час работы: {item.price} тг.</p>
              </div>
              <div className="profile-page__subscribe">
                <p>Кол-во подписок - {item.subscribers}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Profile
