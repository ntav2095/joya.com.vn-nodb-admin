export const validationErrorsAnalyser = (errors) => {
  const arr = [];

  if (errors.code) {
    arr.push("mã");
  }

  if (errors.name) {
    arr.push("tên");
  }

  if (errors.journey) {
    arr.push("lộ trình (tổng quan)");
  }

  if (errors.description) {
    arr.push("mô tả");
  }

  if (errors.destinations) {
    arr.push("điểm đến");
  }

  if (errors.departure_dates) {
    arr.push("ngày khởi hành");
  }

  if (errors.duration?.days) {
    arr.push("số ngày");
  }

  if (errors.duration?.nights) {
    arr.push("số đêm");
  }

  if (errors.highlights) {
    arr.push("điểm nổi bật");
  }

  if (errors.itinerary) {
    if (typeof errors.itinerary === "string") {
      arr.push(`lộ trình: ${errors.itinerary.toLowerCase()}`);
    } else {
      let itiErrors = [];
      if (
        errors.itinerary.some(
          (item) =>
            item.images && item.images.some((imgItem) => imgItem.caption)
        )
      ) {
        itiErrors.push("mô tả hình");
      }

      if (errors.itinerary.some((item) => item.day)) {
        itiErrors.push("tiêu đề");
      }

      if (errors.itinerary.some((item) => item.destination)) {
        itiErrors.push("điểm đến");
      }

      if (errors.itinerary.some((item) => item.content)) {
        itiErrors.push("nội dung");
      }

      if (itiErrors.length > 0) {
        arr.push("lộ trình: " + itiErrors.join(" - "));
      }
    }
  }

  if (errors.price) {
    arr.push("giá");
  }

  if (errors.price_policies) {
    arr.push("bảng giá");
  }

  if (errors.terms) {
    arr.push("điều khoản");
  }

  if (errors.thumb) {
    arr.push("hình thumbnail");
  }

  if (errors.banner) {
    arr.push("hình banner");
  }

  if (errors.start_at) {
    arr.push("điểm khởi hành");
  }

  // translation
  if (errors.translation) {
    if (errors.en.name) {
      arr.push("tên (en)");
    }

    if (errors.en.description) {
      arr.push("mô tả (en)");
    }

    if (errors.en.journey) {
      arr.push("lộ trình (en)");
    }

    if (errors.en.highlights) {
      arr.push("điểm nổi bật (en)");
    }

    if (errors.en.terms) {
      arr.push("điều khoản (en)");
    }

    if (errors.en.price_policies) {
      arr.push("bảng giá (en)");
    }

    if (errors.en.itinerary) {
      if (typeof errors.en.itinerary === "string") {
        arr.push(`lộ trình (en): ${errors.en.itinerary.toLowerCase()}`);
      } else {
        let itiErrors = [];
        if (
          errors.en.itinerary.some(
            (item) =>
              item.images && item.images.some((imgItem) => imgItem.caption)
          )
        ) {
          itiErrors.push("mô tả hình");
        }

        if (errors.en.itinerary.some((item) => item.day)) {
          itiErrors.push("tiêu đề");
        }

        if (errors.en.itinerary.some((item) => item.destination)) {
          itiErrors.push("điểm đến");
        }

        if (errors.en.itinerary.some((item) => item.content)) {
          itiErrors.push("nội dung");
        }

        if (itiErrors.length > 0) {
          arr.push("lộ trình (en): " + itiErrors.join(" - "));
        }
      }
    }
  }

  return arr;
};
