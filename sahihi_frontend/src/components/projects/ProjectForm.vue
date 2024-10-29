<template>
    <div class="project-container">
      <h2>Create Project</h2>
      <form @submit.prevent="submitForm">
        <label>Name:</label>
        <input v-model="project.name" required />
  
        <label>Description:</label>
        <textarea v-model="project.description" required></textarea>
  
        <label for="projectManager">Select Project Manager:</label>
        <select v-model="project.projectManagerId" required>
          <option value="" disabled>Select a Project Manager</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.firstName }} {{ user.lastName }}
          </option>
        </select>
  
        <label>Deadline:</label>
        <input type="date" v-model="project.deadline" required />
  
        <button type="submit">Create Project</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { server } from '@/utils/helper';
  
  export default {
    data() {
      return {
        project: {
          name: '',
          description: '',
          deadline: '',
          projectManagerId: '', // Make sure to include projectManagerId
        },
        users: [],
      };
    },
    methods: {
      async submitForm() {
        try {
          // Make sure to include projectManagerId in the project object
          await axios.post(`${server.baseURL}/projects`, this.project);
          this.$router.push({ name: 'projectList' });
        } catch (error) {
          console.error('Error creating project:', error);
        }
      },
      async fetchUsers() {
            try {
                const response = await axios.get(`${server.baseURL}/users`);
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    },
    created() {
      this.fetchUsers(); // Fetch users when the component is created
    }
  };
  </script>
  
  <style scoped>
  /* Common Styles to be added to each component */
  .project-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h2 {
    color: #166534;
    font-size: 2rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #bbf7d0;
    padding-bottom: 0.5rem;
  }
  
  /* Form Styles */
  form {
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #bbf7d0;
    max-width: 600px;
    margin: 0 auto;
  }
  
  label {
    display: block;
    color: #166534;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border: 2px solid #bbf7d0;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #86efac;
    box-shadow: 0 0 0 3px rgba(134, 239, 172, 0.25);
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  /* Button Styles */
  button {
    background-color: #22c55e;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  button:hover {
    background-color: #16a34a;
  }
  
  /* Additional styles can go here... */
  </style>
  