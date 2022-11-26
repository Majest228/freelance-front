import React from 'react'
import { useForm } from 'react-hook-form'
import './LoginForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, selectIsAuth } from '../../../../redux/slices/auth.js'

const LoginForm = ({ setModeReg }) => {
  const isAuth = useSelector(selectIsAuth)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })
  const dispatch = useDispatch()

  const onSumbit = async (values) => {
    const data = await dispatch(fetchLogin(values))
    if ('accessToken' in data.payload) {
      window.localStorage.setItem('accessToken', data.payload.accessToken)
    } else {
      alert('Авторизация для лохов')
    }
  }
  console.log(isAuth)
  return (
    <div className="login">
      <div className="login-content__title">
        <p>Авторизация</p>
      </div>
      <div className="login-content__form">
        <form onSubmit={handleSubmit(onSumbit)}>
          <div className="login-content__form__input">
            <div className="login-content__form__input__login">
              <div className="login-content__form__input__login__content">
                <input
                  name="email"
                  {...register('email', { required: 'Укажите почту' })}
                  type="text"
                />
                <label htmlFor="email">Электронная почта</label>
              </div>
            </div>
            <div className="login-content__form__input__password">
              <div className="login-content__form__input__password__content">
                <input
                  type="password"
                  name="password"
                  {...register('password', { required: 'Укажите почту' })}
                />
                <label htmlFor="login">Пароль</label>
              </div>
            </div>
            <div className="login-content__form__input__submit">
              <button value="Войти" type="submit">
                Войти
              </button>
            </div>
          </div>
        </form>
        <div className="login-content__change">
          <button onClick={() => setModeReg(true)}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
