import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: 'NestJS + React on Google App Engine',
        description:
          'A simple application demonstrating NestJS and React deployed on Google App Engine.',
      },
    ],
  }),
});

function App() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold">
          NestJS + React deployed on Google App Engine
        </h1>
      </div>
    </section>
  );
}
