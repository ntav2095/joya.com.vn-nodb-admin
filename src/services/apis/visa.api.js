export const fetchVisas = (params) => ({
  method: "GET",
  url: "/admin/visa",
  params,
});

export const fetchVisasAvailableCountries = (params) => ({
  method: "GET",
  url: "/admin/visa/available-countries",
  params,
});

export const fetchSingleVisaProduct = (visaId) => ({
  method: "PUT",
  url: `/admin/visa/${visaId}`,
});

export const addNewVisaProduct = (data) => ({
  method: "POST",
  url: "/visa",
  data,
});

export const updateVisaProduct = (data) => ({
  method: "PUT",
  url: "/admin/visa",
  data,
});

export const deleteVisaProduct = (id) => ({
  method: "GET",
  url: "/admin/visa",
  data: { id },
});
