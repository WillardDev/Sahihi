<template>
    <div class="project-container">
      <h2>Edit Project</h2>
      <form @submit.prevent="submitForm">
        <label>Name:</label>
        <input v-model="project.name" required />
  
        <label>Description:</label>
        <textarea v-model="project.description" required></textarea>
  
        <label>Deadline:</label>
        <input type="date" v-model="project.deadline" />
  
        <button type="submit">Save Changes</button>
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
        },
      };
    },
    async created() {
      const response = await axios.get(`${server.baseURL}/projects/${this.$route.params.id}`);
      this.project = response.data;
    },
    methods: {
      async submitForm() {
        await axios.put(`${server.baseURL}/projects/${this.$route.params.id}`, this.project);
        this.$router.push({ name: 'projectList' });
      },
    },
  };
  </script>

/* Common Styles to be added to each component */
<style>
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

button.secondary {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

button.secondary:hover {
  background-color: #bbf7d0;
}

button.delete {
  background-color: #fee2e2;
  color: #dc2626;
  margin-left: 0.5rem;
}

button.delete:hover {
  background-color: #fecaca;
}

/* Project List Styles */
ul {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

li {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
  transition: all 0.2s ease;
}

li:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

li h3 {
  color: #166534;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

li p {
  color: #374151;
  margin: 0.5rem 0;
  line-height: 1.5;
}

.project-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
  gap: 0.5rem;
}

.add-project-button {
  margin-bottom: 2rem;
}

/* Loading State */
.loading {
  text-align: center;
  padding: 2rem;
  color: #166534;
}

/* Error State */
.error {
  color: #dc2626;
  background-color: #fee2e2;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .project-container {
    padding: 1rem;
  }

  ul {
    grid-template-columns: 1fr;
  }

  form {
    padding: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>