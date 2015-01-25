#
# Main Object Wrapper for API
#
githubAPI =

  #
  # Gets the username from input and sends a get request to github API
  #
  fetch: ->

    # Get username value from input
    username = document.getElementById("username").value

    # Build URL from input
    url = "https://api.github.com/users/" + username + "/repos"

    # Initialize new XMLHttpRequest
    xmlHttp = null
    xmlHttp = new XMLHttpRequest()

    # Open and send the request
    xmlHttp.open "GET", url, false
    xmlHttp.send null

    # Try to parse response as json object
    try
      repos = JSON.parse(xmlHttp.responseText)
    catch e

      # Output error if response cannot be parsed
      alert "Something went wrong with the request."

    # Call render function
    @render repos
    return


  #
  # Renders list of Github repos for user
  # @param array repos Array of repos fetched from Github
  #
  render: (repos) ->
    ul = document.getElementById("repos")

    # Remove any exisiting list elements
    ul.removeChild ul.firstChild  while ul.firstChild

    # Loop through and add a link to each repo
    i = 0

    while i < repos.length
      li = document.createElement("li")
      li.innerHTML = "<a href=\"" + repos[i].html_url + "\">" + repos[i].name + "</a>"
      ul.appendChild li
      i++
    return

  addClickHandler: (event) ->
    # Get button element
    getRepos = document.getElementById("get-repos")

    # Add click event listener
    getRepos.addEventListener "click", (event) ->
      githubAPI.fetch()
      return

# Add load event listener
window.addEventListener "load", (event) ->
  githubAPI.addClickHandler()
