import React, { useState } from 'react'
import './AuthPage.scss'
import AuthModal from './AuthModal/AuthModal.jsx'

const AuthPage = () => {
  const [modal, setModal] = useState(false)

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-header__content">
            <div className="auth-header__content__logo">
              <h2>
                <span>Топ</span>Фриланс
              </h2>
            </div>
            <div className="auth-header__content__button">
              <button onClick={() => setModal(!modal)}>Вход или регистрация</button>
            </div>
          </div>
        </div>
        {modal ? <AuthModal /> : ''}
      </div>
    </div>
  )
}

export default AuthPage
