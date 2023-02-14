export const fetchAllTerms = () => ({
  method: "GET",
  url: "/admin/term",
});

export const fetchSingleTerm = (type) => ({
  method: "GET",
  url: `/admin/term/${type}`,
});

export const updateTerm = (data) => ({
  method: "PUT",
  url: "/admin/term",
  data,
});
