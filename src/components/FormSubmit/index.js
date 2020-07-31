import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "./formsubmit.module.css"
import AuthContext from "../../utils/auth_context"

const FormSubmitSection = () => {
  const context = useContext(AuthContext)

  const logOut = () => {
    navigate("/")
    context.firebase.auth().signOut()
    setTimeout(() => context.LogOut(), 200)
  }

  return (
    <div className={styles.container}>
      <h1>You are logged In: {context.authState.user.username} </h1>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default FormSubmitSection
