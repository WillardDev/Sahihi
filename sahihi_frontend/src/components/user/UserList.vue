<template>
    <div class="user-list">
      <h2>User List</h2>
      <table v-if="users.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No users found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserList',
    data() {
      return {
        users: [], // Array to hold the fetched users
      };
    },
    mounted() {
      this.fetchUsers(); // Fetch users when the component is mounted
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/users', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.users = response.data;
        } catch (error) {
          console.error("Error fetching users:", error);
          alert("Unable to fetch users. Please try again later.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .user-list {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #e0f2e9; /* Pale green */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #4caf50; /* Light green */
    text-align: center;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #c8e6c9; /* Slightly darker pale green for headers */
    color: #2d3e33;
  }
  
  tr:hover {
    background-color: #f1f8e9; /* Light hover effect */
  }
  
  p {
    color: #2d3e33;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  