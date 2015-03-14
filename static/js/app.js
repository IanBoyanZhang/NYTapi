var showData = function(i, result){
  var template = $(".results .template .searchDisplay").clone();

  var headline = template.find('.headline');
}

var KEY = require(['../APIkey/key']);
var APIkey = KEY.APIkey;
$(document).ready(function(){
  $(':submit').on('click', function(){
    var button = $(this).val();

    var search = "?q=China";
    var NYTuri = "http://api.nytimes.com/svc/search/v2/articlesearch.json";

    // Request
    var request = { tagged: search,
                    site: 'New York Times',
                    order: 'decs',
                    sort: 'creation'};
    // Ajax JSON
    var result = $.ajax({ // ajax call starts
        type:'GET',
        url:NYTuri + search + '&fq=source:("The New York Times")&page=0&begin_date=20150101&sort=oldest&api-key='+APIkey,
        data: search,
        dataType:'json'
    })
    .done(function(result){
      console.log("success");
      $('#info').html('');
      $('#info').append(result.response.docs[2].headline.main + '<br/>');
      console.log(result.response.docs[2].web_url);

     }).fail(function(){
      console.log("error");
      $('.results').html('This feature is not working.');
    });

    return false; // keeps the page from not refreshing
  });
});
