// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const greetingButton = document.getElementById("greetingButton");
  const greetingMessage = document.getElementById("greetingMessage");

  // Function to generate a random key (e.g., alphanumeric string)
  function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const keyLength = 16; // Length of the random key

    for (let i = 0; i < keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  // Add an event listener to the button
  greetingButton.addEventListener("click", function () {
    // Generate a random key and display it in the greetingMessage paragraph
    const randomKey = generateRandomKey();
    greetingMessage.textContent = "Generated Key: " + randomKey;
  });
});
