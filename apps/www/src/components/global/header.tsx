import Link from 'next/link';

import { NavigationMenuDemo } from '@/components/global/navigation';
import { Container } from '@/components/ui/container';

export const Header = () => {
  return (
    <header>
      <Container className="font-mono">
        <div className="py-6">
          <Link
            href="/"
            className="mb-3 inline-block text-2xl font-bold underline-offset-4 hover:underline"
          >
            Sariyanta
          </Link>
          <p className="w-full md:w-8/12">
            Building full-stack node application with NestJS and React.
          </p>
        </div>
        <div className="w-full border-y">
          <NavigationMenuDemo />
        </div>
      </Container>
    </header>
  );
};
