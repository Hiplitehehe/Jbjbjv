// This function is triggered when the button is clicked
function generateKey() {
    const key = generateRandomKey();  // Function to generate a random key
    const keyElement = document.getElementById("key");
    
    // Store the generated key in the localStorage so it's persistent
    localStorage.setItem('generatedKey', key);

    // Display the generated key
    keyElement.innerHTML = `Your key is: ${key}`;

    // Hide the button after generating the key
    document.getElementById("generate-btn").style.display = "none";

    // Set expiration time for the key (e.g., 1 day = 86400000 ms)
    const expirationTime = Date.now() + 86400000;  // 24 hours in ms
    localStorage.setItem('keyExpiration', expirationTime);

    // Optionally, check expiration and clear key if expired after reload
    setInterval(checkExpiration, 1000);
}

// Generate a random key (this is just an example of a random key)
function generateRandomKey() {
    return 'key' + Math.floor(Math.random() * 10000000000);  // Random key example
}

// Check if the key has expired
function checkExpiration() {
    const expirationTime = localStorage.getItem('keyExpiration');
    const currentTime = Date.now();

    if (currentTime > expirationTime) {
        localStorage.removeItem('generatedKey');
        localStorage.removeItem('keyExpiration');
        document.getElementById('key').innerHTML = 'This key has expired.';
        document.getElementById("generate-btn").style.display = "inline-block";
    }
}

// Check if the key exists in localStorage on page load
window.onload = function () {
    const storedKey = localStorage.getItem('generatedKey');
    if (storedKey) {
        document.getElementById('key').innerHTML = `Your key is: ${storedKey}`;
        document.getElementById("generate-btn").style.display = "none";  // Hide button if key exists
    }
};
