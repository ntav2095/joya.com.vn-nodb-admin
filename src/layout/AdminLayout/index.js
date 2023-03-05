// main
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeUser } from "../../store/user.slice";
import { useState, useRef } from "react";
import { toggleSidebar } from "../../store/layout.slice";

// assets
import {
  exit as exitSvg,
  chevronDoubleUp as upSVG,
  boxArrowRight,
  book,
} from "../../assets/svgs";

import {
  home as homeSVG,
  creditCard as creditCardSVG,
  plane as planeSVG,
  user as userSVG,
  phone as phoneSVG,
  earth as earthSVG,
  newspaper as newspaperSVG,
  book as bookSVG,
  building as buildingSVG,
} from "./layoutIcons";

// css
import styles from "./AdminLayout.module.css";

function AdminLayout({ children }) {
  // const [hide, setHide] = useState(false);

  const sidebarIsShow = useSelector((state) => state.layout.sidebar.isShow);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const contentRef = useRef();

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch(removeUser());
  };

  const navLinkClasses = ({ isActive }) =>
    isActive ? styles.active : undefined;

  let sidebarClasses = styles.sidebar;

  if (!sidebarIsShow) {
    sidebarClasses += " " + styles.hide;
  }
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={sidebarClasses}>
            <button className={styles.toggleBtn} onClick={toggleSidebarHandler}>
              {boxArrowRight}
            </button>

            {user && (
              <div className={styles.userInfo}>
                {userSVG}
                <p>{user.username}</p>
              </div>
            )}
            <ul className={styles.nav}>
              <li>
                <NavLink className={navLinkClasses} to="/" end>
                  {homeSVG} {sidebarIsShow && "Dashboard"}
                </NavLink>
              </li>

              <li>
                <NavLink className={navLinkClasses} to="/tours">
                  {planeSVG} {sidebarIsShow && "Tour"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/guides">
                  {newspaperSVG} {sidebarIsShow && "Guides"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/visas">
                  {creditCardSVG} {sidebarIsShow && "Visa"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/dieu-khoan">
                  {bookSVG} {sidebarIsShow && "Điều khoản"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/users">
                  {userSVG} {sidebarIsShow && "User"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/ve-cong-ty">
                  {buildingSVG} {sidebarIsShow && "Giới thiệu"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/diem-den">
                  {earthSVG} {sidebarIsShow && "Điểm đến"}
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/thong-tin-cong-ty">
                  {phoneSVG} {sidebarIsShow && "Liên hệ"}
                </NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink className={navLinkClasses} to="/login">
                    Login
                  </NavLink>
                </li>
              )}
            </ul>

            <div className={styles.logout} onClick={logoutHandler}>
              {exitSvg}
              {sidebarIsShow && <button>Log out</button>}
            </div>
          </div>

          <div ref={contentRef} className={styles.content} id="admin__content">
            {children}
          </div>
        </main>
      </div>

      <button
        className={styles.goToTopBtn + " bg-dark"}
        onClick={() => {
          if (contentRef.current) {
            contentRef.current.scroll({ top: 0, left: 0, behavior: "smooth" });
          }
        }}
      >
        {upSVG}
      </button>
    </>
  );
}

export default AdminLayout;
