import { NAVIGATION_LINKS } from "../consts/navigation.consts";
import NavigationLink from "./NavigationLink";
import NavigationAllLinksLink from "./NavigationAllLinksLink";

function NavigationLinks() {
  const navigationLinks = NAVIGATION_LINKS;

  return (
    <menu className="flex justify-center gap-4 font-semibold text-gray-700 sm:gap-5 sm:text-lg lg:gap-10 lg:text-xl">
      {navigationLinks.map((link) => (
        <NavigationLink linkItem={link} key={link.href} />
      ))}
      <NavigationAllLinksLink />
    </menu>
  );
}

export default NavigationLinks;
