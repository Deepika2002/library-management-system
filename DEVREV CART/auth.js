// auth.js
// Initialize Firebase with your project's config

const firebaseConfig = {
    apiKey: "AIzaSyBJHV8JQSg0yC6r3y17SrXDljhezvcZsDI",
    authDomain: "library-management-syste-c0fda.firebaseapp.com",
    projectId: "library-management-syste-c0fda",
    storageBucket: "library-management-syste-c0fda.appspot.com",
    messagingSenderId: "27958292709",
    appId: "1:27958292709:web:b585cd3afe0102ef52640c",
    measurementId: "G-YKKWPETE8E"
};

firebase.initializeApp(firebaseConfig);

// Add an event listener to the login form
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('Logged in as:', user.displayName || user.email);
            // Redirect to the dashboard or another page after successful login
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error:', error.message);
            // Handle login error, display an error message
        }
    });
});
