import React, { useEffect, useState } from 'react'

import { fetchCountries } from '../../../redux/slices/countries.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../api/axios.js'
const CountryPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])
  const { countries, status } = useSelector((state) => state.countries)
  const [name, setName] = useState('')
  const onSubmitDate = async () => {
    await axios.post('country/create', {
      name,
    })

    dispatch(fetchCountries())
  }

  return (
    <div>
      {status === 'loading' ? (
        <p>Идет загрузка</p>
      ) : (
        countries.map((country) => (
          <div>
            <p>{country.name}</p>
          </div>
        ))
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmitDate()
        }}
      >
        <input type="text" placeholder="Страна" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Добавить запись</button>
      </form>
    </div>
  )
}

export default CountryPage
