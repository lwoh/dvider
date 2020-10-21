var stateKey = 'spotify_auth_state';

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

 /**
         * Obtains parameters from the hash of the URL
         * @return Object
*/
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
};

var arrName = ["Playlist 1", "Playlist 2", "Playlist 3"];
var arrDesc = ["Desc 1", "Desc 2", "Desc 3"];

function populatePlaylist(arrName, arrDesc)
{
  var strHash = "#"
  var listPlaylist = document.getElementById("list-playlist");

  for (var i = 0; i < arrName.length; i++) 
  {
     var a = document.createElement("a");
     a.setAttribute("href", "#");
     a.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start active");

     var div = document.createElement("div");
     div.setAttribute("class", "d-flex w-100 justify-content-between");
    
     var count = document.createElement("small");
     count.innerHTML = strHash + i;
     
     var hTitle = document.createElement("h5");
     hTitle.setAttribute("class", "mb-1");
     hTitle.innerHTML = arrName[i];
     
     var pDesc = document.createElement("p");
     pDesc.setAttribute("class", "mb-1");
     pDesc.innerHTML = arrDesc[i];

     var addInfo = document.createElement("small"); 
     addInfo.innerHTML = "additional info";
    
     a.appendChild(div);
     div.appendChild(count);
     div.appendChild(hTitle);
     
     a.appendChild(pDesc);
     a.appendChild(addInfo);   

     listPlaylist.appendChild(a);	 
  }
};

$(document).ready(function(){
  var params = getHashParams();
  var access_token = params.access_token;
    
  if (access_token)
  {
    var state = params.state;
    var storedState = localStorage.getItem(stateKey);
    
	if (state == null || state !== storedState) {
      alert('There was an error during the authentication');
    } 
	else {
	  localStorage.removeItem(stateKey);
      
	  $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
             'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
        //userProfilePlaceholder.innerHTML = userProfileTemplate(response);
        
		$("#main-jumbotron").hide();
		$("#main-home-left").show();
	    $("#main-home-right").show();
        //$("#btn-login").hide();
		
		//$("#nav-home").show();
	    //$("#nav-player").show();
	    //$("#nav-profile").show();
		
        //$('#loggedin').show();
		//console.log('A')
        }
      });
    }
  }
  else
  {
    $("#main-jumbotron").show();
	$("#main-home-left").hide();
	$("#main-home-right").hide();
	
	//populatePlaylist(arrName, arrDesc);
    //$("#nav-home").hide();
	//$("#nav-player").hide();
	//$("#nav-profile").hide();
  }
    $("#btn-login").click(function(){
	//document.getElementById('login-button').addEventListener('click', function() {

      var client_id = 'fa4b3d7996a14a72985e572a258ebdcf'; // Your client id
      var redirect_uri = 'https://lwoh.github.io/dvider/'; // Your redirect uri

      var state = generateRandomString(16);
      localStorage.setItem(stateKey, state);
		
	  var scope = 'user-read-private user-read-email';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?client_id=' + encodeURIComponent(client_id);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
	  url += '&scope=' + encodeURIComponent(scope); 
	  url += '&response_type=token';		
	  url += '&state=' + encodeURIComponent(state);   
        
      window.location = url;
	});	
    //}, false);
 });
 
