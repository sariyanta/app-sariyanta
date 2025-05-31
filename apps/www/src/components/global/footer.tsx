import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="border-t py-6">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Sariyanta. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
