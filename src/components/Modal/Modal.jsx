import React, { useEffect, useState } from 'react'
import './Modal.scss'
import axios from '../../api/axios.js'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../../redux/slices/countries.js'
import { fetchLanguages } from '../../redux/slices/languages.js'
import { fetchGenders } from '../../redux/slices/genders.js'
import { useNavigate } from 'react-router-dom'
import { fetchMe } from '../../redux/slices/users.js'

const Modal = ({ setModal }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [about, setAbout] = useState('')
  const [country, setCountry] = useState(1)
  const [language, setLanguage] = useState(1)
  const [gender, setGender] = useState(1)
  const [price, setPrice] = useState(0)
  const [subscribers, setSubscribers] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('user/profile').then((res) => {
      setName(res.data.name)
      setSurname(res.data.surname)
      setEmail(res.data.email)
      setLogin(res.data.login)
      setPhoneNumber(res.data.phoneNumber)
      setAbout(res.data.about)
      setPrice(res.data.price)
      setSubscribers(res.data.subscribers)
    })
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchLanguages())
    dispatch(fetchGenders())
  }, [])

  const { countries } = useSelector((state) => state.countries)
  const { languages } = useSelector((state) => state.languages)
  const { genders } = useSelector((state) => state.genders)

  useEffect(() => {
    console.log({ language, name, surname, login, phoneNumber, country, about, email })
  }, [language, name, surname, login, phoneNumber, country, about, email])

  const countryOptions = countries.map((country, id) => {
    let value = country.name,
      label = country.name
    let newId = ++id
    return { newId, value, label }
  })

  const languageOptions = languages.map((language, id) => {
    let value = language.name,
      label = language.name
    let newId = ++id
    return { newId, value, label }
  })

  const genderOptions = genders.map((gender, id) => {
    let value = gender.name,
      label = gender.name
    let newId = ++id
    return { newId, value, label }
  })

  const fields = {
    language,
    name,
    surname,
    login,
    phoneNumber,
    country,
    about,
    email,
    gender,
    price,
    subscribers,
  }

  const onChangeDate = () => {
    axios.put('user/profile', fields).then((res) => {
      dispatch(fetchMe())
      navigate('/profile')
    })
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="test">
          <div className="modal-content__upgrade">
            <h2>Редактировать профиль</h2>
            <button
              className="modal-content__upgrade__close"
              onClick={() => setModal(false)}
            ></button>
          </div>
          <div className="modal-content__body">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onChangeDate()
                setModal(false)
              }}
            >
              <div className="modal-content__body__fields">
                <div className="modal-content__body__fields__name">
                  <div className="modal-content__body__fields__name__content">
                    <input
                      name="firstName"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <label htmlFor="firstName">Имя</label>
                  </div>
                </div>
                <div className="modal-content__body__fields__surname">
                  <div className="modal-content__body__fields__surname__content">
                    <input
                      name="secondName"
                      onChange={(e) => setSurname(e.target.value)}
                      value={surname}
                      type="text"
                    />
                    <label htmlFor="secondName">Фамилия</label>
                  </div>
                </div>

                <div className="modal-content__body__fields__email">
                  <div className="modal-content__body__fields__email__content">
                    <input
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      // type='text'
                      value={email}
                    />
                    <label htmlFor="email">Электронная почта</label>
                  </div>
                </div>
                <div className="modal-content__body__fields__login">
                  <div className="modal-content__body__fields__login__content">
                    <input name="login" onChange={(e) => setLogin(e.target.value)} value={login} />
                    <label htmlFor="login">Логин</label>
                  </div>
                </div>
                <div className="modal-content__body__fields__phone">
                  <div className="modal-content__body__fields__phone__content">
                    <input
                      name="phone"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      type="text"
                    />
                    <label htmlFor="phone">Номер телефона</label>
                  </div>
                </div>
                <div className="modal-content__body__fields__phone">
                  <div className="modal-content__body__fields__phone__content">
                    <input
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type="text"
                    />
                    <label htmlFor="price">Цена за час</label>
                  </div>
                </div>
                <div className="modal-content__body__fields__phone">
                  <div className="modal-content__body__fields__phone__content">
                    <input
                      name="subscribers"
                      onChange={(e) => setSubscribers(e.target.value)}
                      value={subscribers}
                      type="text"
                    />
                    <label htmlFor="subscribers">Подписчики</label>
                  </div>
                </div>
                <div className="modal-content__body__fields__about">
                  <div className="modal-content__body__fields__about__content">
                    <textarea
                      placeholder="О себе"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </div>
                </div>
                <Select
                  className="select"
                  onChange={(e) => setCountry(e.newId)}
                  options={countryOptions}
                />
                <Select
                  className="select"
                  onChange={(e) => setLanguage(e.newId)}
                  options={languageOptions}
                />
                <Select
                  className="select"
                  onChange={(e) => setGender(e.newId)}
                  options={genderOptions}
                />
                <div></div>
              </div>
              <button className="modal-content__body__submit" type="submit">
                Сохранить изменения
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
