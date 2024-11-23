const urlParams = window.location.pathname.split('/').filter(Boolean);
const uniqueId = urlParams[0];  // Get unique ID from URL

const keyElement = document.getElementById("key");
const generateBtn = document.getElementById("generate-btn");
const completeTaskBtn = document.getElementById("complete-task-btn");
const taskInstruction = document.getElementById("task-instruction");

// Lootlabs URL
const lootlabsUrl = "https://lootdest.org/s?21e4561c";

// Check if the user has completed the Lootlabs task
function checkIfTaskCompleted() {
    const taskCompleted = localStorage.getItem(`${uniqueId}_taskCompleted`);
    
    if (taskCompleted) {
        // If the task is completed, show the button to generate key
        taskInstruction.innerHTML = "Task completed! You can now generate your key.";
        completeTaskBtn.style.display = "none";
        generateBtn.style.display = "inline-block";
    } else {
        taskInstruction.innerHTML = "Complete the task to generate your key.";
        completeTaskBtn.style.display = "inline-block";
        generateBtn.style.display = "none";
    }
}

// Redirect user to Lootlabs page
function redirectToLootlabs() {
    // Store task completion status in localStorage
    window.location.href = lootlabsUrl;
}

// Mark the task as completed
function completeTask() {
    localStorage.setItem(`${uniqueId}_taskCompleted`, "true");
    checkIfTaskCompleted(); // Recheck task status
}

// Generate a key and display it
function generateKey() {
    const newKey = generateRandomKey();
    const expirationTime = Date.now() + 86400000;  // Key expires in 1 day
    
    // Store the key and expiration time
    localStorage.setItem(uniqueId, newKey);
    localStorage.setItem(`${uniqueId}_expiration`, expirationTime);

    // Display the key
    keyElement.innerHTML = `Your key is: ${newKey}`;
    generateBtn.style.display = "none";  // Hide the generate button after use
}

// Generate a random key
function generateRandomKey() {
    return 'key' + Math.floor(Math.random() * 10000000000);
}

// Check if the task has been completed on page load
window.onload = function () {
    checkIfTaskCompleted();
};
