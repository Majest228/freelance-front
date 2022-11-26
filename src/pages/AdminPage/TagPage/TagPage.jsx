import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLanguages } from '../../../redux/slices/languages.js'
import { fetchTags } from '../../../redux/slices/tags.js'
import axios from '../../../api/axios.js'

const TagPage = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  const { tags, statusTag } = useSelector((state) => state.tags)

  const onSubmitDate = async () => {
    await axios.post('tag/create', {
      name,
    })

    dispatch(fetchTags())
  }

  return (
    <div>
      {statusTag === 'loading' ? (
        <p>Идет загрузка</p>
      ) : (
        tags.map((tag) => (
          <div>
            <p>{tag.name}</p>
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

export default TagPage
