import { normalNavLinks, premiumNavLinks } from "@/constants/navlinks";
import { SignedIn } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NavLink } from "./NavLink";

export default function DesktopNavbar() {
  return (
    <nav className="flex">
      <Popover>
        <PopoverTrigger>
          <span className="px-4 py-2 text-sm transition hover:text-accentcolor">
            Herramientas
          </span>
        </PopoverTrigger>
        <PopoverContent className="hidden w-64 md:block">
          <ul>
            {normalNavLinks.map((link) => {
              if (link.route === "/") return;
              return (
                <li key={link.route}>
                  <NavLink navLink={link} />
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>

      <SignedIn>
        <ul className="flex">
          {premiumNavLinks.map((link) => {
            return (
              <li key={link.route} className="list-none">
                <NavLink navLink={link} />
              </li>
            );
          })}
        </ul>
      </SignedIn>
    </nav>
  );
}
