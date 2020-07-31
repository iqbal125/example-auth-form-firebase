import React, { useReducer, useEffect } from "react"
import AuthContext from "../../utils/auth_context"

import {
  authReducer,
  initialStateAuth,
} from "../../store/reducers/auth_reducer"

import { saveUserAction, Logout } from "../../store/actions/actions"
import firebase from "firebase/app"
import "firebase/auth"

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
}

firebase.initializeApp(config)

const ContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, initialStateAuth)

  const silentAuth = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    let expiresAt = JSON.parse(localStorage.getItem("expiresIn"))

    if (user && new Date().getTime() < expiresAt) {
      dispatchAuth(saveUserAction(user))
    } else if (!user && new Date().getTime() < expiresAt) {
      dispatchAuth(LogOut)
    }
  }

  useEffect(() => {
    silentAuth()
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }
  }, []) // eslint-disable-line

  //logs in user and saves to global store
  const saveUser = user => {
    dispatchAuth(saveUserAction(user))
  }

  const LogOut = () => {
    dispatchAuth(Logout)
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          authState,
          saveUser,
          LogOut,
          firebase,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default ContextProvider
