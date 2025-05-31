import { Container } from '@/components/ui/container';

export default function Home() {
  return (
    <div>
      <Container className="py-6">
        <div className="w-full lg:w-9/12">
          <div className="prose max-w-none">
            <p>
              {`My name is Desar, and I am a nodejs developer based in the
              Netherlands. I'm currently learning full-stack development with
              Nestjs backend and React frontend. In addition, I'm also exploring
              devops and cloud technologies.`}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
