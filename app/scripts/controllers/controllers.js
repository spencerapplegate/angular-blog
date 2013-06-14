'use strict';

/* Controllers */

angular.module('SpencerApplegateBlog.controllers', [])

    // navigation control to keep track of active tab
    .controller('NavCtrl', ['$scope', '$route', function($scope, $route) {
        // sets the route of the navigation controller's scope
        $scope.$route = $route;
    }])

    // about page control
    .controller('AboutCtrl', ['$scope', function($scope) {

    }])

    // blog page control
    .controller('BlogCtrl', ['$scope', '$location', 'load', function($scope, $location, load) {
        // sets posts on scope as return from promise object in routeProvider's resolve
        $scope.posts = load;

        // redirects to viewing mode of blog post
        $scope.view = function(id) {
            $location.path('/blog/' + id);
        };
    }])

    // create blog post page control
    .controller('CreateCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
        // saves the newly created post
        $scope.save = function() {
            Post.save($scope.post, function() {
                $location.path('/blog');
            });
        };
    }])

    // edit blog post control
    .controller('EditCtrl', ['$scope', '$routeParams', '$location', 'Post', function($scope, $routeParams, $location, Post) {
        // define local self variable
        var self = this;

        // grabs the correct post object based on id
        Post.get({id: $routeParams.id}).then(function(post) {
            self.original = post;
            $scope.post = new Post(self.original);
            console.log(self.original);
            console.log($scope.post);
        });

        // checks to see if the post in the details page has been changed
        $scope.isClean = function() {
            return angular.equals(self.original, $scope.post);
        };

        // save edited blog post
        $scope.save = function() {
            $scope.post.update(function() {
                $location.path('/blog');
            });
        };

        // deletes post object and redirects to main blog page
        $scope.destroy = function() {
            self.original.destroy(function() {
                $location.path('/blog');
            })
        };
    }])

    // view post page control
    .controller('ViewCtrl', ['$scope', '$routeParams', 'Post', function($scope, $routeParams, Post) {
        // TODO: move this to a resolve service on routeProvider
        Post.get({id: $routeParams.id}).then(function(post) {
            $scope.post = post;
        });
    }])
//
//    // create blog post page control
//    .controller('CreateCommentCtrl', ['$scope', '$location', '$routeParams', 'Comment', function($scope, $location, $routeParams, Comment) {
//
//        // saves the newly created post
//        $scope.save = function() {
//
//            // adds a timestamp and post id to the created post object
//            $scope.comment.timestamp = new Date();
//            $scope.comment.postId = $routeParams.postId;
//
//            Comment.save($scope.comment, function() {
//
//                // relocate to the blog page after saving the post
//                $location.path('/blog/' + $routeParams.postId);
//            });
//        };
//    }])
//
//    // contact page control
    .controller('ContactCtrl', ['$scope', function($scope) {

    }]);