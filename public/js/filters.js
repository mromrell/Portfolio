'use strict';

/* Filters */

angular.module('portfolioApp.filters', [])
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])

    .filter('lenLimit100', [ function () {
        return function (text) {
            return String(text).substring(0, 100)+"...";
        }
    }])

    .filter('lenLimit200', [ function () {
        return function (text) {
            return String(text).substring(0, 200)+"...";
        }
    }])

    .filter('genSearch', function () {

        // All filters must return a function. The first parameter 'items'
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        return function (items, searchString, strict) {
            //console.log('This is SUPER strict: ' + strict);
            // Checks to see if the search box (search term) is empty
            if (!searchString) {
                return items;
            }

            var result = [];
            searchString = searchString.toLowerCase();

            //  A Loop. 'items' = portfolioList. 'item' = portfolioItem.
            angular.forEach(items, function(item) {
                //console.log('Item: ' + item.description.toLowerCase());
                if (item.description.toLowerCase().indexOf(searchString) !== -1 || item.technology == strict) {
                    result.push(item);
                }
            });

            return result;
        };

    })





    // Testing ------------------------------------------------------------------------------------------

    // END Testing ------------------------------------------------------------------------------------------






    // This Filters the projects being shown by the technologies that are checked
//    .filter('techFilter', function () {
//
//        // All filters must return a function. The first parameter 'items'
//        // is the data that is to be filtered, and the second is an
//        // argument that may be passed with a colon (searchFor:searchString)
//
//        return function (items, strict) {
//            console.log('This is SUPER strict: ' + strict);
//            // Checks to see if the search box (search term) is empty
//            if (!strict) {
//                return items;
//            }
//
//            var result = [];
//            strict = strict.toLowerCase();
//
//            //  A Loop. 'items' = portfolioList. 'item' = portfolioItem.
//            angular.forEach(items, function(item) {
//                //console.log('Item: ' + item.description.toLowerCase());
//                if (item.description.toLowerCase().indexOf(strict) !== -1) {
//                    result.push(item);
//                }
//            });
//
//            return result;
//        };
//
//    })
//
//    //This looks through all of the technologies listed in the portfolioList and returns only the unique values
//    .filter('techSearch', function () {
//
//        return function (items) {
//            var result = [];
//            angular.forEach(items, function(item) {
//                //console.log('Item: ' + JSON.stringify(item));
//                if (item != undefined) {
//                    //console.log('Technology List: ' + item.technology);
//                    angular.forEach(item.technology, function(tech) {
//                        //console.log('Is ' + tech + ' in ' + result);
//                        if ($.inArray(tech, result) == -1) {
//                            result.push(tech);
//                        }
//                    });
//                }
//            });
//
//            return result;
//        };
//
//    })

    .filter('nospace', [ function () {
        return function (text) {
            return String(text).replace(/\s+/g, '-').toLowerCase();
        }
    }]);

/*

it('should search across all fields when filtering with a string', function () {
    input('searchText').enter('m');
    expect(repeater('#searchTextResults tr', 'friend in friends').column('friend.name')).
        toEqual(['Mary', 'Mike', 'Adam']);

    input('searchText').enter('76');
    expect(repeater('#searchTextResults tr', 'friend in friends').column('friend.name')).
        toEqual(['John', 'Julie']);
});

it('should search in specific fields when filtering with a predicate object', function () {
    input('search.$').enter('i');
    expect(repeater('#searchObjResults tr', 'friend in friends').column('friend.name')).
        toEqual(['Mary', 'Mike', 'Julie', 'Juliette']);
});

it('should use a equal comparison when comparator is true', function () {
    input('search.name').enter('Julie');
    input('strict').check();
    expect(repeater('#searchObjResults tr', 'friend in friends').column('friend.name')).
        toEqual(['Julie']);
});

*/
