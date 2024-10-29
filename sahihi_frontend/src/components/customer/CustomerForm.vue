<template>
    <div class="form-container">
        <h2 class="form-title">Add/Edit Customer</h2>
        <form @submit.prevent="saveCustomer" class="customer-form">
            <div class="form-group">
                <label for="companyName">Company Name</label>
                <input 
                    id="companyName"
                    v-model="customer.companyName" 
                    placeholder="Enter company name" 
                    required 
                    class="form-input"
                />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input 
                    id="email"
                    v-model="customer.email" 
                    placeholder="Enter email address" 
                    type="email" 
                    required 
                    class="form-input"
                />
            </div>

            <div class="form-group">
                <label for="phone">Phone</label>
                <input 
                    id="phone"
                    v-model="customer.phone" 
                    placeholder="Enter phone number" 
                    required 
                    class="form-input"
                />
            </div>

            <div class="form-group">
                <label for="status">Status</label>
                <select 
                    id="status"
                    v-model="customer.status" 
                    required 
                    class="form-input"
                >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <button type="submit" class="submit-button">
                {{ customer.id ? 'Update Customer' : 'Add Customer' }}
            </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            customer: {
                companyName: '',
                email: '',
                phone: '',
                status: ''
            }
        };
    },
    methods: {
        async saveCustomer() {
            try {
                if (this.customer.id) {
                    await axios.put(`http://localhost:3000/crm/customer/${this.customer.id}`, this.customer);
                } else {
                    await axios.post('http://localhost:3000/crm/customer', this.customer);
                }
                
                // Redirect to customers list page
                this.$router.push('/customers');
                
            } catch (error) {
                console.error('Error saving customer:', error);
                // You might want to add error handling here
            }
        }
    }
};
</script>


<style>
.form-container {
    padding: 24px;
    background-color: #f8fafc;
    min-height: 100vh;
}

.form-title {
    font-size: 24px;
    font-weight: 600;
    color: #065f46;
    margin-bottom: 24px;
}

.customer-form {
    background-color: white;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #065f46;
}

.form-input {
    width: 100%;
    padding: 8px 16px;
    border: 1px solid #a7f3d0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
}

.form-input:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 2px rgba(6, 95, 70, 0.2);
}

.form-input::placeholder {
    color: #94a3b8;
}

select.form-input {
    background-color: white;
    cursor: pointer;
}

.submit-button {
    width: 100%;
    padding: 12px 24px;
    background-color: #059669;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 12px;
}

.submit-button:hover {
    background-color: #047857;
}

.submit-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(6, 95, 70, 0.2);
}

.form-input:invalid:focus {
    box-shadow: 0 0 0 2px rgba(248, 113, 113, 0.2);
}
</style>