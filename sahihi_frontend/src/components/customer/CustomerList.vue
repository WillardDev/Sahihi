<template>
  <div class="container">
    <div class="header-container">
      <h2 class="page-title">Customers</h2>
      <router-link to="/customers/create" class="create-button">
        Create Customer
      </router-link>
    </div>

    <div class="search-container">
      <input 
        v-model="searchTerm" 
        placeholder="Search by company name, email, or status..." 
        class="search-input"
        @input="handleSearch"
      />
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th> <!-- Added a column for actions -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filteredCustomers" :key="customer.id">
            <td>
              <router-link :to="{ name: 'customerDetail', params: { id: customer.id } }">
                {{ customer.companyName }}
              </router-link>
            </td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <span 
                class="status-badge"
                :class="{
                  'status-active': customer.status === 'Active',
                  'status-pending': customer.status === 'Pending',
                  'status-inactive': customer.status === 'Inactive'
                }"
              >
                {{ customer.status }}
              </span>
            </td>
            <td>
              <router-link :to="{ name: 'editCustomer', params: { id: customer.id } }" class="edit-button">
                Edit
              </router-link>
              <button @click="deleteCustomer(customer.id)" class="delete-button">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: [],
      searchTerm: '',
      originalCustomers: [] // Store original customer list for resetting the search
    };
  },
  computed: {
    filteredCustomers() {
      // If searchTerm is empty, return the original customer list
      if (!this.searchTerm) return this.originalCustomers;

      return this.originalCustomers.filter(customer => {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        return (
          customer.companyName.toLowerCase().includes(lowerCaseSearchTerm) ||
          customer.email.toLowerCase().includes(lowerCaseSearchTerm) ||
          customer.status.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    }
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:3000/crm/customers');
        this.customers = response.data;
        this.originalCustomers = response.data; // Store original customers for filtering
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    async searchCustomers() {
      // No need to call the API here; filtering is done client-side
    },
    handleSearch() {
      if (this.searchTerm === '') {
        this.customers = this.originalCustomers; // Reset to original customers if the search term is empty
      }
    },
    async deleteCustomer(customerId) {
      const confirmDelete = confirm('Are you sure you want to delete this customer?');
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:3000/crm/customers/${customerId}`);
          this.customers = this.customers.filter(customer => customer.id !== customerId);
          this.originalCustomers = this.originalCustomers.filter(customer => customer.id !== customerId); // Update original list
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      }
    }
  },
  created() {
    this.fetchCustomers();
  }
};
</script>

<style>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .create-button {
    padding: 8px 24px;
    background-color: #059669;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .create-button:hover {
    background-color: #047857;
  }
  
  .container {
    padding: 24px;
    background-color: #f8fafc;
    min-height: 100vh;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #065f46;
    margin: 0; /* Modified to remove bottom margin since it's handled by header-container */
  }
  
  .search-container {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
  }
  
  .search-input {
    flex-grow: 1;
    padding: 8px 16px;
    border: 1px solid #a7f3d0;
    border-radius: 8px;
    font-size: 14px;
  }
  
  .search-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(6, 95, 70, 0.2);
  }
  
  .search-button {
    padding: 8px 24px;
    background-color: #059669;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .search-button:hover {
    background-color: #047857;
  }
  
  .table-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    background-color: #ecfdf5;
    color: #065f46;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    padding: 12px 24px;
    border-bottom: 1px solid #a7f3d0;
  }
  
  td {
    padding: 16px 24px;
    font-size: 14px;
    color: #1f2937;
    border-bottom: 1px solid #ecfdf5;
  }
  
  tr:hover {
    background-color: #f0fdf4;
  }
  
  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-active {
    background-color: #dcfce7;
    color: #166534;
  }
  
  .status-pending {
    background-color: #fef9c3;
    color: #854d0e;
  }
  
  .status-inactive {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .edit-button {
    padding: 4px 8px;
    background-color: #1d4ed8; /* Blue color for edit button */
    color: white;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .edit-button:hover {
    background-color: #1e40af; /* Darker blue on hover */
  }

  .delete-button {
    padding: 4px 8px;
    background-color: #dc2626; /* Red color for delete button */
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;
    margin-left: 2px;
  }

  .delete-button:hover {
    background-color: #b91c1c; /* Darker red on hover */
  }
</style>
