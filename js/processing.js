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

var params = getHashParams();

var access_token = params.access_token,
state = params.state,
storedState = localStorage.getItem(stateKey);

 if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication');
} else {
	localStorage.removeItem(stateKey);
    if (access_token) {
	    $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
            //userProfilePlaceholder.innerHTML = userProfileTemplate(response);

            //$('#login').hide();
            //$('#loggedin').show();
		    //console.log('A')
            }
        });
} else {
    console.log('B')
    //$('#login').show();
    //$('#loggedin').hide();
}
		  
//document.getElementById('btn-login').addEventListener('click', function() {
$(document).ready(function() 
{
    $("#btn-login").click(function(){
        var client_id = 'fa4b3d7996a14a72985e572a258ebdcf'; // Your client id
        var redirect_uri = 'https://lwoh.github.io/dvider/'; // Your redirect uri

        var state = generateRandomString(16);
        localStorage.setItem(stateKey, state);
		
        var scope = 'user-read-private user-read-email';

        var url = 'https://accounts.spotify.com/authorize';
	    url += '?response_type=token'; 
		url += '&client_id=' + encodeURIComponent(client_id);               
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
		url += '&state=' + encodeURIComponent(state);
        url += '&scope=' + encodeURIComponent(scope);        
        
        window.location = url;
    }), false
});
 
};
