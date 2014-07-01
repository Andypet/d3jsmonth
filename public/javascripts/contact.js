$(document).ready(function(){
  var form = $("#ajax-contact");
  var button = $("button.contactSubmit");
  var hide = true;

  $("#more").click(function(e){
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
    console.log(formData);
    if(name2 == "" || script == ""){
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

});