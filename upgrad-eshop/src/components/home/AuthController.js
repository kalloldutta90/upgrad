class AuthController {
    static users = [{
      firstName:"Admin",
      lastName:"Admin",
      email:"admin@upgrad.com",
      password:"admin@123",
      contact:"0000000000",
      admin:true,
    },];
  
    static signIn(email, password) {

      try {
        const user = AuthController.users.find((user) => user.email === email);
        if (!user) {
          throw new Error('User not found');
        }
  
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
  
        return { user };
      } catch (error) {
        console.error('Error during sign in:', error);
        alert('Sign-in error:'+ error.message);
        throw new Error('Internal server error');
      }
    }
  
    static signUp(firstName, lastName, email, password, contact) {
      try {
        const existingUser = AuthController.users.find((user) => user.email === email);
        if (existingUser) {
          throw new Error('Email already exists');
        }
  
        const newUser = {
          firstName,
          lastName,
          email,
          password,
          contact,
          admin:false,
        };
  
        AuthController.users.push(newUser);
  
        return { user: newUser };
      } catch (error) {
        console.error('Error during sign up:', error);
        throw new Error('Internal server error');
      }
    }
  }
  
  export default AuthController;
  