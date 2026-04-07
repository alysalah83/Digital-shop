import { NAVIGATION_LINKS } from "../consts/navigation.consts";
import NavigationLink from "./NavigationLink";
import NavigationAllLinksLink from "./NavigationAllLinksLink";

function NavigationLinks() {
  const navigationLinks = NAVIGATION_LINKS;

  return (
    <menu className="flex items-center gap-5 font-semibold text-gray-700 lg:gap-8 xl:gap-10 lg:text-[15px] xl:text-base">
      {navigationLinks.map((link) => (
        <NavigationLink linkItem={link} key={link.href} />
      ))}
      <NavigationAllLinksLink />
    </menu>
  );
}

export default NavigationLinks;
