import { getDb1, getPublished } from '@/lib/notion-api/helpers'
import { getPageSlug } from '@/lib/notion-api/utils'
import { createProjectFromPost } from '@/lib/notion-api/example'

const TestSingleItem = ({ project }) => {
  return (
    <div>
      <pre>
        {JSON.stringify(project, null, 2)}
      </pre>
    </div>
  )
}

export const getStaticPaths = async () => {
  const db = await getDb1()
  const paths = await getPublished(db)
    .map(post => ({
      params: {
        slug: getPageSlug(post),
      },
    }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  let post = null
  let slug = null
  try {
    slug = context.params.slug
    const db = await getDb1()
    post = await getPublished(db)
      .find(post => getPageSlug(post) === slug)
  } catch (err) {
    console.log(err)
  }
  if (!post) {
    return {
      notFound: true,
    }
  }
  const project = createProjectFromPost(post)
  return {
    props: {
      slug,
      project,
    },
  }
}

export default TestSingleItem
