(function(){

	String.prototype.ucfirst = function() {
	  var str = this;
	  str += '';
	  var f = str.charAt(0).toUpperCase();
	  return f + str.substr(1);
	}	

})()