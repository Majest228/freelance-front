import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from './redux/slices/auth.js'
import { useEffect } from 'react'
import UserPage from './pages/UserPage/UserPage.jsx'
import Layout from './components/Layout/Layout.jsx'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx'
import { fetchMe } from './redux/slices/users.js'
import UsersPage from './pages/AdminPage/UsersPage/UsersPage.jsx'
import LanguagePage from './pages/AdminPage/LanguagePage/LanguagePage.jsx'
import CountryPage from './pages/AdminPage/CountryPage/CountryPage.jsx'
import TagPage from './pages/AdminPage/TagPage/TagPage.jsx'
import Login from './pages/LoginPage/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'

const App = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  const { token } = useSelector((state) => state.auth)
  const { user, statusUser, roleId } = useSelector((state) => state.users)

  function privateRoute(Component) {
    if (!user.isAdmin) {
      return <PageNotFound />
    }
    return <Component />
  }

  useEffect(() => {
    console.log(isAuth)
  }, [isAuth])

  // if (token) {
  //   return (
  //     <Layout>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route path="/user/:id" element={<ProfilePage />} />
  //         <Route path="/login" element={<AuthPage />} />
  //         <Route path="/profile" element={<UserPage />} />
  //         <Route path="/admin-panel" element={privateRoute(AdminPage)} />
  //         <Route path="/admin-panel/users" element={privateRoute(UsersPage)} />
  //         <Route path="/admin-panel/languages" element={privateRoute(LanguagePage)} />
  //         <Route path="/admin-panel/countries" element={privateRoute(CountryPage)} />
  //         <Route path="/admin-panel/tags" element={privateRoute(TagPage)} />
  //       </Routes>
  //     </Layout>
  //   )
  // } else {
  //   return (
  //     <Layout>
  //       <HomePage />
  //     </Layout>
  //   )
  // }
  if (token) {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/admin-panel" element={privateRoute(AdminPage)} />
          <Route path="/admin-panel/users" element={privateRoute(UsersPage)} />
          <Route path="/admin-panel/languages" element={privateRoute(LanguagePage)} />
          <Route path="/admin-panel/countries" element={privateRoute(CountryPage)} />
          <Route path="/admin-panel/tags" element={privateRoute(TagPage)} />
        </Routes>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/:id" element={<ProfilePage />} />
        </Routes>
      </Layout>
    )
  }
}

export default App
