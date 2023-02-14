// term
export { fetchAllTerms, fetchSingleTerm, updateTerm } from "./term.api.js";

// tour image
export { updateTourImages } from "./image.api.js";

// user
export {
  login,
  changeRole,
  deleteUser,
  fetchUsers,
  createUser,
  fetchSingleUser,
  changePassword,
} from "./user.api.js";

// about
export { fetchAbout, updateAbout } from "./about.api.js";

// visa
export {
  fetchVisas,
  fetchVisasAvailableCountries,
  fetchSingleVisaProduct,
  addNewVisaProduct,
  updateVisaProduct,
  deleteVisaProduct,
} from "./visa.api.js";

// category
export {
  fetchCats,
  addNewCatItem,
  deleteCatItem,
  updateCatItem,
} from "./category.api.js";

// guides
export {
  fetchArticles,
  fetchSingleArticle,
  addNewArticle,
  updateArticle,
  deleteArticle,
  // category
  fetchGuidesCategory,
  addGuidesCategoryItem,
  updateGuidesCategoryItem,
  deleteGuidesCategoryItem,
} from "./article.api.js";

// tour
export {
  fetchTours,
  fetchSingleTour,
  addNewTour,
  updateTour,
  deleteTour,
  updateTourItinerary,
  addRatingItem,
  updateRatingItem,
  deleteRatingItem,
  updateHotTours,
  updateSliderTours,
} from "./tour.api.js";

// places
export { fetchPlaces } from "./place.api";

// slider
export { updateSliders } from "./slider.api";

// destinations
// slider
export {
  fetchDestinations,
  deleteDestinationItem,
  updateDestinationItem,
  addDestinationItem,
} from "./destination.api";

// company info
export { fetchCompanyInfo, updateCompanyInfo } from "./companyInfo.api";
