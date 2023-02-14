export const fetchDestinations = () => ({
  url: "/admin/destination",
  method: "GET",
});

export const deleteDestinationItem = (id) => {
  console.log(id);
  return {
    url: "/admin/destination",
    method: "DELETE",
    data: { id },
  };
};

export const updateDestinationItem = (data) => ({
  method: "PUT",
  data,
  url: "/admin/destination",
});

export const addDestinationItem = (data) => ({
  method: "POST",
  data,
  url: "/admin/destination",
});
