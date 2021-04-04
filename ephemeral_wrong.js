$(document).ready(function() 
{
	$('#MyButton3').click(function(){
	$("ul").empty();
	$("#trial3").html(0);
	ephem_results = [];
	var menu_lists = [["Salmon","Tilpaia","Catfish","Cod", "Disney","Pixar","DreamWorks","Blue Sky", "Toyota","Hoda","Mazda","Nissan", "Mexico","USA","Canada","Cuba"], 
						["Colgate","Crest","Sensodyne","Pepsodent", "Vizio","Samsung","LG","Sony", "Amazon","Google","Facebook","Apple", "Red","Orange","Yellow","Green"],
						["NASA","SpaceX","Blue Origin","Boeing", "Stanford","SJSU","Santa Clara University","UCSC", "Goodyear","Michelin","Continental","Yokohama","BMW","Lexus","Mercedes-Benz","Audi"]];

	
	//Assign menu item to the drop down
	for (var menu = 0; menu < 3; menu++){
		var menu_id =  "#menu" + (menu+7) + "dd";  

		for (var item = 0; item < 16; item++) {
			$(menu_id).append("<li class='menu_list fadinw' " + "id=" + menu + "-" + item + "><a>" + menu_lists[menu][item] + "</a></li>");
				
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
	$("#selection3").html("Menu " + (menu_index + 1 + 6) + " >>> " + menu_lists[menu_index][item_index]);
		
	var system_select = menu_lists[menu_index][item_index];
	
	var current_menu;
	var task_count = 0;
	
	//remove fadein for selected word and 4 random index
	for (var menu = 0; menu < 3; menu++) {
		for (var item = 0; item < 16; item++) {
			if(item % Math.floor(Math.random() * 5) == 0) {
				$("#" + menu + "-" + item).removeClass("fadinw");
			}
			var menu_list = "#" + menu + "-" + item;
			if($(menu_list).text() === system_select) {
				$("#" + menu + "-" + item).addClass("fadinw");
			}
		}
	}
	
	
	//When menu is selected
	$(".menu_list").click(function(e) {	
		task_count++;  //count task regarless correct or incorrect
		
		var user_select = e.target;
		var word_select = system_select;
		
		for (var menu = 0; menu < 3; menu++) {
			for (var item = 0; item < 16; item++) {
				var menu_list = "#" + menu + "-" + item;
				$(menu_list).addClass("fadinw");
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
						if(item % Math.floor(Math.random() * 5) == 0) {
							$("#" + menu + "-" + item).removeClass("fadinw");
						}
						var menu_list = "#" + menu + "-" + item;
						if($(menu_list).text() === system_select) {
							$("#" + menu + "-" + item).addClass("fadinw");
						}
					}
				}
			
				$("#selection3").html("Menu " + (current_menu + 1 + 6) + " >>> " + system_select);

			} else if (task_count === 10) {
				ephem_results.push("ephemeralw " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + elapsed_time);
				$("#selection3").html("Low accuracy ephemeral test complete. Proceed to step 4.");
				printResults(ephem_results);								
			}
		
		if (task_count <= 10){
			$("#trial3").html(task_count);	
			//console.log("ephemeral " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + elapsed_time);
			ephem_results.push("ephemeralw " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + elapsed_time);
			//console.log(ephem_results)
		}
	});
	
	//fadein speed
	$(".menu").click(function(e) {
		var fadeInSpeed = 800;
		$(".fadinw").fadeOut(0, "linear");
		$(".fadinw").fadeIn(fadeInSpeed, "linear");
	});
	
	
  });
	
});

function printResults(results) {
	for (var i=0; i<results.length; i++) {
		$('div.eres').append('<p>'+results[i]+'</p>')     
	}
}