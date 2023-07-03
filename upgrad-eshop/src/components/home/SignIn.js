import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import { Typography, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    maxWidth: '400px',
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: '8px',
  },
  lockIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginBottom: theme.spacing(2),
  },
  lockIcon: {
    fontSize: 60,
    color: 'white',
  },
  signInText: {
    color: 'black',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  signInButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signUpLink: {
    color: 'blue',
    textDecoration: 'none',
    marginTop: theme.spacing(2),
  },
  copyrightText: {
    marginTop: theme.spacing(4),
    color: 'gray',
  },
}));

const SignIn = ({ onAdminStatus, onLogin }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const AuthController = (await import('./AuthController')).default;
      const signInResponse = AuthController.signIn(formData.email, formData.password);
      console.log('User signed in:', signInResponse.user);
      onAdminStatus(signInResponse.user.admin);
      onLogin(signInResponse.user.email);
      navigate('/products');
    } catch (error) {
      console.error('Error:', error);
      console.error('Sign-in error:', error.message);
    }
  };
    return (
    <div className={classes.container}>
      <div className={classes.lockIconContainer}>
        <LockIcon className={classes.lockIcon} />
      </div>
      <Typography variant="h5" className={classes.signInText}>
        Sign In
      </Typography>
      <TextField
        label="Email Address"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={classes.textField}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className={classes.textField}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.signInButton}
        fullWidth
        onClick={handleFormSubmit}
      >
        Sign In
      </Button>
      <Link to="/signup" className={classes.signUpLink}>
        Don't have an account? Sign Up
      </Link>
      <Typography variant="body2" className={classes.copyrightText}>
        Copyright &copy; upGrad 2021
      </Typography>
    </div>
  );
};

export default SignIn;
