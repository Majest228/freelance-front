import React, { useState } from 'react'
import './AuthModal.scss'
import { useForm } from 'react-hook-form'
import RegisterForm from './RegisterForm/RegisterForm.jsx'
import LoginForm from './LoginForm/LoginForm.jsx'

const AuthModal = () => {
  const [regMode, setModeReg] = useState(false)

  return (
    <div className="authmodal">
      <div className={`authmodal-content ${regMode ? 'regMode' : ''}`}>
        {regMode ? <RegisterForm setModeReg={setModeReg} /> : <LoginForm setModeReg={setModeReg} />}
        {/*  <div className="authmodal-content__title">*/}
        {/*    <p>{regMode ? 'Регистрация' : 'Авторизация '}</p>*/}
        {/*  </div>*/}
        {/*  <div className="authmodal-content__form">*/}
        {/*    <form*/}
        {/*      // onSubmit={(e) => {*/}
        {/*      //   e.preventDefault()*/}
        {/*      //   // regMode ? sendRegister() : sendLogin()*/}
        {/*      // }}*/}
        {/*      onSubmit={handleSubmit(onSubmit)}*/}
        {/*    >*/}
        {/*      <div className="authmodal-content__form__input">*/}
        {/*        <div className="authmodal-content__form__input__roles">*/}
        {/*          /!*{regMode*!/*/}
        {/*          /!*  ? roles.map((role) => (*!/*/}
        {/*          /!*      <div*!/*/}
        {/*          /!*        className="authmodal-content__form__input__roles__role"*!/*/}
        {/*          /!*        onChange={changePost}*!/*/}
        {/*          /!*      >*!/*/}
        {/*          /!*        <input type="radio" id={role.id} name="role" value={role.id} />*!/*/}
        {/*          /!*        <label htmlFor={role.id}>*!/*/}
        {/*          /!*          <div className="authmodal-content__form__input__roles__role__item">*!/*/}
        {/*          /!*            <p>{role.name}</p>*!/*/}
        {/*          /!*          </div>*!/*/}
        {/*          /!*        </label>*!/*/}
        {/*          /!*      </div>*!/*/}
        {/*          /!*    ))*!/*/}
        {/*          /!*  : ''}*!/*/}
        {/*        </div>*/}
        {/*        <div className="authmodal-content__form__input__login">*/}
        {/*          <div className="authmodal-content__form__input__login__content">*/}
        {/*            <input required type="text" name="email" placeholder="antonanton@gmail.com" />*/}
        {/*            <label htmlFor="email">Электронная почта</label>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="authmodal-content__form__input__password">*/}
        {/*          <div className="authmodal-content__form__input__password__content">*/}
        {/*            <input type="password" required name="password" placeholder="********" />*/}
        {/*            <label htmlFor="login">Пароль</label>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <div className="authmodal-content__form__input__submit">*/}
        {/*          <button value="Войти" type="submit">*/}
        {/*            {regMode ? 'Зарегистрироваться' : 'Войти '}*/}
        {/*          </button>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </form>*/}
        {/*    <div className="authmodal-content__change">*/}
        {/*      <button>{regMode ? 'Войти в существующий профиль' : 'Зарегистрироваться'}</button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
      </div>
    </div>
  )
}

export default AuthModal
