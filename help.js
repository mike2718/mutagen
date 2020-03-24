var g_menu_color , g_menu_color2 , g_menu_flag;
var g_target_object , g_target_text;
var g_mouse_x , g_mouse_y , g_mouse_x2 , g_mouse_y2;

function initialize()
{
	//mouse
	document.onmousemove = mousemove;
	document.onmousedown = mousedown;
	//load json (language dependent text file)
	new Ajax.Request("/json.txt" , {method:"get" , onComplete:initialize2 , onFailure:display_fail});
}
function display_fail(httpObject)
{
}
function initialize2(httpObject)
{
	//process json
	json_text = eval("(" + httpObject.responseText + ")");
	day_of_week = new Array(json_text.sunday_a,json_text.monday_a,json_text.tuesday_a,json_text.wednesday_a,json_text.thursday_a,json_text.friday_a,json_text.saturday_a);
	//initialize menu
	initialize_menu();
}
function initialize_menu()
{
	menu = $("a_menu");
	
	g_menu_flag = 0;
	g_menu_color = menu.style.backgroundColor;
	color = getStyleValue(".menu3" , "color");
	if(color != null)
	{
		g_menu_color2 = convertColor(color);
	}
	else
	{
		g_menu_color2 = "#B0FFB0";//"#ABFFAC";
	}
}

function show_menu3(obj)
{
	menu = $("a_menu");
	g_target_text = getContent(obj);
	
	html = "";
	html += "<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" class=\"menu2\">";
	html += "<tr onclick=\"jacascript:menu_command3(2);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+json_text.board_menu_download+"</td></tr>";//download
	if(Prototype.Browser.IE)
	{
		html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
		html += "<tr onclick=\"jacascript:menu_command3(1);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+json_text.board_menu_copy_to_clipboard+"</td></tr>";//copy to clipboard
	}
	
	html += "</table>";
	
	show_menu_core(html , obj , 1);
}

function menu_command3(command)
{//g_target_text
	if((command == 0) || (command == 2))
	{//uri
		post_data = "text=" + encodeURIComponent(g_target_text) + "&menu2=" + command;
		new Ajax.Request("/menu2" , {method:"post" , postBody:post_data , onComplete:menu_success , onFailure:menu_fail});
	}
	else if(command == 1)
	{//copy to clipboard
		if(Prototype.Browser.IE) clipboardData.setData("Text" , g_target_text);
	}
	hide_menu();
}

function menu_success(httpObject)
{
}
function menu_fail(httpObject)
{
}

function show_menu_core(html , obj , flag , pop_n)
{//flag 0:text menu 1:mouse menu
	var ppo;
	if(flag == 0)
	{
		ppo = get_popup_offset(pop_n);
		menu.style.top = (Element.cumulativeOffset(obj).top - ppo.top) + "px";
		menu.style.left = (Element.cumulativeOffset(obj).left - ppo.left) + "px";
	}
	else
	{
		menu.style.top = g_mouse_y2 + "px";//"px" for firefox
		menu.style.left = g_mouse_x2 + "px";
	}
	menu.innerHTML = html;
	menu.style.zIndex = 10000;
	menu.style.visibility = "visible";
}

function view_menu()
{
	menu = $("a_menu");
	menu.style.zIndex = 1000;
	menu.style.visibility = "visible";
}
function hide_menu()
{
	menu = $("a_menu");
	$("a_menu").style.visibility = "hidden";
	menu.style.top = 0;
	menu.style.left = 0;
}

function getContent(obj)
{
	if(typeof(obj.innerText) != "undefined")
	{
		return obj.innerText;
	}
	else
	{//firefox
		return obj.textContent;
	}
}
function mousedown()
{
	if(g_menu_flag)
	{
		hide_menu();
		g_menu_flag = 0;
	}
}
function mousemove(event)
{
	if(window.event)
	{
		g_mouse_y = window.event.offsetY;//relative
		g_mouse_x = window.event.offsetX;
		g_mouse_y2 = Event.pointerY(window.event);//absolute
		g_mouse_x2 = Event.pointerX(window.event);
	}
	else
	{//firefox
		g_mouse_y = event.layerY;
		g_mouse_x = event.layerX;
		g_mouse_y2 = event.pageY;
		g_mouse_x2 = event.pageX;
	}
}