const values = {
  notion_token: process.env.NOTION_TOKEN,
  notion_db1_id: process.env.NOTION_DB1_ID,
  notion_db2_id: process.env.NOTION_DB2_ID,
}

export default {
  get(key) {
    const value = values[key]
    if (!Object.keys(values).includes(key)) {
        throw new Error('Unknown key given for Config.get')
    }
    if (typeof value === 'undefined') {
        throw new Error(`Undefined value for key '${key}' Config.get`)
    }
    return value
  }
}