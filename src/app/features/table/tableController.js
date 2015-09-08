MyApp
    .controller('TableController', function($scope, $rootScope,$sce, $http, $location, $timeout, ws, TableService) {

        $scope.teams = {};
        $scope.history = [];
        $scope.currentDate = "";
        $scope.currentHistoryIndex = -1;

        var default_team = {
            points:0,
            played:0,
            goalsFor:0,
            goalsAgainst:0,
            goalsDiff:0,
            won:0,
            lost:0,
            drawn:0
        };

        TableService.getTeams().then(function(teams){
            angular.forEach(teams, function(team){
                $scope.teams[team.id] = angular.extend(team, default_team);
            });

            $timeout(function(){
                angular.element("#loading-app").fadeOut();
                angular.element("#container").fadeIn("slow");

                ws.on('message', function (message) {
                    processGame(JSON.parse(message.data));
                });
            },3000);

        })
        .catch(function(response){
            angular.element("#loading-app").fadeOut();
            angular.element("#server-error").fadeIn("slow");
        });


        var processGame = function(game){
            var homeTeam = $scope.teams[game.homeTeamId];
            var awayTeam = $scope.teams[game.awayTeamId];

            var homeScore = parseInt(game.homeGoals);
            var awayScore = parseInt(game.awayGoals);

            homeTeam.played++;
            awayTeam.played++;

            homeTeam.goalsFor+=homeScore;
            homeTeam.goalsAgainst+=awayScore;
            homeTeam.goalsDiff=homeTeam.goalsFor-homeTeam.goalsAgainst;

            awayTeam.goalsFor+=awayScore;
            awayTeam.goalsAgainst+=homeScore;
            awayTeam.goalsDiff=awayTeam.goalsFor-awayTeam.goalsAgainst;

            if (homeScore>awayScore){
                homeTeam.points+=3;
                homeTeam.won++;
                awayTeam.lost++;
            }else if (homeScore<awayScore){
                awayTeam.points+=3;
                awayTeam.won++;
                homeTeam.lost++;
            }else{
                homeTeam.points++;
                awayTeam.points++;
                homeTeam.drawn++;
                awayTeam.drawn++;
            }

            if (game.date!=$scope.currentDate){
                $scope.history.push({
                    date:game.date,
                    games:[]
                });
                $scope.currentDate = game.date;
                $scope.currentHistoryIndex++;
            }
            $scope.history[$scope.history.length-1].games.push(game);
        };
    });
