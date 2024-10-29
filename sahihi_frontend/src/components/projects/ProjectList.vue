<template>
  <div class="project-container">
    <h2>Project List</h2>
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search projects..." 
      class="search-input"
    />
    <button class="add-project-button" @click="createProject">Add Project</button>
    <ul>
      <li v-for="project in filteredProjects" :key="project.id">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <p>Deadline: {{ project.deadline }}</p>
        <div class="project-actions">
          <button class="secondary" @click="editProject(project.id)">Edit</button>
          <button class="delete" @click="deleteProject(project.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { server } from '@/utils/helper';

export default {
  data() {
    return {
      projects: [],
      searchQuery: '', // Add search query state
    };
  },
  computed: {
    // Computed property to filter projects based on search query
    filteredProjects() {
      return this.projects.filter(project => 
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchProjects() {
      const response = await axios.get(`${server.baseURL}/projects`);
      this.projects = response.data;
    },
    async deleteProject(id) {
      await axios.delete(`${server.baseURL}/projects/${id}`);
      this.fetchProjects();
    },
    createProject() {
      this.$router.push({ name: 'projectForm' });
    },
    editProject(id) {
      this.$router.push({ name: 'projectEdit', params: { id } });
    },
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

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

/* Add Search Input Styles */
.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #bbf7d0;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #86efac;
  box-shadow: 0 0 0 3px rgba(134, 239, 172, 0.25);
}

/* Remaining styles... */
</style>
