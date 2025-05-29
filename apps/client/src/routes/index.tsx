import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/Container';

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'NestJS + React on Google App Engine',
      },
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
    <Container className="prose py-4">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="w-full md:w-7/12">
          <h2 className="mt-0">Welcome to this website</h2>
          <p>
            This is a simple application demonstrating Made Koder's full-stack
            development skills using NestJS for the backend and React for the
            frontend. The application is deployed on Google App Engine,
            showcasing the integration of modern web technologies.
          </p>
          <p>
            The design is inspired by the Twenty Twelve WordPress theme, known
            for its clean and elegant layout.
          </p>
        </div>
        <div className="w-full md:w-5/12">
          <img
            src="https://wpdotorg.wordpress.com/wp-content/uploads/2008/11/boat.jpg"
            alt="Boat"
            className="h-auto w-full"
          />
        </div>
      </div>
    </Container>
  );
}
