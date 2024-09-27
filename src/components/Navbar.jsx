//  RRD
import { Link, useLocation } from "react-router-dom";
//  UTILS
import { joinClassNames } from "../utils/classnames";
//  CUSTOM HOOKS
import { useGlobalContext } from "../hooks/useGlobalContext";
//  REACT ICONS
import { FaHeart } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const { selectedColor, likedImages } = useGlobalContext();

  const items = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <header>
      <nav
        className={joinClassNames("border-b border-b-gray-200", selectedColor)}
      >
        <div className="container mx-auto ">
          <div className="flex items-center justify-between">
            <Link to={"/"} className="text-white">
              LOGO
            </Link>
            <ul className="flex items-center text-base space-x-5 text-white">
              {items.map(({ name, link }) => {
                return (
                  <li key={link}>
                    <Link
                      className={joinClassNames(
                        "block py-3 border-b-2 border-transparent hover:border-white transition-all duration-200",
                        link == location.pathname ? "border-white" : ""
                      )}
                      to={link}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}

              <li>
                <Link
                  to={"/liked-images"}
                  className={joinClassNames(
                    "relative hover:text-red-600 transition-all duration-200",
                    location.pathname == "/liked-images"
                      ? "text-red-600"
                      : "text-red-500"
                  )}
                >
                  <FaHeart className="text-3xl" />
                  <span className="absolute h-full w-full text-center top-0 text-xs font-thin pt-1 text-white">
                    {likedImages.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
