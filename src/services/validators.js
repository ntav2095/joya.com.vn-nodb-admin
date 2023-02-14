import { stringToDate } from "./helpers/dateHandler";

const REQUIRED = "Bắt buộc";

export const tourValidator = (values) => {
  const errors = {};

  if (!values.code) {
    errors.code = REQUIRED;
  }

  if (!values.name) {
    errors.name = REQUIRED;
  }

  if (!values.journey) {
    errors.journey = REQUIRED;
  }

  if (!values.description) {
    errors.description = REQUIRED;
  }

  if (values.departureDates.length === 0) {
    errors.departureDates = REQUIRED;
  }

  if (!values.days) {
    errors.days = REQUIRED;
  }

  if (values.days < 0) {
    errors.days = "Phải lớn hơn 0";
  }

  if (values.nights <= 0) {
    errors.nights = "Phải lớn hơn 0";
  }

  if (!values.nights) {
    errors.nights = REQUIRED;
  }

  if (!values.price) {
    errors.price = REQUIRED;
  }

  if (values.price <= 0) {
    errors.price = "Phải lớn hơn 0";
  }

  if (!values.thumb) {
    errors.thumb = REQUIRED;
  }

  return errors;
};
