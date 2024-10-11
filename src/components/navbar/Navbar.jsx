//  RRD
import { Link } from "react-router-dom";
//  REACT ICONS
import { FcGallery } from "react-icons/fc";
import { FaDownload, FaHeart } from "react-icons/fa";
//  COMPONENTS
import NavbarLinks from "./NavbarLinks";
import ThemeSwitcher from "./ThemeSwitcher";
//  CONTEXT
import { useGlobalContext } from "../../hooks/useGlobalContext";
// FIREBASE
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
//  TOAST
import { toast } from "react-toastify";

function Navbar() {
  const { likedImages, downloadedImages, user } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.warn("Signout...");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        <div className="navbar-end flex items-center gap-4">
          <div className="indicator">
            <span className="badge indicator-item badge-info badge-sm">
              {downloadedImages.length}
            </span>
            <Link to="/downloaded-images">
              <FaDownload size={24} />
            </Link>
          </div>

          <div className="indicator">
            <span className="badge indicator-item badge-info badge-sm">
              {likedImages.length}
            </span>
            <Link to="/liked-images">
              <FaHeart size={24} />
            </Link>
          </div>

          <ThemeSwitcher />

          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div className="w-10 rounded-full">
                  <img alt={user.displayName + " avatar"} src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li className="mb-1 rounded-lg bg-base-200 py-1 text-center text-lg font-semibold text-slate-500">
                  {user.displayName}
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
