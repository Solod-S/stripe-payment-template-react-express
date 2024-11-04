import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logo.png";
const Header = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const menuWrapper = document.querySelector(".navigation__menu-wrapper");

    if (openMobileMenu) {
      menuWrapper?.classList.add("--is-open");
      document.body.style.overflow = "hidden"; // Запрещаем прокрутку
    } else {
      menuWrapper?.classList.remove("--is-open");
      document.body.style.overflow = ""; // Восстанавливаем прокрутку
    }

    // Чистим эффект при размонтировании компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobileMenu]);

  // --is-open
  return (
    <header>
      <div className="navigation container">
        <div className="navigation__menu-wrapper " data-menu>
          <nav className="navigation__menu">
            <ul className="navigation__list">
              <Link style={{ marginRight: "50px" }} to="/">
                <img src={logo} alt="logo" style={{ width: "100px" }} />
              </Link>

              <li className="navigation__item navigation__item--current-page-status">
                <Link
                  className={
                    pathname === "/"
                      ? "navigation__link  navigation__link--slider navigation__link--current-page-status"
                      : "navigation__link  navigation__link--slider "
                  }
                  to="/"
                >
                  One-time purchase
                </Link>
              </li>
              <li className="navigation__item">
                <Link
                  className={
                    pathname === "/subscription"
                      ? "navigation__link  navigation__link--slider navigation__link--current-page-status"
                      : "navigation__link  navigation__link--slider "
                  }
                  to="/subscription"
                >
                  Subscription
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
