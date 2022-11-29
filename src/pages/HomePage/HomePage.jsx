import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe, fetchUsers } from '../../redux/slices/users.js'
import Profile from '../../components/Profile/Profile.jsx'
import './HomePage.scss'
import Select from 'react-select'
import { fetchLanguages } from '../../redux/slices/languages.js'
import { fetchGenders } from '../../redux/slices/genders.js'
import { fetchCountries } from '../../redux/slices/countries.js'
import { fetchTags, fetchTagsSelected } from '../../redux/slices/tags.js'
import { useState } from 'react'

import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchLanguages())
    dispatch(fetchGenders())
    dispatch(fetchCountries())
    dispatch(fetchTags())
    dispatch(fetchTagsSelected())
    dispatch(fetchMe())
  }, [])
  const { users, status } = useSelector((state) => state.users)
  const { languages } = useSelector((state) => state.languages)
  const { user, statusUser, roleId } = useSelector((state) => state.users)
  const { genders } = useSelector((state) => state.genders)
  const { countries } = useSelector((state) => state.countries)
  const { tags } = useSelector((state) => state.tags)

  const isUsersLoading = status === 'loading'
  const [filters, setFilters] = useState({
    name: [''],
    price: [0, 999999],
    subscribers: [0, 999999],
  })
  const OptionTags = tags.map((tag) => {
    return {
      id: tag.id,
      value: tag.name,
      label: tag.name,
      name: tag.name,
    }
  })
  const OptionsLangs = languages.map((lang) => {
    return {
      id: lang.id,
      value: lang.name,
      label: lang.name,
      name: lang.name,
    }
  })
  const OptionCountries = countries.map((country) => {
    return {
      id: country.id,
      value: country.name,
      label: country.name,
      name: country.name,
    }
  })
  const OptionGenders = genders.map((gender) => {
    return {
      id: gender.id,
      value: gender.name,
      label: gender.name,
      name: gender.name,
    }
  })

  function filter(array = [], filters = {}) {
    const keys = Object.keys(filters).filter((key) => filters.hasOwnProperty(key))
    return array.filter((elem) => {
      const commonKeys = keys.filter((key) => elem.hasOwnProperty(key))
      return commonKeys.reduce((flag, key) => {
        if (key == 'name') {
          const tags = []
          if (elem.tagSelect != undefined) {
            elem.tagSelect.forEach((tag) => {
              tags.push(tag.tag.name.toUpperCase())
            })
          }
          const searchText = `${elem[
            key
          ].toUpperCase()} ${elem.surname.toUpperCase()} ${elem.login.toUpperCase()} ${tags.join(
            ' ',
          )}`
          return searchText.includes(filters.name[0].toUpperCase())
        } else if (key == 'price' || key == 'subscribers') {
          if (elem[key] >= filters[key][0] && elem[key] <= filters[key][1]) return flag
          else return false
        } else if (key == 'tagSelect') {
          const arr = []
          let count = 0
          elem[key].forEach((tag) => {
            for (let i = 0; i < filters[key].length; i++) {
              if (filters[key][i] == tag.tag.name) {
                arr.push(true)
                break
              }
              arr.push(false)
            }
          })
          for (let i = 0; i < arr.length; i++) {
            if (arr[i]) count++
          }
          if (filters[key].length == 0 || filters[key].length <= count) return flag
          else return false
        } else {
          if (elem[key] == undefined) return false
          else return flag && filters[key].includes(elem[key].name)
        }
      }, true)
    })
  }

  const ChooseLangs = (selected) => {
    const arr = []
    selected.forEach((tag) => arr.push(tag.name))
    if (arr.length != 0) {
      setFilters({
        ...filters,
        language: arr,
      })
    } else {
      const newData = { ...filters }
      delete newData.language
      setFilters(newData)
    }
  }
  const ChooseTags = (selected) => {
    const arr = []
    selected.forEach((tag) => arr.push(tag.name))
    if (arr.length != 0) {
      setFilters({
        ...filters,
        tagSelect: arr,
      })
    } else {
      const newData = { ...filters }
      delete newData.tagSelect
      setFilters(newData)
    }
  }
  const ChooseCountries = (selected) => {
    const arr = []
    selected.forEach((tag) => arr.push(tag.name))
    if (arr.length != 0) {
      setFilters({
        ...filters,
        country: arr,
      })
    } else {
      const newData = { ...filters }
      delete newData.country
      setFilters(newData)
    }
  }
  const ChooseGenders = (selected) => {
    const arr = []
    selected.forEach((tag) => arr.push(tag.name))
    if (arr.length != 0) {
      setFilters({
        ...filters,
        gender: arr,
      })
    } else {
      const newData = { ...filters }
      delete newData.gender
      setFilters(newData)
    }
  }
  const ChooseMinPrice = (value) => {
    if (value == '') value = 0
    setFilters({ ...filters }, (filters.price[0] = value))
  }
  const ChooseMaxPrice = (value) => {
    if (value == '') value = 999999
    setFilters({ ...filters }, (filters.price[1] = value))
  }

  const ChooseMinSubscribers = (value) => {
    if (value == '') value = 0
    setFilters({ ...filters }, (filters.subscribers[0] = value))
  }
  const ChooseMaxSubscribers = (value) => {
    if (value == '') value = 999999
    setFilters({ ...filters }, (filters.subscribers[1] = value))
  }

  const filterdData = filter(users, filters)

  return (
    <div className="home">
      <div className="home-container">
        <h2 className="home-title">Добро пожаловать</h2>
        <p className="home-about">
          В этом списке все фрилансеры подтвердили личность. Вы видите их настоящие имена и фото.
        </p>

        <div className="home-search">
          <input
            placeholder="Искать фрилансеров на сайте"
            onChange={(e) => setFilters({ ...filters, name: [e.target.value] })}
          />
        </div>

        <div className="home-content">
          <div className="home-content__left">
            {show ? (
              <div className="home-content__left__filter">
                <div className="home-content__left__filter__languages">
                  <Select
                    classNamePrefix="custom-select__home"
                    options={OptionsLangs}
                    onChange={ChooseLangs}
                    isMulti={true}
                    placeholder="Искать по языку"
                  />
                </div>
                <div className="home-content__left__filter__tags">
                  <Select
                    classNamePrefix="custom-select__home"
                    options={OptionTags}
                    onChange={ChooseTags}
                    isMulti={true}
                    placeholder="Искать по ключевым навыкам"
                  />
                </div>
                <div className="home-content__left__filter__countries">
                  <Select
                    classNamePrefix="custom-select__home"
                    options={OptionCountries}
                    onChange={ChooseCountries}
                    isMulti={true}
                    placeholder="Искать по стране"
                  />
                </div>
                <div className="home-content__left__filter__genders">
                  <Select
                    classNamePrefix="custom-select__home"
                    options={OptionGenders}
                    onChange={ChooseGenders}
                    isMulti={true}
                    placeholder="Искать по гендеру"
                  />
                </div>
                <div className="home-content__left__filter__price">
                  <p>Фильтрация по цене</p>
                  <div className="home-content__left__filter__price__fields">
                    <div className="home-content__left__filter__price__min">
                      <input
                        type="text"
                        placeholder="От"
                        className="home-content__left__filter__price__min__input"
                        onChange={(e) => ChooseMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="home-content__left__filter__price__max">
                      <input
                        type="text"
                        placeholder="До"
                        className="home-content__left__filter__price__max__input"
                        onChange={(e) => ChooseMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="home-content__left__filter__subscribers">
                  <p>Фильтрация по подписчикам</p>
                  <div className="home-content__left__filter__subscribers__fields">
                    <div className="home-content__left__filter__subscribers__min">
                      <input
                        type="text"
                        placeholder="От"
                        className="home-content__left__filter__subscribers__min__input"
                        onChange={(e) => ChooseMinSubscribers(e.target.value)}
                      />
                    </div>
                    <div className="home-content__left__filter__subscribers__max">
                      <input
                        type="text"
                        placeholder="До"
                        className="home-content__left__filter__subscribers__max__input"
                        onChange={(e) => ChooseMaxSubscribers(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            <button className="button-show" onClick={() => setShow(!show)}>
              {show ? <p>Закрыть</p> : <>Открыть</>}
            </button>
          </div>
          <div className="home-content__right">
            <div className="home-profiles">
              {isUsersLoading ? (
                <p>Посты еще загружаются...</p>
              ) : (
                filterdData.map((item, id) => <Profile key={id} item={item} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
