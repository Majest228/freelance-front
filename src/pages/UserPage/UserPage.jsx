import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from '../../redux/slices/users.js'
import './UserPage.scss'
import Modal from '../../components/Modal/Modal.jsx'
import { fetchTags, fetchTagsSelected } from '../../redux/slices/tags.js'
import Select from 'react-select'
import axios from '../../api/axios.js'
import { Link } from 'react-router-dom'
import UserModel from './UserModel'

const UserPage = () => {
  const [currentSelects, setCurrentSelects] = useState([1])
  const [imageUrl, setImageUrl] = useState(null)
  const [showImage, setShowImage] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
    dispatch(fetchTagsSelected())
    dispatch(fetchTags())
  }, [])

  const [modal, setModal] = useState(false)
  const { user, statusUser, roleId } = useSelector((state) => state.users)
  const { tagsSelect, statusTag, tags } = useSelector((state) => state.tags)
  const isTagsLoading = statusTag === 'loading'

  const getSelect = () => {
    return currentSelects
      ? options.filter((c) => currentSelects.indexOf(c.id) >= 0)
      : options.find((c) => c.id === currentSelects)
  }

  const onSubmit = async () => {
    await currentSelects.forEach((item) => {
      axios
        .post('tag-select', {
          tagId: item,
        })
        .then((res) => dispatch(fetchTagsSelected()))
    })
  }

  const isMulti = true

  const options = tags.map((item, id) => {
    return {
      id: id + 1,
      value: item.name,
      label: item.name,
    }
  })

  const onChange = (newSelect) => {
    setCurrentSelects(isMulti ? newSelect.map((c) => c.id) : newSelect.id)
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

  return (
    <div className="user">
      {statusUser === 'loading' ? (
        <p>Идет загрузка</p>
      ) : (
        <div className="user-container">
          <h3 className="user-title">Личный кабинет</h3>
          <div className="user-fields">
            <div className="user-fields__field">
              <span>Имя и Фамилия</span>
              <p>
                {user.name} {user.surname}
              </p>
            </div>
            <div className="user-fields__field">
              <span>Электронная почта</span>
              <p>{user.email}</p>
            </div>
            <div className="user-fields__field">
              <span>Номер телефона</span>
              <p>{user.phoneNumber}</p>
            </div>
            <div className="user-fields__field">
              <span>Логин</span>
              <p>{user.login}</p>
            </div>
            <div className="user-fields__field">
              <span>Язык</span>
              {user.language == undefined || null ? '' : <p>{user.language.name}</p>}
            </div>
            <div className="user-fields__field">
              <span>Страна</span>
              {user.country == undefined || null ? '' : <p>{user.country.name}</p>}
            </div>
            <div className="user-fields__field">
              <span>Пол</span>
              {user.gender == undefined || null ? '' : <p>{user.gender.name}</p>}
            </div>
            <div className="user-fields__field">
              <span>Цена</span>
              <p>{user.price}</p>
            </div>
            <div className="user-fields__field">
              <span>Подписчики</span>
              <p>{user.subscribers}</p>
            </div>
          </div>
          <div className="user-fields__field">
            <span>Описание</span>
            <p>{user.about}</p>
          </div>
          <button className="user-button" onClick={() => setModal(!modal)}>
            Редактировать личные данные
          </button>
          {modal ? <Modal setModal={setModal} /> : ''}
          <div>
            <p className="user-paragraph">Ключевые навыки</p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <Select
                classNamePrefix="custom-select"
                value={getSelect()}
                isMulti={isMulti}
                onChange={onChange}
                options={options}
              />
            </form>
            <div className="user-tags">
              {!isTagsLoading
                ? tagsSelect.map((item) => (
                    <div className="user-tag">
                      <p className="user-text">{item.tag.name}</p>
                    </div>
                  ))
                : ''}
            </div>
            <button onClick={() => onSubmit()} className="user-button" type="submit">
              Сохранить изменения
            </button>
          </div>
          <button onClick={() => setShowImage(true)}>Изменить аватарку</button>
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
          <div>{user.isAdmin ? <Link to={'/admin-panel'}>Перейти в админ панель</Link> : ''}</div>
        </div>
      )}
    </div>
  )
}

export default UserPage
