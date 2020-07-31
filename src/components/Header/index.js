import React, { useState } from "react"
import styles from "./header.module.css"
import { Link } from "gatsby"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"

const Header = ({ props }) => {
  const [navLinks, toggleNavLinks] = useState(false)

  const navLinksHandler = () =>
    navLinks ? toggleNavLinks(false) : toggleNavLinks(true)

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left_header}>
          {/* Desktop */}
          <div className={styles.desktop_logo}>
            <Link to="/">Logo</Link>
          </div>
          {/* Mobile */}
          <div className={styles.menu_icon}>
            {!navLinks ? (
              <div onClick={navLinksHandler} className={styles.hamburger}>
                <GiHamburgerMenu />
              </div>
            ) : (
              <div onClick={navLinksHandler} className={styles.close_button}>
                <AiOutlineClose />
              </div>
            )}
          </div>
        </div>

        <div className={styles.mid_header}>
          {/* Desktop */}
          <div className={styles.desktop_links}>
            <Link
              to="/about"
              className={styles.header_link}
              activeClassName={styles.header_link_active}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={styles.header_link}
              activeClassName={styles.header_link_active}
            >
              Contact
            </Link>
            <Link
              to="/services"
              className={styles.header_link}
              activeClassName={styles.header_link_active}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className={styles.header_link}
              activeClassName={styles.header_link_active}
            >
              Blog
            </Link>
          </div>
          {/* Mobile */}
          <div className={styles.mobile_logo}>
            <Link to="/">Logo</Link>
          </div>
        </div>

        <div className={styles.right_header}>
          {/* Desktop */}
          Right Header
        </div>
        {/* Mobile */}
        <div className={styles.mobile_search}></div>
      </header>
      {/* Mobile Hamburger Links*/}
      {navLinks && (
        <>
          <div className={styles.dropdown_home}>
            <Link
              to="/about"
              className={styles.header_links_mobile}
              activeClassName={styles.header_link_active}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={styles.header_links_mobile}
              activeClassName={styles.header_link_active}
            >
              Contact
            </Link>
            <Link
              to="/services"
              className={styles.header_links_mobile}
              activeClassName={styles.header_link_active}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className={styles.header_links_mobile}
              activeClassName={styles.header_link_active}
            >
              Blog
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default Header
