window.onload = function(){
	//=====================
	//data
	var rawCsvData = ""
	var ajax = new XMLHttpRequest();
	var recordsArray = [];
	//=====================
	//event handlers
	//get csv and populate numbers list
	ajax.onload = function(){
		if( ajax.status === 200 || ajax.status === 0){
			rawCsvData = ajax.responseText //capture raw csv data
			//split it into records Array
			recordsArray = rawCsvData.split("\r");
			populateDropdownList(recordsArray)
		}
		else{
			alert("You've got an ajax problem");
		}
	}
	
	//select a friend to call
	id('selNumber').onchange = function(){
		var i = id('selNumber').selectedIndex;
		var chosenPerson = id('selNumber').options[i].text;
		
	//fixes name layout
	//=======================
	var pieces = chosenPerson.split(',');
	chosenPerson = pieces[1] + " " + pieces[0];
	//=======================
	
	var yes = confirm('Call ' + chosenPerson +'?');
	if(yes){
		call(chosenPerson + " " + pieces[2]);
	}
	id('selNumber').selectedIndex = 0;
	};

	//============================
	//functions
	function id(identifier){
		return (document.getElementById(identifier));
	}
	function call(name){
	//Sending the call
	//==================================
	window.location.assign("tel:"+name);
	//==================================
	}
	
	//populate drop down list
	function populateDropdownList(lines){
		id('selNumber').innerHTML = "";
		var heading = document.createTextNode("Choose Friend");
		var opt0 = document.createElement('option');
		opt0.appendChild(heading);
		id('selNumber').appendChild(opt0);
		
	//get rid of CSV's header
	for(var i = 1; i < lines.length ; i++){
		lines[i-1] = lines[i];
	}
	lines.pop();
	lines.sort();
	
	//populate drop down list
	for(var i = 0; i < lines.length; i++){
		var opt = document.createElement('option');
		opt.appendChild(document.createTextNode(lines[i]));
		id('selNumber').appendChild(opt);
		}
	}
	//===========================
	//actions
	ajax.open('GET','Numbers.csv',true);
	ajax.send(null);
}