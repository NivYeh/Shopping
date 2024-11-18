import { createSlice } from '@reduxjs/toolkit';

// Initial state for the products slice
const initialState = {
  items: [],  // List of items in the shopping cart
};

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add a new product to the cart or update its count if already present
    addProduct: (state, action) => {
      const { category, item, count } = action.payload;

      // Check if the product already exists in the cart
      const existingProduct = state.items.find(
        (product) => product.category === category && product.item === item
      );

      if (existingProduct) {
        // If the product exists, increment the count
        existingProduct.count += count;
      } else {
        // If the product doesn't exist, add it to the array
        state.items.push({ category, item, count });
      }
    },

  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
