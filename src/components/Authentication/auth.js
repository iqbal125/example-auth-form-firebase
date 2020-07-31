import React, { useState, useContext, useEffect } from "react"
import styles from "./auth.module.css"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { navigate } from "gatsby"
import AuthContext from "../../utils/auth_context"
import jwt_decode from "jwt-decode"
import axios from "axios"

const Auth = () => {
  const [isLoading, setLoading] = useState(false)
  const context = useContext(AuthContext)

  useEffect(() => {
    context.firebase.auth().signOut()
    setTimeout(() => context.LogOut(), 200)
  }, [])

  const uiConfig = {
    credentialHelper: "none",
    signInFlow: "popup",
    signInOptions: [
      context.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      context.firebase.auth.GithubAuthProvider.PROVIDER_ID,
      context.firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      context.firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        saveProfile(authResult)
        return false
      },
      signInFailure: function (error) {
        console.log(error)
      },
    },
  }

  const saveProfile = authResult => {
    setLoading(true)

    context.firebase
      .auth()
      .currentUser.getIdToken()
      .then(token => sendtokenToServer(token))

    const sendtokenToServer = token => {
      axios
        .post(`${process.env.GATSBY_SERVER_URL}/auth/sendtoken`, { token })
        .then(res => sendProfiletoContext(res.data))
        .catch(err => console.log(err))
    }

    const sendProfiletoContext = data => {
      let email = authResult.user.email
      let username = authResult.user.displayName
      let id = jwt_decode(data.token)
      let photo = authResult.user.photoURL

      let user = {
        email,
        username,
        id,
        photo,
      }

      context.saveUser(user)
      setTimeout(() => navigate("/formsubmit"), 400)
    }
  }

  return (
    <div className={styles.form_container}>
      {isLoading && (
        <>
          <div className={styles.loader}></div>
          <div className={styles.loading_background}></div>
        </>
      )}
      <h1>This is a Sample Form to Demonstrate Server Side Project</h1>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={context.firebase.auth()}
      />
    </div>
  )
}

export default Auth
