import Desktopnav from "./Navbar/Desktopnav";
import Mobilenav from "./Navbar/Mobilenav";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  return (
    <div className="sticky top-0 z-20 shadow shadow-foreground/20">
      <Navbar DesktopNavBar={<Desktopnav />} MobileNavBar={<Mobilenav />} />
    </div>
  );
}
