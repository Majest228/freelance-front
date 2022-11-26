import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, fetchRegister, selectIsAuth } from '../../../../redux/slices/auth.js'
import { useForm } from 'react-hook-form'
import './RegisterForm.scss'
import { fetchRoles } from '../../../../redux/slices/roles.js'

const RegisterForm = ({ setModeReg }) => {
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
      alert('Регистрация для лохов для лохов')
    } else {
      window.localStorage.setItem('user', data.payload)
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
            <div className="register-content__form__input__roles">
              {isRolesLoading ? (
                <p>Идет загрузка...</p>
              ) : (
                roles.map((role) => (
                  <div className="register-content__form__input__roles__role">
                    <input
                      type="radio"
                      id={role.id}
                      name="role"
                      value={role.id}
                      {...register('roleId', { required: 'Укажите почту' })}
                    />
                    <label htmlFor={role.id}>
                      <div className="register-content__form__input__roles__role__item">
                        <p>{role.name}</p>
                      </div>
                    </label>
                  </div>
                ))
              )}
            </div>
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
                Войти
              </button>
            </div>
          </div>
        </form>
        <div className="register-content__change">
          <button onClick={() => setModeReg(false)}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
