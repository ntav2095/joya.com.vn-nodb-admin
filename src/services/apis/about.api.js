export const fetchAbout = () => ({
  url: "/admin/about",
  method: "GET",
});

export const updateAbout = (data) => ({
  url: "/admin/about",
  method: "PUT",
  data,
});
