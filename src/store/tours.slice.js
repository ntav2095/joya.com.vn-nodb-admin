import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";
import {
  fetchTours as fetchToursAPI,
  updateSliderTours as updateSliderToursAPI,
  updateTour as updateTourAPI,
  addNewTour,
  updateHotTours as updateHotToursAPI,
  deleteTour as deleteTourAPI,
} from "../services/apis";

const initialState = {
  status: {
    fetchTours: "idle",
    updateSliderTours: "idle",
    updateTour: "idle",
    addTour: "idle",
    deleteTour: "idle",
    updateHotTours: "idle",
  }, // idle | pending | succeeded | failed,
  error: {
    fetchTours: null,
    updateSliderTours: null,
    updateTour: null,
    addTour: null,
    deleteTour: null,
    updateHotTours: null,
  },
  tours: [],
};

export const fetchTours = createAsyncThunk(
  "tours/fetchTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchToursAPI());
      const tours = response.data.data;
      return tours;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const updateSliderTours = createAsyncThunk(
  "tours/updateSliderTours",
  async (tours, { rejectWithValue }) => {
    try {
      const response = await axios(updateSliderToursAPI(tours));
      const updatedTours = response.data.data;
      return updatedTours;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const updateHotTours = createAsyncThunk(
  "tours/updateHotTours",
  async (tours, { rejectWithValue }) => {
    try {
      const response = await axios(updateHotToursAPI(tours));
      return response.data.data;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const updateTour = createAsyncThunk(
  "tours/updateTour",
  async (tours, { rejectWithValue }) => {
    try {
      const response = await axios(updateTourAPI(tours));
      const updatedTour = response.data.data;
      return updatedTour;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const addTour = createAsyncThunk(
  "tours/addTour",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addNewTour(data));
      const tour = response.data.data;
      return tour;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

export const deleteTour = createAsyncThunk(
  "tours/deleteTour",
  async (tourCode, { rejectWithValue }) => {
    try {
      const response = await axios(deleteTourAPI(tourCode));
      const code = response.data.data.code;
      return code;
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        return rejectWithValue({
          message: error.response.data.message || "",
          httpCode: error.response.status,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          httpCode: null,
        });
      }
    }
  }
);

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    resetToursState(state, action) {
      state.status[action.payload] = "idle";
      state.error[action.payload] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch tours
      .addCase(fetchTours.pending, (state, action) => {
        // reset all status and error
        // set fetchTours status = 'pending'
        state.error = initialState.error;
        state.status = { ...initialState.status, fetchTours: "pending" };
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status.fetchTours = "succeeded";
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.error.fetchTours = action.payload;
        state.status.fetchTours = "failed";
      })
      // update slider tours
      .addCase(updateSliderTours.pending, (state, action) => {
        state.status.updateSliderTours = "pending";
        state.error.updateSliderTours = null;
      })
      .addCase(updateSliderTours.fulfilled, (state, action) => {
        state.status.updateSliderTours = "succeeded";
        state.tours = state.tours.map((tour) => {
          const sliderTOur = action.payload.find(
            (item) => item._id === tour._id
          );
          if (sliderTOur) {
            return {
              ...tour,
              is_home_slider: sliderTOur.is_home_slider,
              is_domestic_slider: sliderTOur.is_domestic_slider,
              is_europe_slider: sliderTOur.is_europe_slider,
            };
          }
          return {
            ...tour,
            is_home_slider: false,
            is_domestic_slider: false,
            is_europe_slider: false,
          };
        });
      })
      .addCase(updateSliderTours.rejected, (state, action) => {
        state.error.updateSliderTours = action.payload;
        state.status.updateSliderTours = "failed";
      })
      // update  tours
      .addCase(updateTour.pending, (state, action) => {
        state.status.updateTour = "pending";
        state.error.updateTour = null;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.status.updateTour = "succeeded";
        state.tours = state.tours.map((tour) =>
          tour.code === action.payload.old_code ? action.payload : tour
        );
      })
      .addCase(updateTour.rejected, (state, action) => {
        state.error.updateTour = action.payload;
        state.status.updateTour = "failed";
      }) // update hot  tours
      .addCase(updateHotTours.pending, (state, action) => {
        state.status.updateHotTours = "pending";
        state.error.updateHotTours = null;
      })
      .addCase(updateHotTours.fulfilled, (state, action) => {
        state.status.updateHotTours = "succeeded";
        state.tours = state.tours.map((tour) => ({
          ...tour,
          hot: action.payload.includes(tour.code),
        }));
      })
      .addCase(updateHotTours.rejected, (state, action) => {
        state.error.updateHotTours = action.payload;
        state.status.updateHotTours = "failed";
      })
      // add  tour
      .addCase(addTour.pending, (state, action) => {
        state.status.addTour = "pending";
        state.error.addTour = null;
      })
      .addCase(addTour.fulfilled, (state, action) => {
        state.status.addTour = "succeeded";
        state.tours = [...state.tours, action.payload];
      })
      .addCase(addTour.rejected, (state, action) => {
        state.error.addTour = action.payload;
        state.status.addTour = "failed";
      })
      // delete  tour
      .addCase(deleteTour.pending, (state, action) => {
        state.status.deleteTour = "pending";
        state.error.deleteTour = null;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.status.deleteTour = "succeeded";
        state.tours = state.tours.filter(
          (tour) => tour.code !== action.payload
        );
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.error.deleteTour = action.payload;
        state.status.deleteTour = "failed";
      });
  },
});

export const selectTours = (state) => {
  const { tours, status, error } = state.tours;
  const places = state.destinations.destinations.places;

  const getPlaceItems = (ids) =>
    places.filter((place) => ids.includes(place.id));
  return {
    tours: tours
      .map((tour) => ({
        ...tour,
        destinations: getPlaceItems(tour.destinations),
      }))
      .map((tour) => ({
        ...tour,
        is_vn_tour: tour.destinations.every((dest) => dest.region),
        is_eu_tour: tour.destinations.some(
          (dest) => dest.continent === "europe"
        ),
        missingItineraryImgs: tour.itinerary.every(
          (iti) => iti.images.length === 0
        ),
      })),
    status,
    error,
  };
};

export const { resetToursState } = toursSlice.actions;
export default toursSlice.reducer;
