<template>
    <div class="customer-detail-container" v-if="customer">
        <h2>Customer Details</h2>
        <div class="detail">
            <strong>Company Name:</strong> {{ customer.companyName }}
        </div>
        <div class="detail">
            <strong>Email:</strong> {{ customer.email }}
        </div>
        <div class="detail">
            <strong>Phone:</strong> {{ customer.phone }}
        </div>
        <div class="detail">
            <strong>Status:</strong>
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
        </div>
        <router-link :to="`/customers/edit/${customer.id}`" class="edit-button">Edit Customer</router-link>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const customer = ref(null);

        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/crm/customers/${route.params.id}`);
                customer.value = response.data;
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };

        onMounted(fetchCustomer);

        return {
            customer
        };
    }
};
</script>

<style>
.customer-detail-container {
    padding: 24px;
    background-color: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detail {
    margin-bottom: 16px;
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
    display: inline-block;
    padding: 8px 16px;
    background-color: #059669;
    color: white;
    border-radius: 4px;
    text-decoration: none;
}

.edit-button:hover {
    background-color: #047857;
}
</style>
