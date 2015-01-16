/*
 * Main Object Wrapper for API
 */
var githubAPI = {
  /*
   * Gets the username from input and sends a get request to github API
   */
  fetch: function() {
    // Save reference to this
    var self = this;

    // Get username value from input
    var username = $('#username').val();

    // Build URL from input
    var url = 'https://api.github.com/users/' + username + '/repos';

    // Get JSON from URL
    $.getJSON(url, function(repos){
      // Call render function
      self.render(repos);
    });
  },

  /*
   * Renders list of Github repos for user
   * @param array repos Array of repos fetched from Github
   */
  render: function(repos) {
    // Select repos ul
    var ul = $('#repos');

    // Remove any exisiting list elements
    ul.empty();

    // Loop through and add a link to each repo
    $.each(repos, function(key, repo) {
      ul.append('<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>');
    });
  }
};

// On document ready
$(document).ready(function() {
  // Add button click handler
  $('#submitUsername').click(function() {
    githubAPI.fetch();
  });
});
