$(function () {

  // Inicializar edad a no checked
  $("#edad").prop("checked", false);

  // pluggin fuerza contraseña
  $("#passwd").strength({
    scoreLables: {
      empty: "",
      invalid: "Invalido",
      weak: "Debil",
      good: "Bueno",
      strong: "Fuerte",
    },
    templates: {
      toggle:
        '',
      meter: '<div class="{meterClass}">{score}</div>',
      score: '<span class="badge {scoreClass}"></span>',
      main:
        '<div class="{containerClass}"><div class="input-group">{input}{toggle}</div>{meter}</div>'
    },
    scoreClasses: {
      empty: '',
      invalid: 'badge-danger',
      weak: 'badge-warning',
      good: 'badge-info',
      strong: 'badge-success'
    },
  });

  // Boton modal
  $('#bt-m').click(function() {
    // Crear boton volver
    let volver = '<div id="divBtnVolver"><button type="button" id="btn-volver" class="btn btn-primary btn-block">Volver al formulario</button></div>';

    // Ocultar formulario
    $('#formulario').css('display', 'none');

    // Mostrar boton volver
    $('#main').append(volver);
  });


  // Boton volver al formulario
  $(document).on('click', '#btn-volver', function() {
    // Quitar la capa del boton volver
    $('#divBtnVolver').remove();

    // Mostrar de nuevo el formulario
    $('#formulario').css('display', 'block');

    // Inicializar el checkbox a no checked
    $("#edad").prop("checked", false);
  });

  // Boton enviar formulario
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
      }
    };
  }
}
function email() {
  var email = $("#email").val();
  var patron = /^[a-zA-Z]+[a-zA-Z0-9_\.]*@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
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
  var passwd = $("#passwd").val();

  var patron = /^(?=.*[!|"@·#$~%€&¬\/\(\)\=\?\'\¿\¡\^\`\[\*\+\]\}\{\¨\´\{\<\>\;\,\:\.\-\_])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
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
