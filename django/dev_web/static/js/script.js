window.onload = function() { att_total(); }
$(document).ready(function () {
  $("#myCarousel").on("slide.bs.carousel", function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $("#myCarousel .carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);

      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $("#myCarousel .carousel-item")
            .eq(i)
            .appendTo("#myCarousel .carousel-inner");
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo($(this).find(".carousel-inner"));
        }

      }
    }
  });
  
  $("form.signup").submit(function () {
    att_v = validaAtt()
    nome_v =  validatxt("#nome")
    email_v =validatxt("#email")
    passc_v = validatxt("#pass_c") 
    pass_v = validatxt("#pass") && validaSenha() && validaConfirma($("#pass"), $("#pass_c")) 
    class_v = validaClass()
    gen_v = validaGenero()
    return nome_v && email_v && pass_v && passc_v && class_v && gen_v && att_v
  })

  $("#like_btn").click(function(){like_dislike("like", "dislike")})
  $("#dislike_btn").click(function(){like_dislike("dislike", "like")})
  $('#ajax-form').on('submit', function(event){
      event.preventDefault();
      console.log("form submitted!")  // sanity check
      create_product();
  });

  troca_qtt()
  remove_line()

});

function like_dislike(active, inactive){
  let like = $("#"+active)
  let like_a = like.data(active)
  let dislike = $("#"+inactive)
  let dislike_a = dislike.data(inactive)
  
  if (like.hasClass("far")) {
    like.removeClass("far")
    like.addClass("fas")
    like.data(active, like_a+1)
    $("#"+active+"_amount").text(like_a+1)
    if (dislike.hasClass("fas")) {
      dislike.removeClass("fas")
      dislike.addClass("far")
      dislike.data(inactive, dislike_a-1)
      $("#"+inactive+"_amount").text(dislike_a-1)  
    }
  } else {
    like.removeClass("fas")
    like.addClass("far")
    like.data(active, like_a-1)
    $("#"+active+"_amount").text(like_a-1)
  }
}

function validatxt(id) {
  let field = $(id)

  if (field.val() == '') {
    field.removeClass("is-valid")
    field.addClass("is-invalid")
    return false
  } else {
    field.addClass("is-valid")
    field.removeClass("is-invalid")
    return true
  }
}

function validaSenha() {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if($("#pass").val().match(passw)){
    $(".valid_pass").addClass("d-none")
    $(".valid_pass").removeClass("d-block")
    $(".pass_card").addClass("d-none")
    $(".pass_card").removeClass("d-block")
    return true
  } else {
    $(".valid_pass").addClass("d-block")
    $(".valid_pass").removeClass("d-none")
    $(".pass_card").addClass("d-block")
    $(".pass_card").removeClass("d-none")
    $("#pass").removeClass("is-valid")
    $("#pass").addClass("is-invalid")
    return false
  }
  
}

function validaConfirma(senha, confirmacao){
  if (senha.val() === confirmacao.val()){
    $(".pass_confirm").addClass("d-none")
    $(".pass_confirm").removeClass("d-block")
    $(".pass_card").addClass("d-none")
    $(".pass_card").removeClass("d-block")
    return true
  }else{
    $(".pass_confirm").addClass("d-block")
    $(".pass_confirm").removeClass("d-none")
    $(".pass_card").addClass("d-block")
    $(".pass_card").removeClass("d-none")
    confirmacao.removeClass("is-valid")
    confirmacao.addClass("is-invalid")
    senha.removeClass("is-valid")
    senha.addClass("is-invalid")
    return false
  }
}

function validaClass() {
  let bruxo = $("#bruxo")
  let trouxa = $("#trouxa")
  let radio = $("input[name='classe']:checked")

  if (radio.length === 0) {
    bruxo.addClass("is-invalid")
    bruxo.removeClass("is-valid")
    trouxa.addClass("is-invalid")
    trouxa.removeClass("is-valid")
    $(".class-feedback").addClass("d-block")
    return false
  }
  else {
    bruxo.addClass("is-valid")
    bruxo.removeClass("is-invalid")
    trouxa.addClass("is-valid")
    trouxa.removeClass("is-invalid")
    $(".class-feedback").removeClass("d-block")
    return true
  }
}

function validaGenero(){
  let gen = $("#genero")

  if (gen.val() === "") {
    gen.addClass("is-invalid")
    gen.removeClass("is-valid")
    return false
  }
  else{
    gen.addClass("is-valid")
    gen.removeClass("is-invalid")
    return true
  }
}
function validaAtt() {
  let att = $("input.att_check:checked")
  let r = true;
  if (att.length === 0) {
    r = confirm("Tem certeza que não deseja receber nossas promoções?")
  }
  if (!r){
    $("input.att_check").addClass("is-invalid")
    $("input.att_check").removeClass("is-valid")
  }else{
    $("input.att_check").addClass("is-valid")
    $("input.att_check").removeClass("is-invalid")
  }

  return r;
}

function create_product() {
    console.log("create post is working!") // sanity check
    $.ajaxSetup({ 
        beforeSend: function(xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        } 
    });

    $.ajax({
      url : "/produto/ajax", // the endpoint
      type : "POST", // http method
      data : { name : $('#id_name').val(), category: $('#id_category').val(), price: $('#id_price').val(), stored_qtt: $('#id_stored_qtt').val()}, // data sent with the post request

      // handle a successful response
      success : function(json) {
          $('#id_name').val('');
          $('#id_category').val('')
          $('#id_price').val('0')
          $('#id_stored_qtt').val('0')
          $("ajax-form").trigger("reset")
          console.log(json); // log the returned json to the console
          $("#linha-tabela").append("<tr><td style='visibility: hidden;'>"+json.id+"</td><td>"+json.name+"</td><td>"+json.category+"</td> <td>"+json.price+"</td> <td> <input type='number' id='qtt' value='"+json.stored_qtt+"'></td><td><button class='btn-danger remove'>X</button></td> </tr>");
          att_total()
          console.log("success"); // another sanity check
      },

      // handle a non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          alert("Não é possivel inserir elemento com nome repetido");
      }
    });
};

function att_total(){
  var total = 0;
  $('table tbody tr').each(function () {
      var qtd = $('td', this).eq(4).children(":first").val();
      var p = parseInt($('td', this).eq(3).text());
      if (!isNaN(qtd) && !isNaN(p)) {
          total += qtd*p;
      }
  });
  console.log(total)
  $("#total").text("$ "+total)
}

function troca_qtt() {
  $.ajaxSetup({ 
    beforeSend: function(xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    } 
  });

  $("#tabela").on("blur", "input#qtt", function(){
    let row = $(this).parent().parent();
    
    $.ajax({
      url : "/produto/ajax-update", // the endpoint
      type : "POST", // http method
      data : { id:parseInt($('td', row).eq(0).text()), qtt: $(this).val()}, // data sent with the post request

      // handle a successful response
      success : function(json) {
          console.log(json); // log the returned json to the console
          $('td', row).eq(4).val(json.stored_qtt)
          att_total()
          console.log("success"); // another sanity check
      },

      // handle a non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
      }
    });
  })
}

function remove_line(){
  $("#tabela").on("click", "button.remove", function(){
    let row = $(this).parent().parent();
    console.log(parseInt($('td', row).eq(0).text())); // another sanity check
    $.ajax({
      url : "/produto/ajax-remove", // the endpoint
      type : "POST", // http method
      data : { id:parseInt($('td', row).eq(0).text())}, // data sent with the post request

      // handle a successful response
      success : function(json) {
          console.log(json); // log the returned json to the console
          row.remove()
          att_total()
          console.log("success"); // another sanity check
      },

      // handle a non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
      }
    });
  });
}