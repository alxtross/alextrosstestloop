# Test task from Alex Tross
## Comments

* Because you require "performance" and "architectural integrity", I decided not to use any JS/PHP framework except Bootstrap. Any framework will be slower. And native JS/PHP is more safe in terms of scalability when you do not know in what environment it will be used.
* I choose to implement all the logic on the client side just because this is the common way of doing such apps current days. So I use PHP for super simple proxy script only. If I had access to a server side implementation, I'd go further and remove the server side completely by using JSONP, so this JS app can be used as a widget on any web site even is user has no access to a server side.
* I do not use any loaders because it works fast enough even when I fetch 96 results (I tested it on a slow connection as well)
* I do not display total_avg_rating, because it is not correct, I suppose. It depends on the threshold, but it should independable I think. If user select 5 rating reviews to display, they will see average rating of 5 - that is not correct I think - it should be calculated through all reviews.
* I do not use/display "review_url" or "review_id". These values do not make sense in the context of the app.
* I do not use "review_source". Because it is not match "review_from" and it can mislead the user.
* Regarding design - I'm a super graphic designer, I'm a developer. So do not be so strict please :)
* I did not write any tests because it was not required.
* You have a bug in your APIs. internal/yelp/google parameters do not work.
So
http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews=10&internal=1&yelp=1&google=1&offset=0&threshold=1
is the same as
http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&noOfReviews=10&internal=1&yelp=1&google=0&offset=50&threshold=1

## Files

- /index.html - all the HTML code;
- /request.php - simple PHP proxy script;
- /js/main.js - main JS file. Because of its simplicity, I made it one file and didn't use modules, etc;
- /css/style.css - some CSS.