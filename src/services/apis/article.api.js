export const fetchArticles = (params = {}) => ({
  url: `/admin/article`,
  method: "GET",
  params,
});

export const fetchSingleArticle = (slug) => ({
  method: "GET",
  url: `/admin/article/${slug}`,
});

export const addNewArticle = (formData) => ({
  method: "POST",
  url: "/admin/article",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const updateArticle = (formData) => ({
  method: "PUT",
  url: "/admin/article",
  data: formData,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const deleteArticle = (slug) => ({
  method: "DELETE",
  url: "/admin/article",
  data: { slug },
});

// guides category
export const fetchGuidesCategory = () => ({
  method: "GET",
  url: "/admin/article/category",
});

export const addGuidesCategoryItem = (data) => ({
  method: "POST",
  url: "/admin/article/category",
  data,
});

export const updateGuidesCategoryItem = (data) => ({
  method: "PUT",
  url: "/admin/article/category",
  data,
});

export const deleteGuidesCategoryItem = (id) => ({
  method: "DELETE",
  url: "/admin/article/category",
  data: { id },
});
