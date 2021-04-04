$(document).ready(function() 
{
	$('#MyButton2').click(function(){
	$("ul").empty();
	$("#trial2").html(0);
	ephem_results = [];
	var menu_lists = [["Sad","Happy","Angry","Excited", "Hearts","Spades","Diamonds","Clubs", "Apple","Strawberry","Pear","Mango", "Goat","Cat","Dog","Rabbit"], 
						["San Francisco","San Jose","San Diego","San Bernardino", "Santa Clara","Santa Cruz","Santa Ana","Santa Barbara", "Chino Hills","El Dorado Hills","Beverly Hills","Laguna Hills", "Los Angeles", "Los Banos", "Los Gatos", "Los Altos"],
						["California","Oregon","Washington","Nevada", "Arizona","Texas","New Mexico","Oklahoma", "Florida","Georgia","South Carolina","Alabama", "New York","Pennsylvania","New Jersey","Connecticut"]];

	
	//Assign menu item to the drop down
	for (var menu = 0; menu < 3; menu++){
		var menu_id =  "#menu" + (menu+4) + "dd";  

		for (var item = 0; item < 16; item++) {
			$(menu_id).append("<li class='menu_list fadein' " + "id=" + menu + "-" + item + "><a>" + menu_lists[menu][item] + "</a></li>");
				
			if ((item+1)%4==0 && item<15) {
				$(menu_id).append("<li role='presentation' class='divider'></li>");
			}
		}	
	}
	
	//Choose random item from all menus
	var menu_index = Math.round(Math.random()*2);
	var item_index = Math.round(Math.random()*15);
	
	var starttime = new Date().getTime();
	var endtime = new Date().getTime();
	
	//Assign task to the user
	$("#selection2").html("Menu " + (menu_index + 1 + 3) + " >>> " + menu_lists[menu_index][item_index]);
		
	var system_select = menu_lists[menu_index][item_index];
	
	var current_menu;
	var task_count = 0;
	
	//remove fadein for selected word and 3 random index
	$("#" + menu_index + "-" + item_index).removeClass("fadein");
	for(var m =0; m <3; m++){
		$("#" + menu_index + "-" + Math.round(Math.random()*15)).removeClass("fadein");  }
	
	
	//When menu is selected
	$(".menu_list").click(function(e) {	
		task_count++;  //count task regarless correct or incorrect
		
		var user_select = e.target;
		var word_select = system_select;
		
		for (var menu = 0; menu < 3; menu++) {
			for (var item = 0; item < 16; item++) {
				var menu_list = "#" + menu + "-" + item;
				$(menu_list).addClass("fadein");
			}
		}
			
		var correct_word = ( system_select === user_select.text);
		

			endtime = new Date().getTime();
			var elapsed_time = endtime - starttime;
			

			if (task_count < 10) {
				var menu = Math.round(Math.random()*2);
				var item = Math.round(Math.random()*15);
				current_menu = menu;
				system_select = menu_lists[menu][item];
				starttime = new Date().getTime();
				
				for (var menu = 0; menu < 3; menu++) {
					for (var item = 0; item < 16; item++) {
						var menu_list = "#" + menu + "-" + item;
						if($(menu_list).text() === system_select) {
							$("#" + menu + "-" + item).removeClass("fadein");
							$("#" + menu + "-" + Math.floor(Math.random()*15)).removeClass("fadein");
							$("#" + menu + "-" + Math.floor(Math.random()*11)).removeClass("fadein");
							$("#" + menu + "-" + Math.floor(Math.random()*7)).removeClass("fadein");

						}
					}
				}
			
				$("#selection2").html("Menu " + (current_menu + 1 + 3) + " >>> " + system_select);

			} else if (task_count === 10) {
				ephem_results.push("ephemeral " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + elapsed_time);
				$("#selection2").html("Ephemeral test complete. Proceed to step 3.");
				printResults(ephem_results);								
			}
		
		if (task_count <= 10){
			$("#trial2").html(task_count);	
			//console.log("ephemeral " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + elapsed_time);
			ephem_results.push("ephemeral " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + elapsed_time);
			//console.log(ephem_results)
		}
	});
	
	//fadein speed
	$(".menu").click(function(e) {
		var fadeInSpeed = 800;
		
		$(".fadein").fadeOut(0, "linear");
		$(".fadein").fadeIn(fadeInSpeed, "linear");
	});
	
	
  });
	
});

function printResults(results) {
	for (var i=0; i<results.length; i++) {
		$('div.eres').append('<p>'+results[i]+'</p>')     
	}
}