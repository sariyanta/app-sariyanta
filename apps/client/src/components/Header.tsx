import { Container } from '@/components/Container';
import { Navigation } from '@/components/Navigation';

export function Header() {
  return (
    <Container className="px-6">
      <header className="py-6">
        <span className="text-3xl font-bold">Made Koder</span>
        <div>
          Learning full-stack development and cloud deployment with NestJS and
          React.
        </div>
      </header>
      <Navigation />
    </Container>
  );
}
