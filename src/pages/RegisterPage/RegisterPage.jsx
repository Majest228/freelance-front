import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoles } from '../../redux/slices/roles.js'
import { fetchRegister } from '../../redux/slices/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import './RegisterPage.scss'
const RegisterPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      roleId: 0,
    },
    mode: 'onChange',
  })
  const { roles, statusRoles } = useSelector((state) => state.roles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRoles())
  }, [])

  const isRolesLoading = statusRoles === 'loading'

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      alert('Регистрация неудачная')
    } else {
      window.localStorage.setItem('user', data.payload)
      window.localStorage.setItem('accessToken', data.payload.accessToken)
      navigate('/')
      setModeReg(false)
    }
  }

  return (
    <div className="register">
      <div className="register-content__title">
        <p>Регистрация</p>
      </div>
      <div className="register-content__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register-content__form__input">
            <div className="register-content__form__input__login">
              <div className="register-content__form__input__login__content">
                <input
                  name="email"
                  {...register('email', { required: 'Укажите почту' })}
                  type="text"
                />
                <label htmlFor="email">Электронная почта</label>
              </div>
            </div>
            <div className="register-content__form__input__password">
              <div className="register-content__form__input__password__content">
                <input
                  type="password"
                  name="password"
                  {...register('password', { required: 'Укажите почту' })}
                />
                <label htmlFor="login">Пароль</label>
              </div>
            </div>
            <div className="register-content__form__input__submit">
              <button value="Войти" type="submit">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </form>
        <div className="register-content__change">
          <Link to="/login">Есть аккаунт?</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
