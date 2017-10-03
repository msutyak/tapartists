UserList = new Mongo.Collection('users');

PostList = new Meteor.Collection('posts');

if (Meteor.isClient) {
	
	//Jquery.validate() custom functions

	//checks if email exists for Inquiry field
	$.validator.addMethod( 'emailUnique', ( email ) => {
	  let exists = UserList.findOne( { "email": email.toLowerCase() }, { fields: { "email": 1 } } );
	  return exists ? false : true;
	});

	//check if "slug" exists for new blog posts
	/*
	$.validator.addMethod("postExists", function(value){
	  var formatted = formatSlug(value);
	  var unique    = PostList.findOne({"slug": formatted}, {fields: {"slug": 1}});
	  return unique ? false : true;
	});
	*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    UserList.before.insert(function (userId, doc) {
    	doc.createdAt = new Date();
	});

    PostList.before.insert(function (userId, doc) {
    	doc.createdAt = new Date();
	});

}
