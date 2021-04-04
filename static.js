$(document).ready(function() 
{
	$('#MyButton1').click(function(){
	$("ul").empty();
	$("#trial1").html(0);
	stat_results = [];
	var menu_items = [["Carrot", "Tomato", "Onion", "Garlic","Salmon", "Shrimp", "Lobster", "Oyster","Orange", "Lemon", "Apple", "Banana","Chicken", "Beef", "Lamp", "Pork"], 
						["Rice", "Soup", "Noodle", "Pasta","Cheddar", "Milk", "Juice", "Alcohol","Hamburger", "Pizza", "Fries", "Sandwiches","Coffee", "Macchiato", "Espresso", "Cappuccino"],
						["Curry", "Steak", "Sushi", "Hotpot","Korea", "Japan", "India", "Thailand","Spain", "Germany", "Italy", "France","Winter", "Summer", "Spring", "Autumn"]];

	
	//Assign menu item to the drop down
	for (var menu = 1; menu < 4; menu++){
		var menu_id =  "#menu" + menu + "dd";  

		for (var item = 0; item < 16; item++) {
			$(menu_id).append("<li class='menu_item' " + "id=" + item + "_" + item + "><a>" + menu_items[menu-1][item] + "</a></li>");
				
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
	$("#selection1").html("Menu " + (menu_index + 1) + " >>> " + menu_items[menu_index][item_index]);
		
	var system_select = menu_items[menu_index][item_index];
	
	var current_menu;
	var task_count = 0;
	
	//When menu is selected
	$(".menu_item").click(function(e) {	
		task_count++;  //count task regarless correct or incorrect
		
		var user_select = e.target;
		var word_select = system_select;
		var correct_word = ( system_select === user_select.text);
		
		endtime = new Date().getTime();
		var total_time = endtime - starttime;
	
		if (task_count < 10) {
			var menu = Math.round(Math.random()*2);
			var item = Math.round(Math.random()*15);
			current_menu = menu;
			system_select = menu_items[menu][item];
			starttime = new Date().getTime();
				
			$("#selection1").html("Menu " + (current_menu + 1) + " >>> " + system_select);

		} else if (task_count === 10) {
			stat_results.push("static " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + total_time);
			$("#selection1").html("Static test complete. Proceed to step 2.");
			printResults(stat_results);								
		}
        
		if (task_count <= 10){
			$("#trial1").html(task_count);	
			console.log("static " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + total_time);
			stat_results.push("static " + task_count + " " + word_select + " " + user_select.text + " " + correct_word + " " + total_time);
			//console.log(stat_results);
		}
	});
  });
});
function printResults(results) {
	for (var i=0; i<results.length; i++) {
		$('div.sres').append('<p>'+results[i]+'</p>')     
	}
}