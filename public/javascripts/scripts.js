$(document).ready(function(){


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
    // forceheight: 0px,
    render: function(data) {
      //Debugging - Log the current scroll position.
      console.log(data.curTop);
      if(data.curTop == "262"){
        drawingHawaii();
      }
    }
  });

  $("nav.top-bar").on("click", function(){
    $(document).scrollTop(0);
  });




  function drawingHawaii(){
    console.log("heeeeeeeeeeeeeyyyyyyy");
  }


















});