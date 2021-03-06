// Generated by CoffeeScript 1.8.0
(function() {
  var githubAPI;

  githubAPI = {
    fetch: function() {
      var e, repos, url, username, xmlHttp;
      username = document.getElementById("username").value;
      url = "https://api.github.com/users/" + username + "/repos";
      xmlHttp = null;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", url, false);
      xmlHttp.send(null);
      try {
        repos = JSON.parse(xmlHttp.responseText);
      } catch (_error) {
        e = _error;
        alert("Something went wrong with the request.");
      }
      this.render(repos);
    },
    render: function(repos) {
      var i, li, ul;
      ul = document.getElementById("repos");
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      i = 0;
      while (i < repos.length) {
        li = document.createElement("li");
        li.innerHTML = "<a href=\"" + repos[i].html_url + "\">" + repos[i].name + "</a>";
        ul.appendChild(li);
        i++;
      }
    },
    addClickHandler: function(event) {
      var getRepos;
      getRepos = document.getElementById("get-repos");
      return getRepos.addEventListener("click", function(event) {
        githubAPI.fetch();
      });
    }
  };

  window.addEventListener("load", function(event) {
    return githubAPI.addClickHandler();
  });

}).call(this);
