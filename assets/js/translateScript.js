function lngChange(currentLang)
{
	if (currentLang == "Rus")
	{
		var x = document.getElementsByClassName("eng");
		for (var i=0; i < x.length; i++)
		{
			x[i].style.display = "block";
		}
		var y = document.getElementsByClassName("rus");
		for (var i=0; i < y.length; i++)
		{
			y[i].style.display = "none";
		}
	}
	else{
		var x = document.getElementsByClassName("rus");
		for (var i=0; i < x.length; i++)
		{
			x[i].style.display = "block";
		}
		var y = document.getElementsByClassName("eng");
		for (var i=0; i < y.length; i++)
		{
			y[i].style.display = "none";
		}
	}
}