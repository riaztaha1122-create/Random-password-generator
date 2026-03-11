const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Signup
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const message = document.getElementById('signupMessage');

    if (!name || !email || !password) {
        message.textContent = 'All fields are required!';
        return;
    }
    if (!validateEmail(email)) {
        message.textContent = 'Invalid email format!';
        return;
    }
    if (password.length < 6) {
        message.textContent = 'Password must be at least 6 characters!';
        return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        message.textContent = 'Email already registered!';
        return;
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    message.style.color = 'green';
    message.textContent = 'Signup successful! You can now sign in.';
    signupForm.reset();
});


// Login
const loginForm = document.getElementById('loginForm');
const welcomeScreen = document.getElementById('welcomeScreen');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');
    const rememberMe = document.getElementById('rememberMe').checked;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        message.style.color = 'green';
        message.textContent = `Welcome, ${user.name}!`;
        loginForm.reset();
        // Show welcome screen
        welcomeUser.textContent = user.name;
        document.querySelector('.container').style.display = 'none';
        welcomeScreen.style.display = 'flex';
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('rememberedUser');
        }
    } else {
        message.style.color = '#ff4b2b';
        message.textContent = 'Invalid email or password!';
    }
});

// Show password toggle
const togglePassword = document.getElementById('togglePassword');
const loginPassword = document.getElementById('loginPassword');
togglePassword.addEventListener('click', function() {
    if (loginPassword.type === 'password') {
        loginPassword.type = 'text';
        togglePassword.textContent = 'Hide';
    } else {
        loginPassword.type = 'password';
        togglePassword.textContent = 'Show';
    }
});

// Log out
logoutBtn.addEventListener('click', function() {
    welcomeScreen.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});

// Remembered user auto-login
window.addEventListener('DOMContentLoaded', function() {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        const user = JSON.parse(remembered);
        welcomeUser.textContent = user.name;
        document.querySelector('.container').style.display = 'none';
        welcomeScreen.style.display = 'flex';
    }
});

// Forgot password (demo only)
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    alert('For demo: Please sign up again with a new password.');
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}
