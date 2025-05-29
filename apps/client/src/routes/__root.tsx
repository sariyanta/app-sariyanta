import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import TanStackQueryLayout from '../integrations/tanstack-query/layout';
import type { ReactNode } from 'react';
import type { QueryClient } from '@tanstack/react-query';

import { Header } from '@/components/Header';

export interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="transform-all flex h-screen flex-col transition-all lg:pt-8">
        <HeadContent />
        <Header />
        <main>
          {children}
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
