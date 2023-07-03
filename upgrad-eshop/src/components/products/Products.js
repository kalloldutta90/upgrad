import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { ToggleButton } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ProductDetails from './ProductDetails';
import getProducts from "../services/getProducts";
import getCategories from "../services/getCategories";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'left',
    width: '100%',
    maxWidth: '300px',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  cardMedia: {
    width: '200px',
    height: '200px',
    marginBottom: theme.spacing(1),
  },
  cardActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  sortBy: {
    marginBottom: theme.spacing(2),
  },
}));

const Products = ({ isAdmin }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [selectedProductId, setSelectedProductId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const filterProductsByCategory = (products, category) => {
    if (!category || category === 'ALL') {
      return products;
    }
    return products.filter((product) => product.category.includes(category));
  };

  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case 'default':
        return products;
      case 'priceHighToLow':
        return [...products].sort((a, b) => b.price - a.price);
      case 'priceLowToHigh':
        return [...products].sort((a, b) => a.price - b.price);
      case 'newest':
        return products;
      default:
        return products;
    }
  };

  const filterProductsByName = (products, name) => {
    if (!name) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const filteredAndSortedProducts = sortProducts(
    filterProductsByCategory(filterProductsByName(products, searchQuery), selectedCategory),
    sortBy
  );

  const handleProductClick = (productId) => {
    if (isAdmin) {
      return;
    }
    setSelectedProductId(productId);
  };

  const handleBuyButtonClick = (event) => {
    if (isAdmin) {
      return;
    }
  }; 

  const renderProductCards = () => {
    if (filteredAndSortedProducts.length === 0) {
      return <Typography variant="subtitle1">No products found.</Typography>;
    }

    if (selectedProductId && !isAdmin) {
      const selectedProduct = products.find((product) => product.id === selectedProductId);
      return (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProductId(null)}
          isAdmin={isAdmin}
        />
      );
    }

    return filteredAndSortedProducts.map((product) => (
      <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        key={product.id}
        className={classes.card}
        style={{ flex: isMobile ? '1 1 100%' : '0 1 auto' }}
        onClick={() => handleProductClick(product.id)}
        >
          <CardMedia className={classes.cardMedia}>
          <img src={product.image} alt={product.name} />
          </CardMedia>
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" style={{ marginRight: 'auto' }}>
              {product.name}
            </Typography>
            <Typography variant="body1">₹{product.price}</Typography>
          </div>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            {`${product.description}`}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            style={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            }}
            onClick={handleBuyButtonClick}
          >
            Buy
          </Button>
          {isAdmin && (
            <React.Fragment>
              <IconButton
                component={Link}
                to={`/edit/${product.id}`}
                color="inherit"
                aria-label="Edit"
              >
                <EditIcon style={{ color: '#9e9e9e' }} />
              </IconButton>
              <IconButton color="inherit" aria-label="Delete">
                <DeleteIcon style={{ color: '#9e9e9e' }} />
              </IconButton>
            </React.Fragment>
          )}
        </CardActions>
      </Card>
      </Link>
    ));
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.categoryTabs}>
        <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
          {categories.map((category) => (
            <ToggleButton key={category} value={category}>
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className={classes.sortBy}>
        <FormControl variant="outlined">
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            onChange={handleSortByChange}
            label="Sort By"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        className={classes.productsContainer}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {renderProductCards()}
      </div>
    </div>
  );
};

export default Products;
