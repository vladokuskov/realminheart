import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const ref = useRef<any>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const [sticky, setSticky] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 132 ? "sticky" : "";
    setSticky(stickyClass);
  };

  return (
    <nav ref={ref} className={`navbar-wrapper ${sticky}`}>
      <div className={`navbar-content-wrapper ${sticky}`}>
        <NavLink
          to="/"
          title="Go to Home page"
          aria-label="Go to Home page"
          className="navbar-logo--link"
          onClick={() => window.scrollTo(0, 0)}
        >
          <h1 className="navbar-logo">REALMINHEART</h1>
        </NavLink>
        <div className="navbar-menu-wrapper">
          <a
            className="navbar-menu-btn"
            tabIndex={0}
            title="Open Menu"
            onClick={() => {
              setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
            }}
          >
            <div className="burger-menu-wrapper">
              <div
                className={
                  isMenuOpen ? `burger-menu-bar open` : "burger-menu-bar"
                }
              ></div>
              <div
                className={
                  isMenuOpen ? `burger-menu-bar open` : "burger-menu-bar"
                }
              ></div>
              <div
                className={
                  isMenuOpen ? `burger-menu-bar open` : "burger-menu-bar"
                }
              ></div>
            </div>
          </a>
          {isMenuOpen ? (
            <div className={`navbar-menu--content ${sticky}`}>
              <div className="navbar-menu--links" tabIndex={0}>
                <NavLink
                  to="/"
                  onClick={handleMenuClick}
                  className="menu--link"
                  title="Go to Home"
                  aria-label="Go to Home"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/Posts"
                  onClick={handleMenuClick}
                  className="menu--link"
                  title="Go to Posts"
                  aria-label="Go to Posts"
                >
                  Posts
                </NavLink>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-links-wrapper">
          <NavLink
            to="/"
            title="Go to Home"
            aria-label="Go to Home"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link "
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Posts"
            title="Go to Posts"
            aria-label="Go to Posts"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link "
            }
          >
            Posts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
