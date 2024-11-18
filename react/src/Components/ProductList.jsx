import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * ProductList component that displays a list of products grouped by category.
 * It also shows the total number of products in the order.
 */
const ProductList = ({ groupedItems }) => {
  if (!groupedItems || Object.keys(groupedItems).length === 0) {
    return <Typography variant="body1">No products in the order.</Typography>;
  }

  // Calculate the total number of products in the order
  const totalProducts = Object.values(groupedItems).reduce((total, products) => {
    return total + products.reduce((sum, product) => sum + product.count, 0);
  }, 0);

  return (
    <Box sx={{ marginTop: 3, maxWidth: 400, width: '100%' }}>
      {/* Display the total number of products in the order */}
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Products: {totalProducts}</Typography>
      {/* Iterate through each category and display its products */}
      {Object.keys(groupedItems).map((category) => (
        <Box key={category} sx={{ marginBottom: 3 }}>
          {/* Category header showing the category name and total number of products in that category */}
          <Typography variant="h6" sx={{ textDecoration: 'underline' }}>
            {category} ({groupedItems[category].reduce((sum, product) => sum + product.count, 0)})
          </Typography>

          {/* List the products in this category */}
          <ul>
            {groupedItems[category].map((product, index) => (
              <li key={index}>
                <Typography variant="body1">
                  {product.item}
                  {/* Display count for products greater than 1 */}
                  {product.count > 1 && ` (x${product.count})`}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
