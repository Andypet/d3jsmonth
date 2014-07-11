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


  //options for skrollr interface
  var s = skrollr.init({
    forceHeight: false
  });

  $('#slide-2').waypoint(function(){
    drawingHawaii();
    $(this).waypoint('destroy');
  });


  function drawingHawaii(){
    console.log("using it");
    var map = $('.hawaiiMap');
    width = map[0].offsetWidth;
    height = 500;
    
    hawaiiSvg.attr("width", width).attr("height", height);
    d3.json( "/data/hawaii_topojson.json", function(error, hawaii){

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


    });
  }

  function drawUsa(){

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