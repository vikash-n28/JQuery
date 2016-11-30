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
		     var urlName = [];
		  $.each(data, function(k,v) {
			 
			 urlName[k] = v.team_img_url;
		  });
          $("img.images").attr("src", urlName[Math.floor(Math.random() * urlName.length)]).slideDown(fast);

		//   $('.jumbImg').css('background-image', 'url('+urlName[Math.floor(Math.random() * urlName.length)]+ ')'); 
          
	});

        
     

});