/*
 * Main Object Wrapper for API
 */
var githubAPI = {
    /*
     * Gets the username from input and sends a get request to github API
     */
    fetch: function() {
        // Get username value from input
        var username = document.getElementById('username').value;

        // Build URL from input
        var url = 'https://api.github.com/users/' + username + '/repos';

        // Initialize new XMLHttpRequest
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();

        // Open and send the request
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);

        // Try to parse response as json object
        try {
            var repos = JSON.parse(xmlHttp.responseText);
        } catch (e) {
            // Output error if response cannot be parsed
            alert('Something went wrong with the request.');
        }

        // Call render function
        this.render(repos);
    },

    /*
     * Renders list of Github repos for user
     * @param array repos Array of repos fetched from Github
     */
    render: function(repos) {
        var ul = document.getElementById('repos');

        // Remove any exisiting list elements
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        // Loop through and add a link to each repo
        for (var i=0; i < repos.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = '<a href="' + repos[i].html_url + '">' + repos[i].name + '</a>';
            ul.appendChild(li);
        }
    }
};