import axios from 'axios'
import history from '../history'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const GET_USER_PROFILE = 'GET_USER_PROFILE'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

/**
 * INITIAL STATE
 */
const defaultUser = {}
 
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addUser = newUser => ({type: ADD_USER, newUser})
const getUserProfile = user => ({type: GET_USER_PROFILE, user})

const editUserInfo = body => {
  return {
    type: UPDATE_USER_INFO,
    body
  }
}
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, formName) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${formName}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const getUserProfileThunk = () => async dispatch => {
  try {
    let res = await axios.get(`/api/users/profile`)
    return dispatch(getUserProfile(res.data))
  } catch (error) {
    console.log('ERROR', error)
  }
}

export const editUserInfoThunk = body => {
  return async (dispatch) => {
    try {
      let res = await axios.put('/api/users/profile', body)
      return dispatch(editUserInfo(res.data))
    } catch (error) {
      console.log('ERROR', error)
    }
  }
}

export const signup = (
  email,
  password,
  formName,
  firstName,
  lastName,
  street,
  city,
  state,
  zip,
  country
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, {
      email,
      password,
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      country
    })
  } catch (signupError) {
    return dispatch(addUser({error: signupError}))
  }

  try {
    dispatch(addUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_USER:
      return action.newUser
    case GET_USER_PROFILE:
      return action.user
    case UPDATE_USER_INFO:
      return action.body
    default:
      return state
  }
}
