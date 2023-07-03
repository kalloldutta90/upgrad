import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, TextField } from '@material-ui/core';
import getProducts from '../services/getProducts';
import { useTheme } from '@material-ui/core/styles';

const ProductDetails = (email) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    getProducts()
      .then((products) => {
        const product = products.find((item) => item.id === parseInt(id));
        setProduct(product);
      })
      .catch((error) => console.log(error));
  };

  const handleQuantityChange = (event) => {
    const enteredQuantity = parseInt(event.target.value);
    const availableQuantity = product.quantity;
    if (enteredQuantity > availableQuantity || enteredQuantity <= 0) {
      setQuantity(availableQuantity);
    } else {
      setQuantity(enteredQuantity);
    }
  };

  const handleBuyButtonClick = () => {
    if (quantity > product.quantity) {
      console.log('Invalid quantity');
      return;
    }
    console.log(`Buy ${quantity} of ${product.name}`);
    navigate('/create-order', { state: { product: product, quantity: quantity } });
  };

  if (!product) {
    return <Typography variant="subtitle1">Loading...</Typography>;
  }

  // Calculate the total price based on quantity
  const totalPrice = product.price * quantity;

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 300px', marginRight: '20px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%' }} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Typography variant="h5" gutterBottom style={{ marginRight: '10px' }}>
              {product.name}
            </Typography>
            <div
              style={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: '5px',
                padding: '5px 5px',
                color: 'white',
              }}
            >
              Available Quantity: {product.quantity}
            </div>
          </div>
          <Typography variant="body1">Category: {product.category.join(', ')}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6" gutterBottom style={{ color: 'red' }}>
            ₹{totalPrice}
          </Typography>
          <TextField
            type="number"
            variant="outlined"
            label="Enter Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            margin="dense"
            style={{ marginBottom: '20px' }}
          />
          <div>
            <Button variant="contained" color="primary" onClick={handleBuyButtonClick}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
