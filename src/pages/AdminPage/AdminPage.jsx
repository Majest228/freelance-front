import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, fetchWorkers } from '../../redux/slices/users.js'
import Profile from '../../components/Profile/Profile.jsx'
import './AdminPage.scss'
import { fetchRoles } from '../../redux/slices/roles.js'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  const [role, setRole] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWorkers())
    dispatch(fetchRoles())
    dispatch(fetchUsers())
  }, [])

  const { workers, statusWorkers } = useSelector((state) => state.users)
  const { roles, statusRoles } = useSelector((state) => state.roles)
  const { users, status } = useSelector((state) => state.users)

  useEffect(() => {
    console.log(role)
  }, [role])
  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-content__item">
            <Link to="/admin-panel/users">Пользователи</Link>
          </div>
          <div className="admin-content__item">
            <Link to="/admin-panel/languages">Язык</Link>
          </div>
          <div className="admin-content__item">
            <Link to="/admin-panel/countries">Страна</Link>
          </div>
          <div className="admin-content__item">
            <Link to="/admin-panel/tags">Тэги</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
