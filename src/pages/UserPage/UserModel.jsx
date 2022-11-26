import React, { useRef, useState } from 'react'
import Select from 'react-select'
import './UserPage.scss'
const UserModel = ({
  setImageUrl,
  showImage,
  saveImage,
  handleChangeFile,
  imageUrl,
  setShowImage,
}) => {
  const inputRef = useRef(null)
  return (
    <div className="user-modal">
      <div className="user-modal__content">
        <div className="user-modal__content__header">
          <button onClick={() => setShowImage(false)}>X</button>
        </div>
        <input ref={inputRef} type="file" hidden onChange={handleChangeFile} />
        <form onSubmit={(e) => e.preventDefault()}>
          <img
            onClick={() => inputRef.current.click()}
            src={`http://localhost:8080/${imageUrl}`}
            alt=""
          />
          <button className="user-modal__button" onClick={saveImage}>
            Сохранить фото
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserModel
