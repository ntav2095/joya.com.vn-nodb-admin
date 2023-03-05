const isEmptyDelta = (delta) => {
  if (!delta) return true;
  const ops = delta.ops;
  if (!ops) return true;
  return ops.length === 1 && !Boolean(ops[0].insert.trim());
};

const REQUIRED = "Bắt buộc";

export const tourValidator = (values) => {
  const errors = {};

  // ******************* VALIDATE VIET NAM *********************
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

  if (isEmptyDelta(values.highlights)) {
    errors.highlights = REQUIRED;
  }

  if (values.departure_dates.length === 0 && !values.departure_dates_text) {
    errors.departure_dates = REQUIRED;
  }

  // ----------------- duration -------------------
  const duration = {};
  if (!values.duration.days) {
    duration.days = REQUIRED;
  }

  if (values.duration.days && values.duration.days <= 0) {
    duration.days = "Phải lớn hơn 0";
  }

  if (values.duration.nights != 0 && !values.duration.nights) {
    duration.nights = REQUIRED;
  }

  if (values.duration.nights && values.duration.nights < 0) {
    duration.nights = "Phải lớn hơn hoặc bằng 0";
  }

  if (
    !duration.days &&
    !duration.nights &&
    Math.abs(values.days - values.nights) > 1
  ) {
    duration.nights = "Số ngày - đêm không hợp lệ";
    duration.days = "Số ngày - đêm không hợp lệ";
  }

  if (Object.keys(duration).length > 0) {
    errors.duration = duration;
  }

  // ----------------- price -------------------
  if (!values.price) {
    errors.price = REQUIRED;
  }

  if (values.price && values.price <= 0) {
    errors.price = "Phải lớn hơn 0";
  }

  // ----------------- destinations -------------------
  if (values.destinations.length === 0) {
    errors.destinations = REQUIRED;
  }

  // ----------------- start at -------------------
  if (!values.start_at && !values.start_at_text) {
    errors.start_at = REQUIRED;
  }

  // ----------------- thumbnail and banner -------------------
  if (!values.thumb) {
    errors.thumb = REQUIRED;
  }

  if (!values.banner) {
    errors.banner = REQUIRED;
  }

  // ----------------- terms -------------------
  const terms = {};
  if (isEmptyDelta(values.terms.registration)) {
    terms.registration = REQUIRED;
  }

  if (isEmptyDelta(values.terms.cancellation)) {
    terms.cancellation = REQUIRED;
  }

  if (isEmptyDelta(values.terms.payment)) {
    terms.payment = REQUIRED;
  }

  if (Object.keys(terms).length > 0) {
    errors.terms = terms;
  }

  // notes (terms) is not required

  // ----------------- price policies -------------------
  const pricePolicies = {};
  if (isEmptyDelta(values.price_policies.includes)) {
    pricePolicies.includes = REQUIRED;
  }

  if (isEmptyDelta(values.price_policies.excludes)) {
    pricePolicies.excludes = REQUIRED;
  }

  if (isEmptyDelta(values.price_policies.other)) {
    pricePolicies.other = REQUIRED;
  }

  if (Object.keys(pricePolicies).length > 0) {
    errors.price_policies = pricePolicies;
  }

  // ----------------- itinerary -------------------

  if (values.itinerary.length === 0) {
    errors.itinerary = REQUIRED;
  } else if (values.itinerary.every((item) => item.images.length === 0)) {
    errors.itinerary = "Chưa có hình lộ trình";
  } else {
    let itinerary = [];
    values.itinerary.forEach((iti) => {
      // day, destination, content
      const itiErrors = {};
      if (!iti.day.trim()) {
        itiErrors.day = REQUIRED;
      }

      if (!iti.destination.trim()) {
        itiErrors.destination = REQUIRED;
      }

      if (isEmptyDelta(iti.content)) {
        itiErrors.content = REQUIRED;
      }

      // images caption errors: [ {caption: "Bắt buộc"} ]
      const images = [];
      iti.images.forEach((imgItem) => {
        const caption = {};
        if (!imgItem.caption.trim()) {
          caption.caption = REQUIRED;
        }

        images.push(caption);
      });

      // nếu có lỗi images thì mới gán vào itiErrors
      if (images.some((item) => Object.keys(item).length > 0)) {
        itiErrors.images = images;
      }

      itinerary.push(itiErrors);
    });

    // nếu có lỗi itinerary thì mới gán
    if (itinerary.some((item) => Object.keys(item).length > 0)) {
      errors.itinerary = itinerary;
    }
  }

  // tiếng Anh
  // ----------------- name -------------------
  let enErrors = {};
  if (!values.en.name) {
    enErrors.name = REQUIRED;
  }

  // ----------------- journey -------------------
  if (!values.en.journey) {
    enErrors.journey = REQUIRED;
  }

  // ----------------- description -------------------
  if (!values.en.description) {
    enErrors.description = REQUIRED;
  }

  // ----------------- highlights -------------------
  if (isEmptyDelta(values.en.highlights)) {
    enErrors.highlights = REQUIRED;
  }

  // ----------------- terms -------------------
  const transTerms = {};
  if (isEmptyDelta(values.en.terms.registration)) {
    transTerms.registration = REQUIRED;
  }

  if (isEmptyDelta(values.en.terms.cancellation)) {
    transTerms.cancellation = REQUIRED;
  }

  if (isEmptyDelta(values.en.terms.payment)) {
    transTerms.payment = REQUIRED;
  }

  if (Object.keys(transTerms).length > 0) {
    enErrors.terms = transTerms;
  }

  // ----------------- price policies -------------------
  const transPricePolicies = {};
  if (isEmptyDelta(values.en.price_policies.includes)) {
    transPricePolicies.includes = REQUIRED;
  }

  if (isEmptyDelta(values.en.price_policies.excludes)) {
    transPricePolicies.excludes = REQUIRED;
  }

  if (isEmptyDelta(values.en.price_policies.other)) {
    transPricePolicies.other = REQUIRED;
  }

  if (Object.keys(transPricePolicies).length > 0) {
    enErrors.price_policies = transPricePolicies;
  }

  // ----------------- itinerary -------------------
  if (values.en.itinerary.length === 0) {
    enErrors.itinerary = REQUIRED;
  } else {
    const itineraryErrors = [];
    values.en.itinerary.forEach((iti) => {
      // day, destination, content
      const itiItemErrors = {};
      if (!iti.day.trim()) {
        itiItemErrors.day = REQUIRED;
      }

      if (!iti.destination.trim()) {
        itiItemErrors.destination = REQUIRED;
      }

      if (isEmptyDelta(iti.content)) {
        itiItemErrors.content = REQUIRED;
      }

      // images caption
      const itiImagesErrors = [];
      iti.images.forEach((imgItem) => {
        const captionError = {};
        if (!imgItem.caption.trim()) {
          captionError.caption = REQUIRED;
        }

        itiImagesErrors.push(captionError);
      });

      // nếu có lỗi images thì mới gán vào itiErrors
      if (itiImagesErrors.some((item) => Object.keys(item).length > 0)) {
        itiItemErrors.images = itiImagesErrors;
      }

      itineraryErrors.push(itiItemErrors);
    });

    // nếu có lỗi itinerary thì mới gán
    if (itineraryErrors.some((item) => Object.keys(item).length > 0)) {
      enErrors.itinerary = itineraryErrors;
    }
  }

  if (Object.keys(enErrors).length > 0) {
    errors.en = enErrors;
  }

  if (Object.keys(errors).length > 0) {
    console.log("Error from tour validator: ", errors);
  }

  return errors;
};
