document.addEventListener('DOMContentLoaded', function() {
  const posts = document.querySelectorAll('.post');

  posts.forEach(function(post) {
    post.addEventListener('click', function() {
      // get the post ID from the data attribute
      const postId = post.getAttribute('data-post-id');

      // construct the URL for redirection
      window.location.href = '/post/' + postId;
    });
  });
});
