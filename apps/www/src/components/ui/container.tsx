import { cn } from '@/lib/utils';

export const Container = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('mx-auto max-w-5xl px-6', className)}>{children}</div>
  );
};
