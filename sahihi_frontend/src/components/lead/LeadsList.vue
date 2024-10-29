<template>
    <div>
      <h2>Leads List</h2>
  
      <!-- Filters -->
      <div class="filters">
        <input 
          v-model="searchType" 
          class="search-input"
          placeholder="Search by Interaction Type (e.g., call, email)" 
        />
      </div>
  
      <!-- Leads Table -->
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Interaction Type</th>
            <th>Notes</th>
            <th>Interaction Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in filteredLeads" :key="lead.id">
            <td>{{ lead.customer ? lead.customer.companyName : 'No Customer' }}</td>
            <td>{{ lead.interactionType }}</td>
            <td>{{ lead.notes }}</td>
            <td>{{ new Date(lead.interactionDate).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        leads: [],
        searchType: '' // Search input for filtering by interaction type
      };
    },
    computed: {
      filteredLeads() {
        return this.leads.filter(lead => {
          // Check if interactionType matches the search term, case-insensitively
          return lead.interactionType
            .toLowerCase()
            .includes(this.searchType.trim().toLowerCase());
        });
      }
    },
    methods: {
      async fetchLeads() {
        try {
          const response = await axios.get('http://localhost:3000/crm/customer-leads');
          this.leads = response.data;
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      }
    },
    created() {
      this.fetchLeads();
    }
  };
  </script>
  
  <style scoped>
  .filters {
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;  /* Add padding for better spacing */
    border: 1px solid #ddd;  /* Border styling */
    border-radius: 5px;  /* Rounded corners */
    width: 300px;  /* Set a fixed width */
    transition: border-color 0.3s;  /* Smooth border color transition */
  }
  
  .search-input:focus {
    border-color: #2e8b57;  /* Change border color on focus */
    outline: none;  /* Remove default outline */
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #d0f0c0; /* Light green for header */
    color: #2e8b57;
    text-align: left;
  }
  
  td {
    background-color: #f0fff0; /* Pale green for rows */
  }
  
  tbody tr:nth-child(even) td {
    background-color: #ffffff; /* White for alternating rows */
  }
  </style>
  