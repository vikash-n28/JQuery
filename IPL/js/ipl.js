$(function () {


	var allTeams = [];

	function retriveData(callback) {
		$.getJSON("ipl2016_JSON.json", function (data) {
			allTeams = data;
			callback(allTeams);	
		});
	}

    retriveData(function (data) {
		     // Manually trigger a hashchange to start the app.
			$(window).trigger('hashchange');     
	});


	 //event handler with call the display function on every hashchange
	 //display function the accurate content of out page
	$(window).on('hashchange', function () {
		display(decodeURI(window.location.hash));
	});

     
     //function image to display image in HomePage
    function displayJumbotron() {
		      var urlName = [];
			  console.log(urlName);
		      $.each(allTeams, function(k,v) {
			  urlName[k] = v.team_img_url;
		  });
		  
		      $('ul.homologo').append("<li ")
            //  $('img.logoimages').append('src', 'urlName');
			     //[Math.floor(Math.random() * urlName.length)]  
	            // setTimeout(displayJumbotron, 1000);
		  
	}

     


	 //navigation
	function display(url) {

		//getting keyword from the url.
		var temp = url.split('/')[0];

		var map = {

			 //homepage
			'': function() {
                  	displayJumbotron();	
			},

             //use to load team page on event click
			'#teams': function() {
					mypromise().then(function(){
						getAllTeamHTML(allTeams);
					})
				     
					
			},

			'#players': function() {
					var index = url.split('#players/')[1].trim();
					mypromise2().then(function(){
						generateAllPlayer(allTeams, index);
					})
					
			},

			'#gallery': function() {
				     getGallery(allTeams);
			}
		};

		//Executed the needed function depending on url stored in the temp
		if (map[temp]) {
			map[temp]();
		 } 
		 else {
			displayErrorPage;
		 }
	}


    // function to display all Team 
	function getAllTeamHTML(data) {
		var list1 = $('.all-team .team-list');
        
		var theTemplateScript1 = $("#team-template").html();

		//Compile the template​
		var theTemplate1 = Handlebars.compile(theTemplateScript1);
		list1.append(theTemplate1(data));
        

		// Each teams has a data-index attribute.
		// On click change the url hash to open up a preview for this team only.
		// Remember: every hashchange triggers the display function.
		list1.find('li').on('click', function (e) {
			e.preventDefault();
        
			var teamIndex = $(this).data('index');
			window.location.hash = 'players/' + teamIndex;
		});
	}


       // function to display all Player of a team
	function generateAllPlayer(data,index) {
		var list2 = $('.all-player .player-list');

		
		$.each(data,function(key,value){
			if(index==value.id){
				var theTemplateScript2 = $("#player-template").html();

		var theTemplate2 = Handlebars.compile(theTemplateScript2);
		list2.append(theTemplate2(value.team_players));
		
			}
		})
		

		list2.find('.player-pic').on('click', function (e) {
			e.preventDefault();

			var playerIndec = $(this).data('index');
            window.location.hash = 'profile/' + teamIndex;
		});
	}

});

function mypromise() {
	return new Promise(function(resolve, reject) {
		$('.display-team').load("teamDetails.html", ".all-team",function(){
			resolve();
		})
	})
}
function mypromise2() {
	return new Promise(function(resolve, reject) {
		$('.display-team').load("teamDetails.html", ".all-player",function(){
			resolve();
		})
	})
}
