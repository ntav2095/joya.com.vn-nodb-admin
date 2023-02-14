export const fetchCompanyInfo = () => ({
  url: "/admin/company-info",
  method: "GET",
});

export const updateCompanyInfo = (data) => ({
  url: "/admin/company-info",
  method: "PUT",
  data: data,
});
