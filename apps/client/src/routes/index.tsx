import { Container } from '@/components/Container';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    title: 'NestJS + React on Google App Engine',
    meta: [
      {
        name: 'description',
        content:
          'A simple application demonstrating NestJS and React deployed on Google App Engine.',
      },
    ],
  }),
});

function App() {
  return (
    <Container>
      <div className="py-6">
        <h2>This is the index file</h2>
      </div>
    </Container>
  );
}
