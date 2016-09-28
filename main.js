//Ciara Lunger
//ITP 404 
//HW3 - AJAX and Client-side Templating with Handlebars.js

//Get user input on "submit" click
$(document).ready(function() {
	$("#btn").click(function() {
		 var inp = document.getElementById("inputSearch").value;
		 getSubreddits(inp);
	});
});


function getSubreddits(subreddit) {
	var promise = $.ajax({
		url: "https://www.reddit.com/r/" + subreddit + ".json",
		type: 'get',
	});

	promise.then(function(response) {
		console.log(response);
		var data = response.data.children.map(function(d) {
			return {
				score : d.data.score,
				title : d.data.title,
				url : d.data.url,
				commentCount : d.data.num_comments,
				archived : d.data.archived,
			};
		});
		console.log(data);

		//way to name it
		var data2 = {
			info : data
		};

		//preesent info to user
		console.log(data2);

		var templateSource = $('#info-list-template').html();
		var template = Handlebars.compile(templateSource);

		var html = template(data2);

		$('#info-list').html(html);
	})
}
