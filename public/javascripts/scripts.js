$(document).ready(function(){
  $(document).scrollTop(0);
  var width = 0;
  var height = 0;
  var map = true;
  var hawaiiSvg = d3.select(".hawaiiMap").append("svg");
  //add in ajax class to a menu
  $('a.hijax').click(function (e) {
    e.preventDefault(); // Stop browser from loading the URL.
    $.ajax({
      url: "/" + $(this).attr('href'),
    }).done(function (markup) {
      $('#content').html(markup);
    });
  });

  var s = skrollr.init({
    forceHeight: false,
    render: function(data) {
      //Debugging - Log the current scroll position.
      if(data.curTop >= "100" && map == true){
        map = false;
        drawingHawaii();
      }
    }
  });

  $("nav.top-bar").on("click", function(){
    $(document).scrollTop(100);
  });




  function drawingHawaii(){

    var map = $('.hawaiiMap');
    width = map[0].offsetWidth;
    height = 500;
    
    console.log(width);
    console.log(height);
    hawaiiSvg.attr("width", width).attr("height", height);
    queue().defer(d3.json, "/data/hawaii_topojson.json")
           .await(ready);

  }

  function ready(error, hawaii){
    drawMap(hawaii);
  }

  function drawMap(hawaii){

    var subunits = topojson.feature(hawaii, hawaii.objects.subunits);
    
    // Hawaii: 19.5667° N, 155.5000° W
    // All of Hawaii's Islands:
    // var projection = d3.geo.albers()
    //   .parallels([15, 25])
    var projection = d3.geo.albers()
    .rotate([157.50, 0])
    .center([0, 18.5])
    // .origin([-160, 20])
    .parallels([15, 25])
    .scale(6000)
    .translate([width/2 , height ]);

    var path = d3.geo.path()
      .projection(projection);

    hawaiiSvg.append("path")
      .datum(subunits)
      .attr("class", "state")
      .attr("d", path);


  }




$(window).on('resize', resize);

function resize() {
  var map = $('.hawaiiMap').width();

  // adjust things when the window size changes
  width = map;
  // update projection
  hawaiiSvg.attr("width", width);
}









});