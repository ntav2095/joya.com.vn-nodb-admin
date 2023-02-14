import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axios";
import {
  fetchDestinations as fetchDestinationsAPI,
  updateDestinationItem,
  deleteDestinationItem,
  addDestinationItem,
} from "../services/apis";

const initialState = {
  status: {
    fetchDestinations: "idle",
    updatePlace: "idle",
    deletePlace: "idle",
    addPlace: "idle",
  }, // idle | pending | succeeded | failed,
  error: {
    fetchDestinations: null,
    updatePlace: null,
    deletePlace: null,
    addPlace: null,
  },
  destinations: {
    types: [],
    regions: [],
    continents: [],
    places: [],
  },
};

export const fetchDestinations = createAsyncThunk(
  "tours/fetchDestinations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchDestinationsAPI());
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

export const updatePlace = createAsyncThunk(
  "tours/updatePlace",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(updateDestinationItem(data));
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

export const deletePlace = createAsyncThunk(
  "tours/deletePlace",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios(deleteDestinationItem(id));
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

export const addPlace = createAsyncThunk(
  "tours/addPlace",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios(addDestinationItem(data));
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

const destinationsSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchDestinations.pending, (state, action) => {
        // reset all status and error
        // set fetchTours status = 'pending'
        state.error = initialState.error;
        state.status = { ...initialState.status, fetchDestinations: "pending" };
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.status.fetchDestinations = "succeeded";
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.error.fetchDestinations = action.payload;
        state.status.fetchDestinations = "failed";
      })
      // update
      .addCase(updatePlace.pending, (state, action) => {
        state.status.updatePlace = "pending";
        state.error.updatePlace = null;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.status.updatePlace = "succeeded";
        state.destinations.places = state.destinations.places.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.error.updatePlace = action.payload;
        state.status.updatePlace = "failed";
      })
      // add
      .addCase(addPlace.pending, (state, action) => {
        state.status.addPlace = "pending";
        state.error.addPlace = null;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.status.addPlace = "succeeded";
        state.destinations.places = [
          ...state.destinations.places,
          action.payload,
        ];
      })
      .addCase(addPlace.rejected, (state, action) => {
        state.error.addPlace = action.payload;
        state.status.addPlace = "failed";
      })
      // delete
      .addCase(deletePlace.pending, (state, action) => {
        state.status.deletePlace = "pending";
        state.error.deletePlace = null;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.status.deletePlace = "succeeded";
        state.destinations.places = state.destinations.places.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.error.deletePlace = action.payload;
        state.status.deletePlace = "failed";
      });
  },
});

export default destinationsSlice.reducer;
