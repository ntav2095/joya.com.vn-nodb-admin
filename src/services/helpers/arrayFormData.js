function appendArrayToFormData(formData, key, arr) {
  arr.forEach((item) => {
    formData.append(key, item);
  });
}

export default appendArrayToFormData;
