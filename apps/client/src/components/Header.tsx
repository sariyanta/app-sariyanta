import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="relative border-b bg-white p-2 text-black">
      <section className="mx-auto flex w-full max-w-6xl justify-between gap-2">
        <nav className="flex flex-row">
          <div className="px-2 font-bold">
            <Link to="/">Home</Link>
          </div>
        </nav>
      </section>
    </header>
  );
}
