import { Container } from '@/components/Container';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <div className="py-6">
        <h2>This is the about page</h2>
      </div>
    </Container>
  );
}
