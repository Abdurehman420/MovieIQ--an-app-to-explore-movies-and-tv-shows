import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavBar = () => {
    if (window.scrollY > 250) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);

    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  return (
    <header
      className={`header fixed  duration-200 flex items-center translate-y-0 w-full h-16 z-10 ${show} ${
        mobileMenu ? "mobileView" : ""
      }`}
    >
      <ContentWrapper>
        <nav className=" px-4  py-2 flex justify-between items-center">
          <div className="logo">
            <h1>
              {" "}
              <NavLink to="/" className={"no-underline text-white"}>
                {" "}
                MOVIEIQ
              </NavLink>
            </h1>
          </div>
          <div className="navItems flex items-center space-x-5">
            <ul className=" text-lg   no-underline items-center list-none space-x-5 font-normal hidden  sm:flex ">
              <li className="hover:bg-white/35 md:hover:bg-transparent duration-150 cursor-pointer">
                <NavLink
                  to="/explore/movie"
                  className={({ isActive }) =>
                    isActive
                      ? "text-lightBlue no-underline   "
                      : "" + " no-underline  text-white"
                  }
                  onClick={() => setMobileMenu(false)}
                >
                  Movies
                </NavLink>
              </li>
              <li className="hover:bg-white/35 md:hover:bg-transparent duration-150 cursor-pointer">
                <NavLink
                  to="/explore/tv"
                  className={({ isActive }) =>
                    isActive
                      ? "text-lightBlue  no-underline  "
                      : "" + " no-underline  text-white"
                  }
                  onClick={() => setMobileMenu(false)}
                >
                  TV Shows
                </NavLink>
              </li>
              <li className="hover:bg-white/35 md:hover:bg-transparent duration-150 cursor-pointer">
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive
                      ? "text-lightBlue  no-underline  "
                      : "" + " no-underline  text-white"
                  }
                  onClick={() => setMobileMenu(false)}
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
            <div className="mobileMenuIcons flex space-x-4">
              <GoSearch
                size={20}
                className=" flex justify-center cursor-pointer"
                onClick={openSearch}
              />

              {mobileMenu ? (
                <IoMdClose
                  size={22}
                  className=" flex justify-center cursor-pointer "
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <RxHamburgerMenu
                  size={20}
                  className=" sm:hidden flex justify-center cursor-pointer"
                  onClick={openMobileMenu}
                />
              )}
            </div>
          </div>
        </nav>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput  ">
              <input
                type="text"
                placeholder="Search for a movie"
                className=" text-black"
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <IoMdClose
                size={22}
                color="gray"
                className=" flex  justify-end cursor-pointer"
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
