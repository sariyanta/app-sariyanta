import { cn } from '@/lib/utils';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-5xl px-6', className)}>
      {children}
    </div>
  );
};
