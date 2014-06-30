(function($){

  var form = $("#ajax-contact");
  var button = $("button.contactSubmit");
  var hide = true;
  
  //add in ajax class to a menu
  $('a.hijax').click(function (e) {
    e.preventDefault(); // Stop browser from loading the URL.
    $.ajax({
      url: "/" + $(this).attr('href'),
    }).done(function (markup) {
      $('#content').html(markup);
    });
  });

  $("#more").on("click",function(e){
    console.log("hi");
    hide =!hide;
    $(".hiddenFields").toggle();

    if(hide){
      $("#more").html("More Fields");
    }else{
      $("#more").html("Less Fields");
    }
  });
  

  $(form).submit(function(event){
    event.preventDefault();

    button.addClass("disabled");
    button.html("Sending....");
    button.attr("type","");
    
    var name2 = $("#name2").val();
    var script = $("#script").val();

    var formData = $(form).serialize();
    if(name2 == "" || script == ""){
      console.log("hey");
      $.ajax({
        type:'POST',
        url: '/email/send',
        data: formData
      })
      .success(function(data, textStatus, xhr){
        button.addClass("disabled");
        button.attr("disabled");
        button.removeClass("alert");
        button.html("Message Sent!");
        button.addClass("success");
        // $("form.smallForm fieldset").html("<legend> Contact me </legend><div id='successBox'> Success, message sent!</div>")
      })
      .error(function(data, textStatus, xhr){
        console.log(textStatus);
        console.log(xhr);
        console.log(data);
        button.removeClass("disabled");
        button.html("send again");
        button.addClass("alert");
        button.attr("type","submit");

      });
    }else{
      button.html("Message Sent!");
      button.addClass("success");
    }
  });

  var s = skrollr.init({
    // forceheight: 0px,
    render: function(data) {
      //Debugging - Log the current scroll position.
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


















})(jQuery);