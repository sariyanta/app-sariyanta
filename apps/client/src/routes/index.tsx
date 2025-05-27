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
    <section className="transform-all flex h-screen flex-col transition-all lg:pt-8">
      <div className="mx-auto w-full max-w-5xl px-6">
        <header className="py-6">
          <h1 className="text-2xl font-bold">Twenty Twelve</h1>
          <p className="text-sm">
            The 2012 theme for Wordpress is fully responsive theme that looks
            great on any device.
          </p>
        </header>
      </div>
    </section>
  );
}
