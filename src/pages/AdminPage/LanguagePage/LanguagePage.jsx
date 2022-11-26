import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguages } from '../../../redux/slices/languages.js'
import axios from '../../../api/axios.js'

const LanguagePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLanguages())
  }, [])

  const { languages, status } = useSelector((state) => state.languages)
  const [name, setName] = useState('')

  const onSubmitDate = async () => {
    await axios.post('language/create', {
      name,
    })

    dispatch(fetchLanguages())
  }
  return (
    <div>
      {status === 'loading' ? (
        <p>Идет загрузка</p>
      ) : (
        languages.map((language) => (
          <div>
            <p>{language.name}</p>
          </div>
        ))
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmitDate()
        }}
      >
        <input type="text" placeholder="Язык" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Добавить запись</button>
      </form>
    </div>
  )
}

export default LanguagePage
