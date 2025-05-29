import { Container } from '@/components/Container';
import { Navigation } from '@/components/Navigation';

export function Header() {
  return (
    <Container className="px-6">
      <header className="py-6">
        <div className="mb-3 text-3xl font-bold">Made Koder</div>
        <div className="max-w-2xl">
          Learning full-stack development and cloud deployment with NestJS and
          React. Designed to look like the best WordPress theme of all time:
          Twenty Twelve.
        </div>
      </header>
      <Navigation />
    </Container>
  );
}
