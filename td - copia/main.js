$(function () {
  $("#edad").prop("checked", false);
//  $(document).ready(function () {
    $("#passwd").strength({

  scoreLables: {
          empty: 'Vacío',
          invalid: 'Invalido',
          weak: 'Debil',
          good: 'Bueno',
          strong: 'Fuerte'
      }
//});



});

  $("#bt").click(function (e) {
    e.preventDefault();
    nombre();
    apellido();
    email();
    passwd();
  });
});

$("#dni").keyup(function () {
  dni();
});

$("#edad").click(function () {
  edad();
});

function nombre() {
  var nombre = $("#nombre").val();
  var patron = /^[a-zA-Z][a-z A-Z]*$/;
  if (nombre.match(patron)) {
    //limpiar
    $("#nombre").removeClass("is-invalid");
    $("#nombre").addClass("is-valid");
    $("#errorNombre").css("display", "none");
  } else {
    //error
    $("#nombre").removeClass("is-valid");
    $("#nombre").addClass("is-invalid");

    $("#errorNombre").css("display", "block");
  }
}
function apellido() {
  var apellido = $("#apellido").val();
  //asi permite apellido compuestos para no permitr quitar el ultimo +
  var patron = /^[a-zA-Z]+([\s]{1}[a-zA-Z]+)+$/;
  if (apellido.match(patron)) {
    //limpiar
    $("#apellido").removeClass("is-invalid");
    $("#apellido").addClass("is-valid");
    $("#errorApellido").css("display", "none");
  } else {
    //error
    $("#apellido").removeClass("is-valid");
    $("#apellido").addClass("is-invalid");

    $("#errorApellido").css("display", "block");
  }
}

function dni() {
  $("#dni").val($("#dni").val().toUpperCase());

  var dni = $("#dni").val();

  var patron = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/;

  if (dni.match(patron)) {
    if (dni.length == 9) {
      let numero = dni.substr(0, 8);
      let letra = dni.substr(8, 1).toUpperCase();

      let letras = "TRWAGMYFPDXBNJZSQVHLCKET";
      let index = numero % 23;

      let letraCorrecta = letras.substr(index, 1);

      if (letra === letraCorrecta) {
        // limpiar
        $("#dni").removeClass("is-invalid");
        $("#dni").addClass("is-valid");
      }
    }
  } else {
    $("#dni").removeClass("is-valid");
    $("#dni").addClass("is-invalid");
  }
}

function edad() {
  if ($("#edad").is(":checked")) {
    $("#formulario").css("display", "none");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "mensaje.html", true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        $("#mensaje").html(this.responseText);
        $("#modal").modal("show");
        
        $("#bt-m").remove(); //eliminar boton
        //crear boton
        var boton ='<button class="btn btn-primary" id="bt-m" data-dismiss="modal" >Volver</button>';
        $("#bt-modal").append(boton);
        
        //al pulsar boton
        $("#bt-m").click(function () {
          //mostrar formulario
          $("#formulario").css("display", "block");
          //desmarcar 
          $("#edad").prop("checked", false);
        });
      }
    };
  }
}
function email() {
  var email= $("#email").val();
  var patron=/^[a-zA-Z]+[a-zA-Z0-9_\.]*@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
  if (email.match(patron)) {
   //limpiar
   $("#email").removeClass("is-invalid");
    $("#email").addClass("is-valid");
    $("#errorEmail").css("display", "none");
  } else {
    //error
    $("#email").removeClass("is-valid");
    $("#email").addClass("is-invalid");
    $("#errorEmail").css("display", "block");
  }
}
function passwd() {
  var passwd= $("#passwd").val();
  
  var patron=/^(?=.*[!|"@·#$~%€&¬\/\(\)\=\?\'\¿\¡\^\`\[\*\+\]\}\{\¨\´\{\<\>\;\,\:\.\-\_])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (passwd.match(patron)) {
   //limpiar
   $("#passwd").removeClass("is-invalid");
    $("#passwd").addClass("is-valid");
    $("#errorPasswd").css("display", "none");
  } else {
    //error
    $("#passwd").removeClass("is-valid");
    $("#passwd").addClass("is-invalid");
    $("#errorPasswd").css("display", "block");
  }
}