<template>
    <div class="signup">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
  
        <label>Password:</label>
        <input v-model="form.password" type="password" required />
  
        <label>First Name:</label>
        <input v-model="form.firstName" type="text" />
  
        <label>Last Name:</label>
        <input v-model="form.lastName" type="text" />

        <label>Address:</label>
        <input v-model="form.address" type="text" />

        <label>KRA Pin:</label>
        <input v-model="form.kraPin" type="text" />

        <label>Phone Number:</label>
        <input v-model="form.phoneNumber" type="text" />
  
        <label>Role:</label>
        <select v-model="form.role" required>
          <option>Admin</option>
          <option>Project Manager</option>
          <option>Engineer</option>
        </select>
  
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        form: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          address: "",
          kraPin: "",
          phoneNumber: "",
          role: "Engineer",
        },
        message: ""
      };
    },
    methods: {
      async signup() {
        try {
          await axios.post("http://localhost:3000/auth/signup", this.form);
          this.message = "Signup successful!";
          this.$router.push({ name: 'home'});
        } catch (error) {
          this.message = "Error signing up: " + (error.response?.data?.message || error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .signup {
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
  
  input, select {
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
  