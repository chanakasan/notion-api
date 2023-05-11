import slugify from 'slugify'

export const getPageProperties = (page) => {
  const properties = {}
  for (const property in page.properties) {
    const key = slugify(property, { replacement: '_', lower: true })
    const obj = page.properties[property]
    const value = obj[obj.type]
    properties[key] = Array.isArray(value) ? value[0] : value
  }
  return properties
}

export const getPageSlug = (page) => {
  let slug = "none"
  try {
    slug = slugify(page.properties.Name.title[0].plain_text).toLowerCase()
  } catch (err) {
    const path = page.url.split('/').pop()
    slug = path.substring(path.length, -33)
  }
  return slug
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