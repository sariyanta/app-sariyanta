import { Link } from '@tanstack/react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const menu = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
];

export function Navigation() {
  return (
    <div className="flex w-full border-y border-gray-100">
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          {menu.map((item) => (
            <NavigationMenuItem key={item.to}>
              <NavigationMenuLink
                asChild
                className="bg-background text-foreground hover:bg-background inline-block px-0 py-2 text-base"
              >
                <Link to={item.to}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
