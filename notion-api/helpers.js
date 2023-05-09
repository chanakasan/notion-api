import Config from './config.js'
import { getDatabaseById } from './index.js'

export const getPublished = (database) => {
  return database.filter((post) => {
    const isPublished = post.properties['Published'].checkbox
    return isPublished
  })
}

export const getDb1 = () => {
  const dbId = Config.get('notion_db1_id')
  return getDatabaseById(dbId)
}
