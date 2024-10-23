// Predefined login credentials
const predefinedUsername = "admin";
const predefinedPassword = "password123";

// Check if on the login page
if (document.getElementById('login-btn')) {
    document.getElementById('login-btn').addEventListener('click', function () {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (username === predefinedUsername && password === predefinedPassword) {
            // Set a flag to indicate successful login
            localStorage.setItem('loggedIn', 'true');
            // Redirect to the password manager page
            window.location.href = 'manager.html';
        } else {
            document.getElementById('login-result').textContent = 'Invalid username or password';
            document.getElementById('login-result').style.color = 'red';
        }
    });
}

// Check if on the password manager page
if (document.getElementById('save-password-btn')) {
    // Ensure the user is logged in
    if (localStorage.getItem('loggedIn') !== 'true') {
        alert('You must log in first.');
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }

    // Save password logic
    document.getElementById('save-password-btn').addEventListener('click', function () {
        const service = document.getElementById('service').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const masterPassword = document.getElementById('master-password').value;

        if (!service || !username || !password || !masterPassword) {
            alert('Please fill in all fields.');
            return;
        }

        const encryptedPassword = btoa(masterPassword + password); // Simple encryption
        localStorage.setItem(service, JSON.stringify({ username, password: encryptedPassword }));
        alert('Password saved successfully!');
    });

    // Retrieve password logic
    document.getElementById('retrieve-password-btn').addEventListener('click', function () {
        const service = document.getElementById('retrieve-service').value;
        const masterPassword = document.getElementById('retrieve-master-password').value;

        const storedData = JSON.parse(localStorage.getItem(service));
        if (!storedData) {
            document.getElementById('result').textContent = 'Service not found';
            return;
        }

        const decryptedPassword = atob(storedData.password);
        if (decryptedPassword.startsWith(masterPassword)) {
            document.getElementById('result').textContent = `Username: ${storedData.username}, Password: ${decryptedPassword.slice(masterPassword.length)}`;
        } else {
            document.getElementById('result').textContent = 'Incorrect master password';
        }
    });

    // Delete password logic
    document.getElementById('delete-password-btn').addEventListener('click', function () {
        const service = document.getElementById('delete-service').value;
        localStorage.removeItem(service);
        alert('Password deleted successfully!');
    });
}
