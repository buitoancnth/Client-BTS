
angular.module("ngMapAutocomplete", [])
    .directive('ngMapAutocomplete', ['$timeout', function ($timeout) {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=ngModel',
                options: '=?',
                details: '=?'
            },
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }// do nothing if no ng-model
                //options for autocomplete
                var opts;
                var watchEnter = false;

                //convert options provided to opts
                var initOpts = function () {

                    opts = {};
                    if (scope.options) {

                        watchEnter = scope.options.watchEnter === true;

                        if (scope.options.types) {
                            opts.types = [];
                            opts.types.push(scope.options.types);
                            scope.gPlace.setTypes(opts.types);
                        } else {
                            scope.gPlace.setTypes([]);
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds;
                            scope.gPlace.setBounds(opts.bounds);
                        } else {
                            scope.gPlace.setBounds(null);
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            };
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
                        } else {
                            scope.gPlace.setComponentRestrictions(null);
                        }
                    }
                };

                if (scope.gPlace === undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                    if (ngModel) {
                        getPlace({ name: ngModel });
                    }
                }

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    var result = scope.gPlace.getPlace();
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {
                            scope.$apply(function () {
                                scope.details = result;
                                scope.$emit('mapentrySelected', scope.details);
                                ngModel.$setViewValue(element.val());
                            });
                        }
                        else {
                            if (watchEnter) {
                                getPlace(result);
                            }
                        }
                    }
                });

                /*                var applySelection = function() {
                                    var result = scope.gPlace.getPlace();
                                    console.log(scope.gPlace.getPlace());
                                    if (true) {
                                        if (true) {
                                            scope.$apply(function () {
                                                // scope.details = result;
                                                // scope.details.description = element.val();
                                                ngModel.$setViewValue(element.val());
                                            });
                                        }
                                        else {
                                            if (watchEnter) {
                                                getPlace(result);
                                            }
                                        }
                                    }
                                };
                                */
                // Watch enter and update autocomplete before sending
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        google.maps.event.trigger(scope.gPlace, 'place_changed');
                        return false;
                    }
                });

                //function to get retrieve the autocompletes first result using the AutocompleteService
                function getPlace(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0) {
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if (list === null || list.length === 0) {

                                    scope.$apply(function () {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        { 'reference': list[0].reference },
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus === google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function () {
                                                    //detailsResult.formatted_address = list[0].description;
                                                    detailsResult.description = list[0].description;
                                                    ngModel.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                };

                ngModel.$render = function () {
                    var location = ngModel.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options;
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts();
                }, true);

                //on focusout the value reverts, need to set it again.
                // with a timer to prevent maps event bug
                element.on('focusout', function (event) {
                    $timeout(function () {
                        element.val(ngModel.$viewValue);
                        event.preventDefault();
                    }, 2, false);
                    //    element.unbind('focusout');
                });
            }
        };
    }]);