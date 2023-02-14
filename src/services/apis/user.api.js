export const login = (username, password) => ({
  url: "/user/login",
  method: "POST",
  data: { username, password },
});

export const changeRole = ({ username, role }) => ({
  url: "/user/change-role",
  method: "PUT",
  data: { username, role },
});

export const deleteUser = (username) => ({
  url: "/user",
  method: "DELETE",
  data: { username },
});

export const fetchUsers = () => ({
  url: "/user",
  method: "GET",
});

export const fetchSingleUser = (username) => ({
  url: `/user/${username}`,
  method: "GET",
});

export const createUser = ({ username, password, re_password, role }) => ({
  url: "/user/register",
  method: "POST",
  data: {
    username,
    password,
    re_password,
    role,
  },
});

export const changePassword = ({
  username,
  password,
  new_password,
  re_new_password,
}) => ({
  url: `/user/change-password`,
  method: "POST",
  data: {
    username,
    password,
    new_password,
    re_new_password,
  },
});
