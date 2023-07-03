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
  signUpText: {
    color: 'black',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  signUpButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signInLink: {
    color: 'blue',
    textDecoration: 'none',
    marginTop: theme.spacing(2),
  },
  termsText: {
    marginTop: theme.spacing(2),
    color: 'gray',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: '',
    contact: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.password !== formData.cpassword){
        throw Error("Passwords donot match");
      }
      const AuthController = (await import('./AuthController')).default;
      const signUpResponse = AuthController.signUp(formData.firstName, formData.lastName, formData.email, formData.password, formData.contact);
      console.log('User signed up:', signUpResponse.user);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      console.error('Sign-up error:', error.message);
      alert('Sign-up error:'+ error.message)
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.lockIconContainer}>
        <LockIcon className={classes.lockIcon} />
      </div>
      <Typography variant="h5" className={classes.signUpText}>
        Sign Up
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        className={classes.textField}
        fullWidth
      />
      <TextField
        label="Last Name"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
        className={classes.textField}
        fullWidth
      />
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
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, cpassword: e.target.value })}
        className={classes.textField}
        fullWidth
      />
      <TextField
        label="Contact Number"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        className={classes.textField}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.signUpButton}
        fullWidth
        onClick={handleFormSubmit}
      >
        Sign Up
      </Button>
      <Link to="/login" className={classes.signInLink}>
        Already have an account? Sign In
      </Link>
      <Typography variant="body2" className={classes.termsText}>
        By signing up, you agree to our Terms and Conditions.
      </Typography>
    </div>
  );
};

export default SignUp;
