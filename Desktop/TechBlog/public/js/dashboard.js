// dashboard.js
document.querySelector('.new-post-btn').addEventListener('click', () => {
    document.querySelector('.new-post-form-container').style.display = 'block';
});
  
  document.querySelector('#new-post-form').addEventListener('submit', (event) => {
    event.preventDefault();
    // Add code to handle form submission and create a new post
    const title = document.querySelector('input[name="title"]').value;
    const text = document.querySelector('textarea[name="text"]').value;
    // Use fetch or AJAX to send the form data to the server and create a new post
    // After successful creation, you can redirect the user or update the UI as needed
});
  