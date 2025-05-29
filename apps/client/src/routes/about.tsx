import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/Container';

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
