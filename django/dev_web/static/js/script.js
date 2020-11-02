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