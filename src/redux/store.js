import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/users.js'
import { authReducer } from './slices/auth.js'
import { rolesReducer } from './slices/roles.js'
import { tagsReducer } from './slices/tags.js'
import { countriesReducer } from './slices/countries.js'
import { languagesReducer } from './slices/languages.js'
import { gendersReducer } from './slices/genders.js'

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    roles: rolesReducer,
    tags: tagsReducer,
    countries: countriesReducer,
    languages: languagesReducer,
    genders: gendersReducer,
  },
})

export default store
