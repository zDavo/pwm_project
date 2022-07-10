$("#formRegister").on('submit', (e)=>{
	$.post( "/register", { firstName: $("#inRegNome").val(), lastName: $("#inRegCognome").val(), email: $("#inRegEmail").val(), password: $("#inRegPsw").val() })
	  .done(function( data ) {
	    if(data == "OK")
	    	return window.location.href = "/";
	    else if(data == "KO-Email")
	    	alert("L'email è già registrata");
	    else 
	    	alert("Si è verificato un errore imprevisto");
	  });
	e.preventDefault();
});