// Fetch the unique ID from the URL
const urlParams = window.location.pathname.split('/').filter(Boolean);
const uniqueId = urlParams[0];  // Assuming URL is like /<id>

// Check if a key exists for this ID in localStorage
const keyElement = document.getElementById("key");

function checkIfKeyExists() {
    // Check if the key exists for the given ID
    const storedKey = localStorage.getItem(uniqueId);
    const expirationTime = localStorage.getItem(`${uniqueId}_expiration`);

    // If the key exists and has not expired, display it
    if (storedKey && Date.now() < expirationTime) {
        keyElement.innerHTML = `Your key is: ${storedKey}`;
        document.getElementById("generate-btn").style.display = "none";  // Hide button if key exists
    } else if (storedKey && Date.now() >= expirationTime) {
        // If the key has expired, show expiration message
        localStorage.removeItem(uniqueId);
        localStorage.removeItem(`${uniqueId}_expiration`);
        keyElement.innerHTML = 'This key has expired.';
        document.getElementById("generate-btn").style.display = "inline-block";  // Show the button again
    } else {
        // No key exists, show button to generate a new key
        document.getElementById("generate-btn").style.display = "inline-block";
    }
}

// Generate and store the key
function generateKey() {
    const newKey = generateRandomKey();  // Function to generate a random key
    const expirationTime = Date.now() + 86400000;  // Set expiration to 1 day (86400000 ms)
    
    // Store the key and expiration time in localStorage
    localStorage.setItem(uniqueId, newKey);
    localStorage.setItem(`${uniqueId}_expiration`, expirationTime);

    // Display the generated key
    keyElement.innerHTML = `Your key is: ${newKey}`;

    // Hide the generate button
    document.getElementById("generate-btn").style.display = "none";
}

// Generate a random key
function generateRandomKey() {
    return 'key' + Math.floor(Math.random() * 10000000000);  // Random key example
}

// Run this function when the page loads to check if a key already exists
window.onload = function () {
    checkIfKeyExists();
};
