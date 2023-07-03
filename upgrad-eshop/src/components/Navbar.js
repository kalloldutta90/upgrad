// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase, makeStyles } from '@material-ui/core';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    color: '#FFF',
    underline: 'none',
  },
  logo: {
    marginRight: theme.spacing(1),
  },
  search: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    color: '#FFF',
    marginRight: theme.spacing(1),
  },
  searchInput: {
    color: '#FFF',
    flexGrow: 1,
  },
  link: {
    marginLeft: theme.spacing(2),
    color: '#FFF',
    textTransform: 'none',
    textDecoration: 'underline',
  },
  logoutButton: {
    backgroundColor: 'red',
    color: '#FFF',
  },
}));

const Navbar = ({ loggedIn, isAdmin, onLogout }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h6" component={Link} to="/" className={classes.logo}>
            <ShoppingCartIcon style={{ color: '#FFF' }} />
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className={classes.logo}
            underline="none"
            style={{ color: '#FFF' }}
          >
            upGrad E-Shop
          </Typography>
        </div>

        <div className={classes.search}>
          <form onSubmit={handleSearch}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search"
              className={classes.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {loggedIn ? (
          <React.Fragment>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            {isAdmin && (
              <Button component={Link} to="/add-products" className={classes.link}>
                Add Product
              </Button>
            )}
            <Button onClick={handleLogout} className={classes.logoutButton}>
              Log Out
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button component={Link} to="/login" className={classes.link}>
              Sign In
            </Button>
            <Button component={Link} to="/signup" className={classes.link}>
              Sign Up
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
