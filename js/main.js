$( document ).ready( function() {
	var app = function () {

		/* Request parameters stored here */
		var parameters={
			noOfReviews:6,
			internal:1,
			yelp:1,
			google:1,
			threshold:1,
			offset:0
		}

		var page=1;

		var sources={
			0:'Internal',
			1:'Yelp',
			2:'Google'
		}

		/*
		Initialization
		event bindings
		initial reqest and render reviews
		*/

		function init(){
			$('#noOfReviews').change(function(){ reset(); parameters.noOfReviews=$(this).val(); update(); });
			$('#internal').change(function(e){ reset(); parameters.internal=+e.target.checked; update(); });
			$('#yelp').change(function(e){ reset(); parameters.yelp=+e.target.checked; update(); });
			$('#google').change(function(e){ reset(); parameters.google=+e.target.checked; update(); });
			$('.threshold-link a').click(function(){ reset(); changeThreshold(this); update(); });

			$('#page-selection').bootpag({
				total:0,
				maxVisible:10
			}).on("page", function(event, num){
				page=num;
				parameters.offset=(num-1)*parameters.noOfReviews;
				update();
			});

			update();
		}

		/*
		Reset
		need to reset paginaion
		*/
		function reset()
		{
			parameters.offset=0;
			page=1;
		}

		/*
		Update
		build a request URI and request data via proxy script
		*/
		function update() {
			var uri = 'request.php?'+$.param(parameters);
			$.getJSON(uri, render);
		}

		/*
		Render results
		render results from fetched reviews data
		*/
		function render(data){

			/* Render business info */
			var bi=data.business_info;
			$('#business-info').html('<a href="'+bi.external_page_url+'"><strong>'+bi.business_name+'</strong></a><br>'+bi.business_address+'<br>P: <a href="tel:'+bi.business_phone+'">'+bi.business_phone+'<br><a href="'+bi.external_url+'" class="btn btn-primary">Leave Review</button>');

			$('#total-reviews').text(data.business_info.total_rating.total_no_of_reviews);

			/* Render reviws list */
			if(data.reviews.length){
				$('#reviews').html((function(){
					var ro='';
					$.each(data.reviews,function(i,item){
						ro+='<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><div class="caption">';
						ro+='<h4 class="pull-right"><small>'+item.date_of_submission.split(' ')[0]+'</small></h4>';
						ro+='<h4><a href="'+item.customer_url+'">'+item.customer_name+' '+item.customer_last_name+'</a></h4>'
						ro+='<p>'+item.description+'</p></div>';
						ro+='<div class="ratings"><p class="pull-right">'+sources[item.review_from]+'</p><p>';
						for(var j=0;j<5;j++){
							ro+=(j<=item.rating) ? '<span class="glyphicon glyphicon-star"></span>' : '<span class="glyphicon glyphicon-star-empty"></span>';
						}
						ro+='</p></div></div></div>';
					});



					return ro;
				})());

				$('#page-selection').bootpag({
					total: Math.ceil(data.business_info.total_rating.total_no_of_reviews/parameters.noOfReviews),
					maxVisible:10,
					page:page
				});

			}else if(typeof data.errorMessage != 'undefined' && data.errorMessage){
				$('#reviews').html(data.errorMessage);
			}else{
				$('#reviews').html('No Results Found');
			}

		}

		/*
		Threshold change handler
		*/
		function changeThreshold(e){
			var t=$(e).prop('rel');
			if($(e).hasClass('active')){
				$('.threshold-link a').removeClass('active');
				parameters.threshold=1;
			}else{
				$('.threshold-link a').removeClass('active');
				$('.threshold-link a').eq(5-t).addClass('active');
				parameters.threshold=t;
			}
			update();
		}

		init();

		return{

		}
	}

	app();
} );