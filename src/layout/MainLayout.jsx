//  RRD
import { Outlet } from "react-router-dom";
//  COMPONENT
import Navbar from "../components/Navbar";
//  CUSTOM HOOKS
import { useGlobalContext } from "../hooks/useGlobalContext";
import ColorSwitcher from "../components/ColorSwitcher";

function MainLayout() {
  const context = useGlobalContext();
  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div id="mainLayout">
      <Navbar />
      <main className="container mx-auto">
        <ColorSwitcher />
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
