<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
  
        <label>Password:</label>
        <input v-model="form.password" type="password" required />
  
        <button type="submit">Log In</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
    import axios from "axios";

    export default {
      name: "UserLogin",
      data() {
        return {
          form: {
            email: "",
            password: ""
          },
          message: ""
        };
      },
      methods: {
        async login() {
            try {
              const response = await axios.post("http://localhost:3000/auth/login", this.form);

              // Check if user data exists in the response
              if (response.data && response.data.access_token) {
                const userInfo = {
                  id: response.data.user.id,
                  firstName: response.data.user.firstName,
                  lastName: response.data.user.lastName,
                  role: response.data.user.role,
                  email: response.data.user.email,
                  address: response.data.user.address,
                  kraPin: response.data.user.kraPin,
                  phone: response.data.user.phone
                }; // Extract user data

                localStorage.setItem("user", JSON.stringify(userInfo)); // Save user data
                localStorage.setItem("token", response.data.access_token); // Save JWT token
                this.message = "Login successful!";
                this.$router.push({ name: 'home' }); // Redirect to home
              } else {
                this.message = "User data is not available in the response.";
              }
            } catch (error) {
              this.message = "Error logging in: " + (error.response?.data?.message || error.message);
            }
        }
      }
    };
  </script>
  
  <style scoped>
  .login {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #e0f2e9; /* Pale green */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #2d3e33;
    text-align: center;
  }
  
  h2 {
    color: #4caf50; /* Light green */
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    color: #2d3e33;
    margin-top: 10px;
  }
  
  input {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #c8e6c9;
    border-radius: 5px;
    outline: none;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    color: white;
    background-color: #4caf50; /* Light green */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #66bb6a; /* Slightly brighter green */
  }
  
  p {
    color: #2d3e33;
    margin-top: 15px;
    font-size: 14px;
  }
  </style>
  