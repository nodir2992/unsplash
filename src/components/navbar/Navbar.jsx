//  RRD
import { Link } from "react-router-dom";
//  REACT ICONS
import { FcGallery } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
//  COMPONENTS
import NavbarLinks from "./NavbarLinks";
import ThemeSwitcher from "./ThemeSwitcher";
//  CONTEXT
import { useGlobalContext } from "../../hooks/useGlobalContext";

function Navbar() {
  const { likedImages } = useGlobalContext();

  return (
    <header className="bg-base-200">
      <div className="__align-elements navbar">
        <div className="navbar-start">
          <Link to="/" className="hidden md:flex">
            <FcGallery size={28} />
          </Link>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <FcGallery size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <NavbarLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal rounded-box">
            <NavbarLinks />
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-3">
          <ThemeSwitcher />
          <div className="indicator">
            <span className="badge indicator-item badge-info badge-sm">
              {likedImages.length}
            </span>
            <Link to="/liked-images">
              <FaHeart size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
