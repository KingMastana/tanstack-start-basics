import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$postId')({
  component: Post,
  loader: ({params}) => {
    return params.postId
  }
})

function Post() {
  const postId = Route.useLoaderData();
  return <div>`Hello "/blog/${postId}"!`</div>
}
