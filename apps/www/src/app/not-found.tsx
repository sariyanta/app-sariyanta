import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-lg">
          The page you are looking for does not exist.
        </p>
        <Link href="/">Go to Home</Link>
      </div>
    </div>
  );
}
