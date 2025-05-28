import { Link } from '@tanstack/react-router';

export function Navigation() {
  return (
    <nav role="menubar" className="border-y border-gray-100">
      <ul role="menu">
        <li role="menuitem">
          <Link to="/" className="inline-block py-2">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
