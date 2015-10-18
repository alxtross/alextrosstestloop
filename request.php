<?php

header('Content-Type: application/json');

$base='http://test.localfeedbackloop.com/api?apiKey=61067f81f8cf7e4a1f673cd230216112&';

$default=[	'noOfReviews'=>6,
			'internal'=>1,
			'yelp'=>1,
			'google'=>1,
			'offset'=>0,
			'threshold'=>1];

$results=@file_get_contents($base.http_build_query(array_merge($default, $_GET)));

echo $results;

?>