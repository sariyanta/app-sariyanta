import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { BlogPost } from '@hubspot/api-client/lib/codegen/cms/blogs/blog_posts/models/BlogPost';
import { Container } from '@/components/Container';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
});

async function fetchPosts() {
  try {
    const response = await axios.get<Array<BlogPost>>('/api/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

function RouteComponent() {
  const { data, isLoading, error } = useQuery<Array<BlogPost>>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
    staleTime: 60,
    retry: 1,
  });

  if (isLoading)
    return (
      <Container>
        <div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div className="text-red-500">
          Error fetching posts: {error.message}
        </div>
      </Container>
    );
  if (!data?.length)
    return (
      <Container>
        <div className="text-gray-500">No posts found.</div>
      </Container>
    );
  return (
    <Container>
      {data.map((post) => (
        <div key={post.id}>
          <h2 className="text-lg">{post.htmlTitle}</h2>
        </div>
      ))}
    </Container>
  );
}
