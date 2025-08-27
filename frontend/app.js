// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

// Content sections
const publicContent = document.getElementById('public-content');
const protectedContent = document.getElementById('protected-content');
const adminContent = document.getElementById('admin-content');
const managerContent = document.getElementById('manager-content');

// Navigation links
const homeLink = document.getElementById('home-link');
const publicLink = document.getElementById('public-link');
const protectedLink = document.getElementById('protected-link');
const adminLink = document.getElementById('admin-link');
const managerLink = document.getElementById('manager-link');

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        // User is logged in, show dashboard
        showDashboard();
        loadUserInfo();
    } else {
        // User is not logged in, show login form
        showLogin();
    }
});

// Show login form
function showLogin() {
    loginSection.classList.remove('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    hideAllContentSections();
    clearActiveNav();
}

// Show register form
function showRegister() {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    hideAllContentSections();
    clearActiveNav();
}

// Show dashboard
function showDashboard() {
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    hideAllContentSections();
    clearActiveNav();
    homeLink.classList.add('active');
}

// Hide all content sections
function hideAllContentSections() {
    publicContent.classList.add('hidden');
    protectedContent.classList.add('hidden');
    adminContent.classList.add('hidden');
    managerContent.classList.add('hidden');
}

// Clear active nav
function clearActiveNav() {
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => link.classList.remove('active'));
}

// Load user info
async function loadUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayUserInfo(data.user);
            updateNavBasedOnRole(data.user.role);
        } else {
            // Token might be invalid, logout user
            logout();
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

// Display user info
function displayUserInfo(user) {
    userInfo.innerHTML = `
        <span>Welcome, ${user.username} 
            <span class="role-badge role-${user.role}">${user.role.toUpperCase()}</span>
        </span>
        <button id="logout-btn" style="margin-left: 10px;">Logout</button>
    `;
    
    // Add event listener to the new logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
}

// Update navigation based on user role
function updateNavBasedOnRole(role) {
    // Always show these links
    homeLink.style.display = 'block';
    publicLink.style.display = 'block';
    protectedLink.style.display = 'block';
    
    // Show/hide admin link based on role
    if (role === 'admin') {
        adminLink.style.display = 'block';
        managerLink.style.display = 'block';
    } else if (role === 'manager') {
        adminLink.style.display = 'none';
        managerLink.style.display = 'block';
    } else {
        adminLink.style.display = 'none';
        managerLink.style.display = 'none';
    }
}

// Login function
async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            
            // Show success message
            showMessage('Login successful!', 'success');
            
            // Show dashboard
            showDashboard();
            displayUserInfo(data.user);
            updateNavBasedOnRole(data.user.role);
        } else {
            // Show error message
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('An error occurred during login', 'error');
    }
}

// Register function
async function register(username, email, password, role) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            
            // Show success message
            showMessage('Registration successful!', 'success');
            
            // Show dashboard
            showDashboard();
            displayUserInfo(data.user);
            updateNavBasedOnRole(data.user.role);
        } else {
            // Show error message
            showMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('An error occurred during registration', 'error');
    }
}

// Logout function
function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Clear user info
    userInfo.innerHTML = '';
    
    // Show login form
    showLogin();
    
    // Show success message
    showMessage('You have been logged out', 'success');
}

// Show message
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Insert message before the first section
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.parentNode.insertBefore(messageElement, firstSection);
    } else {
        document.querySelector('main').prepend(messageElement);
    }
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Fetch public content
async function fetchPublicContent() {
    try {
        const response = await fetch(`${API_BASE_URL}/users/public`);
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('public-data').innerHTML = `
                <p>${data.message}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching public content:', error);
        document.getElementById('public-data').innerHTML = '<p>Error loading content</p>';
    }
}

// Fetch protected content
async function fetchProtectedContent() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('protected-data').innerHTML = '<p>You need to be logged in to view this content</p>';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/protected`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('protected-data').innerHTML = `
                <p>${data.message}</p>
                <p><strong>User:</strong> ${data.user.username}</p>
                <p><strong>Role:</strong> ${data.user.role}</p>
            `;
        } else {
            document.getElementById('protected-data').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching protected content:', error);
        document.getElementById('protected-data').innerHTML = '<p>Error loading content</p>';
    }
}

// Fetch admin content
async function fetchAdminContent() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('admin-data').innerHTML = '<p>You need to be logged in to view this content</p>';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/admin`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('admin-data').innerHTML = `
                <p>${data.message}</p>
                <p><strong>User:</strong> ${data.user.username}</p>
                <p><strong>Role:</strong> ${data.user.role}</p>
            `;
        } else {
            document.getElementById('admin-data').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching admin content:', error);
        document.getElementById('admin-data').innerHTML = '<p>Error loading content</p>';
    }
}

// Fetch manager content
async function fetchManagerContent() {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('manager-data').innerHTML = '<p>You need to be logged in to view this content</p>';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/manager`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('manager-data').innerHTML = `
                <p>${data.message}</p>
                <p><strong>User:</strong> ${data.user.username}</p>
                <p><strong>Role:</strong> ${data.user.role}</p>
            `;
        } else {
            document.getElementById('manager-data').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching manager content:', error);
        document.getElementById('manager-data').innerHTML = '<p>Error loading content</p>';
    }
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;
    register(username, email, password, role);
});

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegister();
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLogin();
});

// Navigation event listeners
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
    clearActiveNav();
    homeLink.classList.add('active');
});

publicLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
    hideAllContentSections();
    publicContent.classList.remove('hidden');
    clearActiveNav();
    publicLink.classList.add('active');
    fetchPublicContent();
});

protectedLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
    hideAllContentSections();
    protectedContent.classList.remove('hidden');
    clearActiveNav();
    protectedLink.classList.add('active');
    fetchProtectedContent();
});

adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
    hideAllContentSections();
    adminContent.classList.remove('hidden');
    clearActiveNav();
    adminLink.classList.add('active');
    fetchAdminContent();
});

managerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
    hideAllContentSections();
    managerContent.classList.remove('hidden');
    clearActiveNav();
    managerLink.classList.add('active');
    fetchManagerContent();
});