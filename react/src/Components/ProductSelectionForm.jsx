import React from 'react';
import { FormControl, TextField, Autocomplete, Box } from '@mui/material';
/**
 * ProductSelectionForm component is used for selecting a product category and an item
 * within that category. The form consists of two fields: one for selecting a category 
 * and another for selecting a product based on the selected category.
 */
const ProductSelectionForm = ({
    categories,
    productsByCategory,
    newProduct,
    setNewProduct,
    handleCategoryChange
  }) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, width: '100%' }}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Category" 
            name="category" 
            value={newProduct.category} 
            onChange={handleCategoryChange} 
            fullWidth
            select 
            SelectProps={{
              native: true, 
            }}
          >
            <option value=""></option> {/* Default empty option */}
            {categories.map((category, index) => (
              <option key={index} value={category.category}>
                {category.category} {/* Display each category name */}
              </option>
            ))}
          </TextField>
        </FormControl>
  
        {/* Product search field */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <Autocomplete
            value={newProduct.item} // The current selected item from state
            onChange={(event, newValue) => {
              setNewProduct((prevProduct) => ({
                ...prevProduct,
                item: newValue || '', 
              }));
            }}
            inputValue={newProduct.item} 
            onInputChange={(event, newInputValue) => {
              // Updates the item value as the user types in the input field
              setNewProduct((prevProduct) => ({
                ...prevProduct,
                item: newInputValue,
              }));
            }}
            options={newProduct.category ? productsByCategory[newProduct.category] : []} 
            // Filters products based on the selected category
            renderInput={(params) => <TextField {...params} label="Search Product" />}
            disableClearable 
            fullWidth
            getOptionLabel={(option) => option} 
            isOptionEqualToValue={(option, value) => option === value} // Compares the option with the value
            noOptionsText="No products available" 
            disabled={!newProduct.category} // Disables the product search field if no category is selected
          />
        </FormControl>
      </Box>
    );
  };
  
  export default ProductSelectionForm;