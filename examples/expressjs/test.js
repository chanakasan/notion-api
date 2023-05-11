import express from 'express'
import { getDb1, getPublished } from "../lib/notion-api/helpers.js";
import { getPageSlug } from "../lib/notion-api/utils.js";
import { createProjectFromPost } from "../lib/notion-api/example.js";

let projects = []
let project1 = null
get_all()
get_one()

const app = express();
app.get('/', (req, res) => {
  res.json(projects)
});

app.get('/one', (req, res) => {
  res.json(project1)
});

app.listen(3000, () => {
  console.log('server started');
});

async function get_all() {
  const db = await getDb1();
  const posts = await getPublished(db);
  projects = posts.map(createProjectFromPost);
}

async function get_one() {
  let post = null;
  let slug = null;
  try {
    slug = 'oria-2fa'
    const db = await getDb1();
    post = await getPublished(db)
      .find((post) => getPageSlug(post) === slug);
  } catch (err) {
    console.log(err);
  }
  if (!post) {
    return
  }
  project1 = createProjectFromPost(post);
}