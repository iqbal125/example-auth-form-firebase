import React from "react"
import styles from "./footer.module.css"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_main}>
        <div className={styles.left_footer}>
          <div>Created by Mohammad Iqbal</div>
        </div>
        <div className={styles.right_footer}></div>
      </div>
      <div className={styles.footer_bottom}></div>
    </footer>
  )
}

export default Footer
