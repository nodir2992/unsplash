//  RRD
import { Link } from "react-router-dom";

const links = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/about",
    text: "About",
  },
  {
    path: "/contact",
    text: "Contact",
  },
];

function NavbarLinks() {
  return links.map((link) => {
    return (
      <li key={link.path}>
        <Link to={link.path}>{link.text}</Link>
      </li>
    );
  });
}

export default NavbarLinks;
