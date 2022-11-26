import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, fetchWorkers } from '../../../redux/slices/users.js'
import { fetchRoles } from '../../../redux/slices/roles.js'
import Profile from '../../../components/Profile/Profile.jsx'
import './UsersPage.scss'

const UsersPage = () => {
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
  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-content">
          {statusRoles === 'loading' ? (
            <p>Идет загрузка...</p>
          ) : (
            roles.map((role) => (
              <div className="admin-content__role">
                <input
                  type="radio"
                  id={role.id}
                  name="role"
                  value={role.name}
                  onChange={(e) => setRole(e.target.value)}
                />
                <label htmlFor={role.id}>
                  <div className="admin-content__role__item">
                    <p>{role.name}</p>
                  </div>
                </label>
              </div>
            ))
          )}
        </div>
        {role === 'Заказчик' ? (
          statusWorkers === 'loading' ? (
            <p>Идет загрузка...</p>
          ) : (
            workers.map((user) => <Profile item={user} />)
          )
        ) : (
          users.map((user) => <Profile item={user} />)
        )}
      </div>
    </div>
  )
}

export default UsersPage
