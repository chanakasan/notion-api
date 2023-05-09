import slugify from 'slugify'

export const getPageProperties = (page) => {
  const properties = {}
  for (const property in page.properties) {
    const key = slugify(property, { replacement: '_', lower: true })
    const obj = page.properties[property]
    properties[key] = obj[obj.type][0]
  }
  return properties
}

export const getPageSlug = (page) => {
  try {
    return slugify(page.properties.Name.title[0].plain_text).toLowerCase()
  } catch (err) {
    return page.url.split('/').pop()
  }
}

export const getCoverImageUrl = (properties, imageField) => {
  const files = properties[imageField].files
  let url = '/staic/images/default-cover.svg'
  if (files.length > 0) {
    url = files[0].file.url
  }
  return url
}

export const truncateText = (str, n) => {
  return str.length > n ? str.slice(0, n - 1) + '...' : str
}