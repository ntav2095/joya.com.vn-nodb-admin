export const formIsValid = async (formik_validateForm) => {
  const errors = await formik_validateForm();
  return !Object.keys(errors).length;
};
