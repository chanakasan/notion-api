import {
  getPageProperties,
  getPageSlug,
  getCoverImageUrl,
  truncateText,
} from "@/lib/notion-api/utils";

export const createProjectFromPost = (post) => {
  const properties = getPageProperties(post);
  const slug = getPageSlug(post);
  const project = {};
  project.title = properties.title.plain_text;
  project.url = properties.website.url || "#";
  //project.imgSrc = getCoverImageUrl(properties);
  project.description = properties.description.plain_text;
  project.descriptionShort = truncateText(project.description, 100);
  project.slug = slug;
  project.href = `/projects/${slug}`;
  return project;
};
