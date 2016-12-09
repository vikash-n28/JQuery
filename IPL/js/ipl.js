$(function () {


    var allTeams = [];


    //Retrive Data From Firebase
    // function firebaseData(callback) {
    //     var ref = firebase.database().ref();
    //     ref.on("value", function(data) {
    //         allTeams = data.val();
    //         callback(allTeams);
    //     });
    // }

    //Retrive Data from Local JSON
    function retriveData(callback) {
        $.getJSON("ipl2016_JSON.json", function (data) {

            allTeams = data;

            callback(allTeams);
        });

    }

    retriveData(function (data) {
        // Manually trigger a hashchange to start the app.
        // firebaseData(function(data) {
               $(window).trigger('hashchange');
        });
        



    //event handler with call the display function on every hashchange
    //display function the accurate content of out page
    $(window).on('hashchange', function () {
        display(decodeURI(window.location.hash));
    });


    //function image to display image in HomePage
    function displayJumbotron(allTeams) {
        var urlName = [];
        var caption = [];
        var x;
        $.each(allTeams, function (k, v) {
            urlName[k] = v.team_img_url;
            caption[k] = v.team_name;
        });
        $("caption1").text("Team Participations");
        for (x = 0; x < urlName.length; x++) {
            var y = $('.homologo').append("<span><img src = '" + urlName[x] + "'/><br /><span>" + caption[x] + "</span></span>");
        }
        // y.fadeIn(1000) = Math.floor(urlName*Math.random());

    }




    //navigation
    function display(url) {

        //getting keyword from the url.
        var temp = url.split('/')[0];

        var map = {

            //homepage
            '': function () {

                displayJumbotron(allTeams);
            },

            //use to load team page on event click
            '#teams': function () {
                mypromise().then(function () {
                    getAllTeamHTML(allTeams);
                })


            },

            '#players': function () {
                var index = url.split('#players/')[1].trim();
                mypromise2().then(function () {
                    generateAllPlayer(allTeams, index);
                })

            },

            '#gallery': function () {
                getGallery(allTeams);
            }
        };

        //Executed the needed function depending on url stored in the temp
        if (map[temp]) {
            map[temp]();
        } else {
            displayErrorPage;
        }
    }


    // function to display all Team 
    function getAllTeamHTML(data) {
        var list1 = $('.all-teams .team-list');

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
    function generateAllPlayer(data, index) {

        var player = [];
        var disPal = $('.all-players .spaceBar .teamDetails');
        var list = $('.all-players .player-list');

        $.each(data, function (key, value) {
            if (value.id == index) {
                console.log(value);
                $('.spaceBar').css({
                    "background-color": "",
                    "background-image": "url(" + value.team_background + ") no-repeat",
                    "Heigth": "auto",
                    "width": "600"
                });
                disPal.append(
                    "<li class = 'titleTop'><b>Team Name : <b>" + value.team_name + "</li>" +
                    "<li class = 'titleTop'><b>Team Owner : <b>" + value.team_owner + "</li>" +
                    "<li class = 'titleTop'><b>Team Captain : <b>" + value.team_captain + "</li>" +
                    "<li class = 'titleTop'><b>Team Coach : <b>" + value.team_coach + "</li>" +
                    "<li class = 'titleTop'><b>Team Homeground : <b>" + value.team_home_venue + "</li>");

                var theTemplateScript2 = $("#player-template").html();
                player = value.team_players;
                var theTemplate2 = Handlebars.compile(theTemplateScript2);
                list.append(theTemplate2(value.team_players));

            }
        })

        list.find('li').on('click', function (e) {
            e.preventDefault();
            var teamIndex = $(this).data('index');
            var list1 = $('.all-players .player ');
            $.each(player, function (k, v) {
                if (v.id == teamIndex) {
                    var theTemplateScript1 = $("#singTemplate").html();
                    var theTemplate1 = Handlebars.compile(theTemplateScript1);
                    list1.append(theTemplate1(v));
                    console.log(v);
                }
            })

        });

    }

    function mypromise() {
        return new Promise(function (resolve, reject) {
            $('.main').load("teamDetails.html", function () {
                resolve();
            })
        })
    }

    function mypromise2() {
        return new Promise(function (resolve, reject) {
            $('.main').load("teamPlayers.html", function () {
                resolve();
            })
        })
    }
});