'use strict';

/* Services */

angular.module('SpencerApplegateBlog.services', ['ngResource'])

    // creates Post objects to persist with MongoLab
    .factory('PostMongoLab', ['$resource', function ($resource) {
        // define post object attributes
        var Post = $resource('https://api.mongolab.com/api/1/databases' +
            '/spencerapplegate_blog/collections/posts/:id',
            { apiKey: '6Y4sT7bQvkiqJUKTkAsbDY-P8l4sPtaH' },
            { update: { method: 'PUT' } }
        );

        // method to update blog posts in the db
        Post.prototype.update = function(cb) {
            return Post.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        // method to delete blog posts in the db
        Post.prototype.destroy = function(cb) {
            return Post.remove({id: this._id.$oid}, cb);
        };

        return Post;
    }])

    // creates Comments objects to persist with MongoLab
    .factory('Comment', ['$resource', function ($resource) {
        // define comment object attributes
        var Comment = $resource('https://api.mongolab.com/api/1/databases' +
            '/spencerapplegate_blog/collections/comments/:id',
            { apiKey: '6Y4sT7bQvkiqJUKTkAsbDY-P8l4sPtaH' },
            { update: { method: 'PUT' } }
        );

        // method to update comments in the db
        Comment.prototype.update = function(cb) {
            return Comment.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        // method to delete comments in the db
        Comment.prototype.destroy = function(cb) {
            return Comment.remove({id: this._id.$oid}, cb);
        };

        return Comment;
    }])

    .factory('Post', ['$http', '$routeParams', function($http, $routeParams) {
        // Find out why prototyping is not working here
        var Post = {
            query: function() {
                return $http.get('/posts').then(function(response) {
//                    console.log(response);
                    return response.data;
                });
            },

            getPost: function(id) {
                return $http.get('/posts/' + id).then(function(response) {
                    console.log(response);
                    return response.data;
                });
            },

            update: function() {
                return $http.put('/posts/' + $routeParams.postId, this).then(function(response) {
//                    console.log(response);
                    return response.data;
                });
            }
        };

//        Post.prototype.update = function() {
//            return $http.put('/posts/' + $routeParams.postId, this).then(function(response) {
//                console.log(response);
//                return response.data;
//            });
//        };

//        Post.prototype.destroy = function(cb) {
//            return Post.remove({id: this.id}, cb);
//        };

        return Post;
    }])

    // current version of the application
    .value('version', '0.1');
