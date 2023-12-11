import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState = {
  products: [],
};

export const getAll = createAsyncThunk("products/getAll", async () => {
  try {
    return await productsService.getAll();
  } catch (error) {
    console.error(error);
  }
});
export const like = createAsyncThunk("products/like", async (_id) => {
  try {
    return await productsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        const productsUpdated = state.products.map((product) => {
          if (product._id == action.payload._id) {
            product = action.payload;
          }
          return product;
        });
        state.products = productsUpdated;
      });
  },
});

export default productsSlice.reducer;
