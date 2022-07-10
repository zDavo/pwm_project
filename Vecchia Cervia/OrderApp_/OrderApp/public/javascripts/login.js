$("#formLogin").on('submit', (e)=>{
	$.post( "/login", { email: $("#inLogEmail").val(), password: $("#inLogPsw").val() })
	  .done(function( data ) {
	    if(data == "OK")
	    	return window.location.href = "/";
	    else if(data == "KO")
	    	alert("Credenziali errate");
	    else 
	    	alert("Qualcosa è andato storto");
	  });
	e.preventDefault();
});