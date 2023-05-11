import { getDb1, getPublished } from '@/lib/notion-api/helpers'
import { createProjectFromPost } from '@/lib/notion-api/example'

const Test = ({ projects }) => {
  return (
    <div>
      <pre>
        {JSON.stringify(projects, null, 2)}
      </pre>
    </div>
  )
}

export const getStaticProps = async () => {
  const db = await getDb1()
  const posts = await getPublished(db)
  const projects = posts.map(createProjectFromPost)
  return {
    props: {
      projects,
    }
  }
}

export default Test
