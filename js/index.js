// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const greetingButton = document.getElementById("greetingButton");
  const greetingMessage = document.getElementById("greetingMessage");

  // Add an event listener to the button
  greetingButton.addEventListener("click", function () {
    // Change the text of the greetingMessage when the button is clicked
    greetingMessage.textContent = "Hello, welcome to my website!";
  });
});
