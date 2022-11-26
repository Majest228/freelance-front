import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from '../../../redux/slices/users.js'
import './Header.scss'
import { logout } from '../../../redux/slices/auth.js'
import UserModel from '../../../pages/UserPage/UserModel.jsx'
import axios from '../../../api/axios.js'
const Header = () => {
  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  const onLogout = () => {
    dispatch(logout())
  }

  const saveImage = async () => {
    await axios.put('user/media', {
      avatarPath: imageUrl,
    })
    dispatch(fetchMe())
    setShowImage(false)
  }

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      await axios.post('media', formData).then((res) => setImageUrl(res.data.path))
    } catch (e) {}
  }

  const inputRef = useRef(null)

  const { user } = useSelector((state) => state.users)
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-content__left">
            <Link to="/">
              <span>Топ</span>Фриланс
            </Link>
          </div>
          <div className="header-content__right">
            <button onClick={() => setShowImage(!showImage)}>
              <img src={`http://localhost:8080/${user.avatarPath}`} alt="" />
            </button>
            {showImage ? (
              <UserModel
                setShowImage={setShowImage}
                setImageUrl={setImageUrl}
                showImage={showImage}
                saveImage={saveImage}
                handleChangeFile={handleChangeFile}
                imageUrl={imageUrl}
              />
            ) : (
              ''
            )}
            <Link to="/profile">Профиль</Link>
            <button className="header-content__right__button" onClick={onLogout}>
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
