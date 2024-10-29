<template>
    <div>
      <h2>Log Interaction</h2>
      <form @submit.prevent="addLead">
        <!-- Customer Selection -->
        <label for="customer">Select Customer</label>
        <select v-model="lead.id" required>
          <option value="" disabled>Select a customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.companyName }}
          </option>
        </select>
  
        <!-- Interaction Type -->
        <label for="interactionType">Interaction Type</label>
        <select v-model="lead.interactionType" required>
          <option value="call">Call</option>
          <option value="email">Email</option>
        </select>
  
        <!-- Notes Field -->
        <label for="notes">Notes</label>
        <textarea v-model="lead.notes" placeholder="Notes" required></textarea>
  
        <button type="submit">Log Interaction</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        lead: { interactionType: '', notes: '', customerId: '' },
        customers: [] // Array to store fetched customers
      };
    },
    methods: {
      async fetchCustomers() {
        try {
          const response = await axios.get('http://localhost:3000/crm/customers');
          this.customers = response.data;
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      },
      async addLead() {
        if (!this.lead.id) {
            alert('Please select a customer');
            return;
        }
        await axios.post('http://localhost:3000/crm/lead', this.lead);
      }
    },
    created() {
      this.fetchCustomers(); // Fetch customers when the component is created
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  label {
    font-weight: bold;
  }
  select, textarea, button {
    padding: 8px;
    font-size: 16px;
  }
  </style>
  