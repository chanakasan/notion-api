import slugify from 'slugify'
import { Client } from '@notionhq/client'
import Config from './config.js'

const notionClient = new Client({
  auth: Config.get('notion_token')
})

export const getDatabaseById = async (databaseId) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  })
  return response.results
}

export const getPageById = async (pageId) => {
  const response = await notionClient.pages.retrieve({ page_id: pageId })
  return response
}

export const getPageBySlug = async (database, pageSlug) => {
  return database.find((page) => page.slug === pageSlug)
}

const getBlocksById = async (blockId) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor } =
      await notionClient.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      })
    blocks.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}

export const getBlocksWithChildren = async (pageId) => {
  const blocks = await getBlocks(pageId)
  // Retrieve block children for nested blocks (one level deep),
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find((x) => x.id === block.id)?.children
    }
    return block
  })
  return blocksWithChildren
}