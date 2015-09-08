MyApp
    .factory('TableService', function($http, Config, $q) {
        var service = {
            getTeams:function(){
                var d = $q.defer();
                $http.get(Config.getApiUrl() + "/teams")
                    .success(function(response){
                        d.resolve(response);
                    })
                    .error(function(response){
                        d.reject(response);
                    });
                return d.promise;
            }
        };
        return service;
    });
