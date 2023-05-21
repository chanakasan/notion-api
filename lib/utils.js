import slugify from 'slugify'

const normalize = (property) =>
  slugify(property, { replacement: '_', lower: true })

export const createDataMapper = (array) => {
  const dataMap = {}
  array.forEach((p) => {
    if (Array.isArray(p)) {
      if (p.length !== 2) {
        throw new Error("must be an array in format ['src prop', 'dest prop']")
      }
      const src = normalize(p[0])
      const dest = normalize(p[1])
      dataMap[src] = dest
    }
  })
  const mapper = (page) => {
    const result = {}
    const properties = getPageProperties(page)
    var test = 1
    for (const [src, dest] of Object.entries(dataMap)) {
      result[dest] = properties[src]
    }
    return result
  }
  return mapper
}

export const getPageProperties = (page) => {
  const properties = {}
  for (const property in page.properties) {
    const key = normalize(property)
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