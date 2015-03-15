var KEY = require(['../APIkey/key']);
var APIkey = KEY.APIkey;

function infoAppend(data){
      if (typeof data !== "string"){
        console.error("info append function input args is not string!");
      }
      $('#info').html('');
      $('#info').append("Input date is void, setting search parameter to " + data + '<br/>');
}

$(document).ready(function(){
  $(':submit').on('click', function(){
    var button = $(this).val();
    var searchText = document.getElementById("searchText").value;
    var beginDate= document.getElementById("beginDate").value;
    var endDate=document.getElementById('endDate').value;
    
    if(searchText === ''){
      searchText = "New York Times";
      infoAppend(searchText);
    }
    
    if(beginDate=== ''){
      beginDate = "2015-01-01";
      infoAppend(beginDate);
    }

    if(endDate=== ''){
      endDate = "2015-01-01";
      infoAppend(endDate);
    }

    // Process search date
    beginDate= beginDate.split("-").join("");
    console.log(beginDate);
    var NYTuri = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
    var searchBeginDate = "&begin_date"+beginDate;
    var searchEndDate = "&end_date"+endDate;

    // Request
      var request = { tagged: searchText,
                    site: 'New York Times',
                    order: 'decs',
                    sort: 'creation'};
    // Ajax JSON
      var result = $.ajax({ // ajax call starts
        type:'GET',
        url:NYTuri + "?q=" + searchText + "&page=0"
            + searchBeginDate + searchBeginDate + "&api-key=" + APIkey,
 //       url:"http://api.nytimes.com/svc/search/v2/articlesearch.json?q=New York Times&page=0&begin_date20150101&api-key=1f2c2c3a299f6ba19c89f8ec7ebb5b96:2:71564068",
        data: searchText,
        dataType:'json'
      })
      .done(function(result){
        var docLength = result.response.docs.length;
        console.log(docLength);
        $('#info').html('');
        $('#info').append('<em>' + "The feature will list first" + " " + docLength.toString() + " " +
                          "title(s) of search result" + '</em>' +'<br/>' + '<br/>');
        for (var iter = 0; iter < docLength; ++iter){
           $('#info').append('<a href=" '+result.response.docs[iter].web_url+' ">' + 
                          result.response.docs[iter].headline.main + '</a>' + '<br/>' + '<br/>');
        }
       }).fail(function(){
        $('#info').html('');
        console.log("error");
        $('.results').html('This feature is not working.');
      });
    return false; // keeps the page from not refreshing
  });
});
