<template>
    <div class="edit-customer-container">
        <h2>Edit Customer</h2>
        <form @submit.prevent="updateCustomer">
            <div class="form-group">
                <label for="companyName">Company Name</label>
                <input
                    type="text"
                    id="companyName"
                    v-model="customer.companyName"
                    required
                />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="customer.email"
                    required
                />
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    v-model="customer.phone"
                    required
                />
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" v-model="customer.status">
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <button type="submit" class="submit-button">Update Customer</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const customer = ref({
            companyName: '',
            email: '',
            phone: '',
            status: ''
        });

        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/crm/customers/${route.params.id}`);
                customer.value = response.data;
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        const updateCustomer = async () => {
            try {
                await axios.put(`http://localhost:3000/crm/customer/${route.params.id}`, customer.value);
                router.push('/customers'); // Redirect after update
            } catch (error) {
                console.error('Error updating customer:', error);
            }
        };

        onMounted(fetchCustomer);

        return {
            customer,
            updateCustomer
        };
    }
};
</script>

<style>
.edit-customer-container {
    padding: 24px;
    background-color: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 16px;
}

.submit-button {
    padding: 8px 16px;
    background-color: #059669;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #047857;
}
</style>
