<template>
  <div class="home">
    <div class="auth-header">
      <template v-if="isAuthenticated">
        <div class="user-info">
          <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
          <span class="user-role">{{ user.role }}</span>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </div>
      </template>
      <template v-else>
        <div class="auth-buttons">
          <router-link to="/login" class="auth-btn">Log In</router-link>
          <router-link to="/signup" class="auth-btn">Sign Up</router-link>
        </div>
      </template>
    </div>

    <!-- Existing content -->
    <img alt="Sahihi Interior Builders Logo" src="../assets/bingwa.webp" class="logo">
    <h1>Welcome to Sahihi Interior Builders</h1>
    <p>Our company specializes in delivering high-quality interior design solutions tailored to your needs.</p>
  </div>
</template>


<script>
export default {
  name: 'HomeView',
  data() {
    return {
      isAuthenticated: false,
      user: {
        name: '',
        role: ''
      }
    }
  },
  created() {
    // Check authentication status when component is created
    this.checkAuthStatus();
  },
  methods: {
    checkAuthStatus() {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.isAuthenticated = true;
        this.user = JSON.parse(userData);
      } else {
        this.isAuthenticated = false;
      }
    },
    handleLogout() {
      localStorage.removeItem('user');
      this.isAuthenticated = false;
      this.user = { name: '', role: '' };
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  position: relative;
}

.auth-header {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-weight: bold;
  color: #333;
}

.user-role {
  color: #666;
  font-size: 0.9em;
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
}

.logout-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #cc0000;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-btn {
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 5px 15px;
  border-radius: 4px;
}

.auth-btn:hover {
  background-color: #45a049;
}

/* Existing styles */
.logo {
  width: 500px;
  margin-bottom: 20px;
}

h1 {
  color: #4CAF50;
}

h2 {
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

.nav-link {
  color: #4CAF50;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

p {
  margin: 10px 0;
  color: #555;
}
</style>