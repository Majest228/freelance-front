import React, { useEffect } from 'react'
import './HeaderDrop.scss'
import { Link, useNavigate } from 'react-router-dom'
import { fetchMe } from '../../../../redux/slices/users.js'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/slices/auth.js'
import settings from '../../../../assets/setting.png'
import profile from '../../../../assets/user.png'
import exit from '../../../../assets/exit.png'
const HeaderDrop = ({ setShowProfile }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
    setShowProfile(false)
  }
  const { user, statusUser } = useSelector((state) => state.users)
  return (
    <div className="drop">
      {statusUser === 'loading' ? (
        <p>Загрузка...</p>
      ) : (
        <div className="drop-content">
          <div className="drop-content__info">
            <img
              className="drop-content__info__photo"
              src={`http://localhost:8080/${user.avatarPath}`}
              alt=""
            />
            <div className="drop-content__info__main">
              <p>
                {user.name[0]}. {user.surname}
              </p>
              <p>@{user.login}</p>
            </div>
          </div>
          <div className="drop-links">
            <Link onClick={() => setShowProfile(false)} to="/profile">
              <img src={profile} alt="" />
              <p>Профиль</p>
            </Link>
            <Link onClick={() => setShowProfile(false)} to="/profile">
              <img src={settings} alt="" />
              <p>Настройка</p>
            </Link>
            <a onClick={onLogout} className="drop-links__a">
              <img src={exit} alt="" />
              <p>Выход</p>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeaderDrop
