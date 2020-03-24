//powered by 215, @TEMP=F0gBOF3suUwZUQcZ201zziIBF2b

var option_anchor_check=1;//1:リンクされたレスに色を付ける(表示が遅くなるので使わない場合は0に) 2:色付け＋マウスオーバーでレスをポップアップする

var html;
var xml_status , xml_message , xml_boardinfo , xml_boardmask;
var day_of_week;
var store_name , backup_name , backup_sign , backup_title , backup_text , post_name , post_title, post_text , status_flag;
var require_sign , unique_disabled;

var error_flag;
var error_information;

var board_option_flag , board_option_start , board_option_end;

var g_menu_color , g_menu_color2 , g_menu_flag , g_start_id , g_scrollbar_width;
var g_target_object , g_target_message , g_target_message_n , g_target_menu , g_target_text;
var g_mouse_x , g_mouse_y , g_mouse_x2 , g_mouse_y2;
var g_popup_max , g_popup_timer , g_popup_check;
var g_res_number;

function display_message(message , flag , popup)
{
	state = message.childNodes[1].firstChild.nodeValue;
	
	html += "<div class=\"res\">";	//レス開始
	if(state & 64)
	{//新レス
		html += "<div class=\"resheader2\">";	//ヘッダ開始
	}
	else
	{
		html += "<div class=\"resheader\">";	//ヘッダ開始
	}
	html += "<dt>";
	if(g_res_number)
	{//res number
		if(anchor_check(message.childNodes[0].firstChild.nodeValue))
		{
			if(option_anchor_check == 1)
			{//change color
				html += "<span class=\"id2\"> <a href=\"javascript:void(0)\" onclick=\"javascript:show_menu(this , " + popup + " , 0)\">[" + message.childNodes[0].firstChild.nodeValue + "]</a> </span>";
			}
			else
			{//change color + mouse over
				html += "<span class=\"id2\"> <a href=\"javascript:void(0)\" onmouseover=\"javascript:show_popup(this,'" + message.childNodes[3].firstChild.nodeValue + "'," + popup + ",1);cancel_check_popup();\" onmouseout=\"check_popup();\" onclick=\"javascript:show_menu(this , " + popup + " , 0)\">[" + message.childNodes[0].firstChild.nodeValue + "]</a> </span>";
			}
		}
		else
		{
			html += "<span class=\"id\"> <a href=\"javascript:void(0)\" onclick=\"javascript:show_menu(this , " + popup + " , 0)\">[" + message.childNodes[0].firstChild.nodeValue + "]</a> </span>";
		}
	}
	else
	{//id
		if(anchor_check(message.childNodes[3].firstChild.nodeValue))
		{
			if(option_anchor_check == 1)
			{//change color
				html += "<span class=\"id2\"> [" + message.childNodes[0].firstChild.nodeValue + "] </span>";//number
				html += "ID:<span class=\"id2\"><a href=\"javascript:void(0)\" onclick=\"javascript:show_menu(this , " + popup + " , 0)\">" + message.childNodes[3].firstChild.nodeValue + "</a> </span>";
			}
			else
			{//change color + mouse over
				html += "<span class=\"id2\"> [" + message.childNodes[0].firstChild.nodeValue + "] </span>";//number
				html += "ID:<span class=\"id2\"><a href=\"javascript:void(0)\" onmouseover=\"javascript:show_popup(this,'" + message.childNodes[3].firstChild.nodeValue + "'," + popup + ",1);cancel_check_popup();\" onmouseout=\"check_popup();\" onclick=\"javascript:show_menu(this , " + popup + " , 0)\">" + message.childNodes[3].firstChild.nodeValue + "</a> </span>";
			}
		}
		else
		{
			html += "<span class=\"id\"> [" + message.childNodes[0].firstChild.nodeValue + "] </span>";//number
			html += "ID:<span class=\"id\"><a href=\"javascript:void(0)\" onclick=\"javascript:show_menu(this , " + popup + " , 0)\">" + message.childNodes[3].firstChild.nodeValue + "</a> </span>";
		}
	}
	if((state & 131) != 0){//ignored
		html += " <span class=\"title2\">" + g_json.board_a_boon + "</span></div></div>";
		return;
	}
	x = ((state >> 2) & 15);
	if(xml_boardmask[x] == 0)
	{//to authorize
		html += " <span class=\"state\">" + g_json.board_to_verify + "</span>";
	}
	else if(xml_boardmask[x] < 0)
	{//deleted
		html += " <span class=\"title2\">" + g_json.board_deleted + "</span></div></div>";
		return;
	}
	if(message.childNodes[9].firstChild.nodeValue != ""){//title
		html += " <span class=\"title\">" + message.childNodes[9].firstChild.nodeValue + "</span>";
	}
	//
	text = message.childNodes[10].firstChild.nodeValue;
	if(text == ""){//default
		html += " " + g_json.name + ":<span class=\"name\">" + xml_boardinfo[0].childNodes[1].firstChild.nodeValue + "</span>";
	}
	else{
		if(message.childNodes[12].firstChild.nodeValue & 1){//sign
			html += " " + g_json.sign + ":<span class=\"sign\"><a href=\"javascript:void(0)\" onclick=\"javascript:show_menu4(this," + popup + ")\">" + text + "</a></span>";
		}
		else if((g_res_number && (text == text.match(/\d{1,4}/))) || (!g_res_number && (text == text.match(/[\w\+\-]{11}/))))
		{
			html += " " + g_json.name + ":<span class=\"name\"><a href=\"javascript:void(0)\" onmouseover=\"javascript:show_popup(this,'" + text + "'," + popup + ",0);cancel_check_popup();\" onmouseout=\"check_popup();\">" + text + "</a></span>";
		}
		else{//name
			html += " " + g_json.name + ":<span class=\"name\">" + text + "</span>";
		}
	}
	//date
	date = new Date(message.childNodes[2].firstChild.nodeValue);
	if(1)
	{
		var dY,dM,dD,dh,dm,ds;
		dY =  date.getFullYear();
		dM = (date.getMonth()+1  > 9)? date.getMonth()+1 : "0"+(date.getMonth()+1);
		dD = (date.getDate()     > 9)? date.getDate()    : "0"+date.getDate();
		dh = (date.getHours()    > 9)? date.getHours()   : "0"+date.getHours();
		dm = (date.getMinutes()  > 9)? date.getMinutes() : "0"+date.getMinutes();
		ds = (date.getSeconds()  > 9)? date.getSeconds() : "0"+date.getSeconds();
		
		html += " <span class=\"date\">" + dY + "/" + dM + "/" + dD + "(" + day_of_week[date.getDay()] + ") " + dh + ":" + dm + ":" + ds + "</span>";
	}
	else
	{
		html += " <span class=\"date\">" + date.toLocaleString() + "</span>";
	}
	if(unique_disabled == 0)
	{//show unique
		html += "<span> [" + message.childNodes[8].firstChild.nodeValue + "] </span>";//unique
	}
	if(state & 64)
	{//new
		html += " <span class=\"state\">" + g_json.board_new + "</span>";
		if(g_start_id == null)
		{
			g_start_id = message.childNodes[3].firstChild.nodeValue;
		}
	}
	html += "</dt></div>";	//ヘッダ終了
	//レス本文
	html += "<dd><div class=\"resmain\">";	//レス本文開始
	html += "";
	
	//preprocess text
	text = message.childNodes[11].firstChild.nodeValue.replace(/(^|<br\/>)&gt;[^&](?:(?!<br\/>).)*/g , "<span class=\"resquot\">$&</span>");//quote
	///s?https?://[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/
	text = text.replace(/(h?)(ttps?:\/\/[^<\s　]+)/g , 
		 "<a href=\"javascript:void(0)\" onclick=\"javascript:show_menu2(this)\">$1$2</a>");//link
	if(g_res_number)
	{
		text = text.replace(/&gt;&gt;(\d{1,4})/g , 
		"<a href=\"javascript:void(0)\" onmouseover=\"javascript:show_popup(this,'$1'," + popup + ",0);cancel_check_popup();\" onmouseout=\"check_popup();\">$&</a>");//popup // onclick=\"javascript:show_menu(this , " + popup + " , 1)\"
	}
	else
	{
		text = text.replace(/&gt;&gt;([\w\+\-]+)/g , 
		"<a href=\"javascript:void(0)\" onmouseover=\"javascript:show_popup(this,'$1'," + popup + ",0);cancel_check_popup();\" onmouseout=\"check_popup();\">$&</a>");//popup // onclick=\"javascript:show_menu(this , " + popup + " , 1)\"
	}
	text = text.replace(/(^|[^\w;])([0-9a-f]{64})/g , 
		"$1<a href=\"javascript:void(0)\" onclick=\"javascript:show_menu3(this)\">$2</a>");//id (?:<br\/>)(?:(?!<br\/>).)*([0-9a-f]{64})
	
	html += text;
	html += "<br/>";
	html += "</div>";	//レス本文終了

	html += "<div class=\"resfooter\">";	//フッタ開始
	html += "</div>";	//フッタ終了
	html += "</dd></div>";	//レス終了
}

function initialize()
{//initialize
	view_change_css("css1" , "/board.css" , function(){initialize2()});
}
function initialize2()
{
	view_add_button();
	//div
	$("area51").className = "info";
	view_add_div("area52" , "message");
	view_add_div("area53" , "error");
	view_add_div("area54" , "post");
	view_add_div("a_menu" , "menu");
	$("a_menu").onmouseover = function(){g_menu_flag = 0;};
	$("a_menu").onmouseout = function(){g_menu_flag = 1;};
	
	//constants
	g_popup_max = 6;//maximum number of popup
	g_scrollbar_width = 19;//width of scrollbar
	g_res_number = 0;//(settings)
	g_view_number = 50;//default number of messages (settings)
	//functions
	document.onmousemove = mousemove;
	document.onmousedown = mousedown;
	//backup
	store_name = "";
	status_flag = 0;
	
	day_of_week = new Array(g_json.sunday_a,g_json.monday_a,g_json.tuesday_a,g_json.wednesday_a,g_json.thursday_a,g_json.friday_a,g_json.saturday_a);
	
	//initialize error
	initialize_error();
	//initialize menu
	initialize_menu();
	//initialize popup
	initialize_popup();
	//initialize post
	post_initialize();
	//initialize mask
	initialize_mask();
	
	//settings
	var settings;
	settings = g_settings.getElementsByTagName("board");
	g_view_number = parseInt(settings[0].childNodes[0].firstChild.nodeValue);
	g_res_number = parseInt(settings[0].childNodes[1].firstChild.nodeValue);
	
	display();
}
function initialize_error()
{
	error_information = new Array();
	error_information[0] = new Array(0 , g_json.e_no_current_sign);
	error_information[1] = new Array(0 , g_json.e_no_text);
	error_information[2] = new Array(0 , g_json.e_invalid_name);
	error_information[3] = new Array(0 , g_json.e_require_sign_post);
	error_information[4] = new Array(0 , g_json.e_download_register);
	error_information[5] = new Array(0 , g_json.e_message_length);

	display_error();
}
function initialize_mask()
{
	xml_boardmask = new Array(0,-1,-1,-1,1,-1,1,-1,1,-1,-1,-1,1,-1,-1,-1);
}
function post_initialize()
{//initialize post
	$("area54").innerHTML = "\
<form id=\"postform\" action=\"javascript:void 0;\">\
" + g_json.post_name + "<input id=\"name\" name=\"name\" size=\"50\" maxlength=\"63\"/>\
<input type=\"checkbox\" id=\"sign\" name=\"sign\" onClick=\"check_sign()\"></input>" + g_json.post_use_sign + "<br/>\
" + g_json.post_title + "<input id=\"title\" name=\"title\" size=\"50\" maxlength=\"63\"/><br/>\
<textarea id=\"text\" name=\"text\" cols=80 rows=7></textarea><br/>\
<input type=\"submit\" id=\"submit\" value=\"" + g_json.post_post + "\" onClick=\"post()\"/>\
<input type=\"hidden\" id=\"bbs\" />\
<input type=\"hidden\" id=\"key\" />\
<input type=\"hidden\" id=\"time\" />\
</form>";
}
function mousedown()
{
	if(g_menu_flag)
	{
		hide_menu();
		check_popup();
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

function anchor_check(str)
{
	if(option_anchor_check)
	{
		text = "&gt;&gt;" + str;
		if(g_res_number)
		{
			var re = new RegExp(text + "([^0-9]|$)");
		}
		else
		{
			var re = new RegExp(text.replace(/[\+\-]/g,"\\$0") + "([^0-9a-zA-Z\+\-]|$)");
		}
		for(n = 0 ; n < xml_message.length ; n++)
		{
			if(xml_message[n].childNodes[11].firstChild.nodeValue.search(re) != -1)
			{
				return true;
			}
		}
	}
	return false;
}
function IdNumConvert(str){
	var ret=-1;
	if(str == str.match(/[\w\+\-]{11}/) ){
		for(var n = 0 ; n < xml_message.length ; n++){
			if(str ==  xml_message[n].childNodes[3].firstChild.nodeValue){
				ret = xml_message[n].childNodes[0].firstChild.nodeValue;
				break;
			}
		}
	}
	else if(str == str.match(/\d{1,4}/) && parseInt(str) <= xml_message.length){
				ret = xml_message[str - 1].childNodes[3].firstChild.nodeValue;	
	}
	return (ret);
}
function get_board_option(number)
{
	var n;
	
	board_option_flag = 0;
	board_option_start = 0;
	board_option_end = 0;
	if(g_option_string == "") g_option_string = "l" + g_view_number;//last n
	else if(g_option_string == "all")
	{//all
		board_option_flag |= 2;//go to navi
		board_option_end = number;
		return;
	}
	
	text = g_option_string.replace(/(^|-|l|\d)n($|-|l|\d)/ , "$1$2");
	if(/(?:^|-|l|\d)n(?:$|-|l|\d)/.test(g_option_string))
	{//exclude first message
		board_option_flag |= 1;
	}
	n = /^l(\d*)$/.exec(text);
	if((n = /^l(\d*)$/.exec(text)) && (n = n[1] ? parseInt(n[1]) : 10))
	{//last n
		board_option_start = (number < n) ? 0 : (number - n);
		board_option_end = number;
		return;
	}
	//a-b
	n = text.split("-");
	if(n.length == 0)
	{//error
	}
	else if(n.length == 2)
	{
		if(n[0] == "")
		{//-b
			board_option_start = 0;
			board_option_end = parseInt(n[1]);
		}
		else if(n[1] == "")
		{//a-
			board_option_flag |= 2;//go to navi
			board_option_start = parseInt(n[0]) - 1;
			board_option_end = number;
		}
		else
		{//a-b
			board_option_flag |= 2;//go to navi
			board_option_start = parseInt(n[0]) - 1;
			board_option_end = parseInt(n[1]);
		}
	}
	else
	{//error
		board_option_start = parseInt(n[0]) - 1;
		board_option_end = board_option_start + 1;
	}
	
	board_option_start = (board_option_start < 0) ? 0 : board_option_start;
	board_option_start = (board_option_start > number) ? number : board_option_start;
	board_option_end = (board_option_end < 0) ? 0 : board_option_end;
	board_option_end = (board_option_end > number) ? number : board_option_end;
}

function display()
{//display
	var n , i , start_n , end_n , max_n , buffer;
	
	xml_status = g_xml.getElementsByTagName("status");
	xml_boardinfo = g_xml.getElementsByTagName("boardinfo");
	xml_message = g_xml.getElementsByTagName("message");
	display_status();
	
	max_n = xml_message.length;
	get_board_option(max_n);//get board_option_start, board_option_end, board_option_flag
	if(xml_status[0].childNodes[0].firstChild.nodeValue & 4)
	{//XML file
		board_option_flag |= 2;//go to navi
	}
	
	buffer = "";
	start_n = board_option_start + 1;
	end_n = board_option_end;
	if(start_n > 1)
	{//previous
		n = (start_n - g_view_number);
		if(n < 1) n = 1;
		buffer += "<a href=\"../" + g_id_string + "/n" + n + "-" + start_n + "\">&lt;" + g_json.board_previous + "</a> ";
	}
	if(end_n < max_n)
	{//next
		n = (end_n + g_view_number);
		if(n > max_n) n = max_n;
		buffer += "<a href=\"../" + g_id_string + "/n" + end_n + "-" + n + "\">" + g_json.board_next + "&gt;</a> ";
	}
	n = parseInt(xml_boardinfo[0].childNodes[5].firstChild.nodeValue);
	for(i = 0 ; i < n ; i += 100)
	{
		if(i >= 1000) break;
		if(i == 0) i2 = 1;
		else i2 = i;
		buffer += "<a href=\"../" + g_id_string + "/" + i2 + "-" + (i + 100) + "n\">" + i2 + "-</a> ";
	}
	buffer += "<a href=\"../" + g_id_string + "/all\">" + g_json.board_all + "</a> ";//all
	buffer += "<a href=\"../" + g_id_string + "/\">" + g_json.board_last + g_view_number + "</a> ";//last
	html = "<p><div class=\"navi\" id=\"navi\">" + buffer + "<a href=\"javascript:void(0)\" onclick=\"javascript:go_to(0)\">" + g_json.board_go_to_last + "</a></div></p>";
	
	g_start_id = null;
	html += "<dl>";
	if((board_option_start > 0) && ((board_option_flag & 1) == 0))
	{//display message[0]
		html += "<span id=\"" + xml_message[0].childNodes[3].firstChild.nodeValue + "\">";
		display_message(xml_message[0] , 0 , 0);
		html += "</span>"
	}
	for(i = board_option_start ; i < board_option_end ; i++)
	{//display messages[n]
		html += "<span id=\"" + xml_message[i].childNodes[3].firstChild.nodeValue + "\">";
		display_message(xml_message[i] , 0 , 0);
		html += "</span>"
	}
	html += "</dl>";
	if(board_option_start != board_option_end) html += "<p><div class=\"navi\" id=\"navi2\">" + buffer + "<a href=\"javascript:void(0)\" onclick=\"javascript:go_to(1)\">" + g_json.board_go_to_top + "</a></div></p>";
	
	$("area52").innerHTML = html;
	
	display_finish();
	
	if(g_start_id != null)
	{//new message
		if(g_start_id != xml_message[0].childNodes[3].firstChild.nodeValue)
		{
			Element.scrollTo($(g_start_id));
		}
		else
		{
			go_to(1);//go to top
		}
	}
	else
	{
		if(board_option_flag & 2)
		{//a-, a-b
			Element.scrollTo($("area52"));//go to navi
		}
		else
		{//other
			go_to(0);//go to last
		}
	}
}
function go_to(flag)
{
	if(flag == 0)
	{//go to last
		//if(board_option_end)
		{
			var obj, pos, client_height;
			obj = $("navi2");//$(xml_message[(board_option_end - 1)].childNodes[3].firstChild.nodeValue);
			if(obj != null)
			{
				pos = obj.cumulativeOffset();
				client_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				pos[1] -= client_height;
				pos[1] += Element.getHeight(obj)
				window.scrollTo(pos[0], pos[1]);
			}
		}
	}
	else
	{//go to top
		window.scrollTo(0,0);
	}
}
function initialize_popup()
{
	//var body;
	//body = document.getElementsByTagName("body").item(0);
	
	for(n = 0 ; n < g_popup_max ; n++)
	{
		popup = document.createElement("div");
		popup.id = "a_popup" + n;
		popup.className = "popup";
		Event.observe(popup , "mouseover", over_popup);
		Event.observe(popup , "mouseout", check_popup);
		
		popup.style.visibility = "hidden";
		popup.style.top = 0;
		popup.style.left = 0;
		popup.innerHTML = "";
		
		document.body.appendChild(popup);
	}
	g_popup_timer = 0;
	g_popup_check = g_popup_max;
}
function over_popup()
{
	var text , n;
	if(this.id)
	{
		n = this.id.indexOf("a_popup");
		if(n != -1)
		{
			text = this.id.substring("a_popup".length);
			n = parseInt(text) + 1;
			g_popup_check = (g_popup_check >= n) ? g_popup_check : n;
		}
	}
}
function show_popup(obj , target , pop_number , option)
{
	var text , n , m , h , number_of_item;
	var px , py , width , height , ppo , client_width , client_height;
	
	hide_menu();
	if(pop_number >= g_popup_max) return;//max popup
	
	number_of_item = 0;
	m = 0;
	for(n = pop_number ; n < g_popup_max ; n++)
	{
		popup = $("a_popup" + n);
		if(m || (popup.style.visibility != "hidden"))
		{
			m = 1;
			popup.style.visibility = "hidden";
			popup.style.top = 0;
			popup.style.left = 0;
			popup.innerHTML = "";
		}
	}
	
	html = "<dl>";
	number_of_item = 0;
	if(option == 0)
	{//normal popup
		if(g_res_number)
		{
			n = parseInt(target) - 1;
			g_target_message = xml_message[n];
			g_target_message_n = n;
		}
		else
		{
			g_target_message = null;
			g_target_message_n = -1;
			for(n = 0 ; n < xml_message.length ; n++)
			{
				if(xml_message[n].childNodes[3].firstChild.nodeValue == target)
				{
					g_target_message = xml_message[n];
					g_target_message_n = n;
					break;
				}
			}
		}
		if(g_target_message == null) return;
		
		html += "<span id=\"" + g_target_message.childNodes[3].firstChild.nodeValue + "\">";
		display_message(g_target_message , 1 , (pop_number + 1));
		html += "</span></dl>";
	}
	else if(option == 1)
	{//show replies of specified id.
		if(g_res_number)
		{
			target = IdNumConvert(target);
		}
		text = "&gt;&gt;" + target;
		if(g_res_number)
		{
			var re = new RegExp(text + "([^0-9]|$)");
		}
		else
		{
			var re = new RegExp(text.replace(/[\+\-]/g,"\\$0") + "([^0-9a-zA-Z\+\-]|$)");
		}
		for(n = 0 ; n < xml_message.length ; n++)
		{
			if(xml_message[n].childNodes[11].firstChild.nodeValue.search(re) != -1)
			{//search
				number_of_item++;
				html += "<span id=\"" + xml_message[n].childNodes[3].firstChild.nodeValue + "\">";
				display_message(xml_message[n] , 1 , (pop_number + 1));
				html += "</span>";
			}
		}
		html += g_json.board_number_of_replies + " : " + number_of_item;
		html += "</dl>";
	}
	else if(option == 2)
	{//show messages of specified sign.
		text = target;
		number_of_item = 0;
		for(n = 0 ; n < xml_message.length ; n++)
		{
			if((xml_message[n].childNodes[12].firstChild.nodeValue & 1) && (xml_message[n].childNodes[10].firstChild.nodeValue == text))
			{
				number_of_item++;
				html += "<span id=\"" + xml_message[n].childNodes[3].firstChild.nodeValue + "\">";
				display_message(xml_message[n] , 1 , (pop_number + 1));
				html += "</span>";
			}
		}
		html += g_json.number_of_messages + " : " + number_of_item;
		html += "</dl>";
	}
	else
	{
		return;
	}
	
	popup = $("a_popup" + pop_number);
	client_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	//client_width = document.viewport.getWidth();
	if(g_ie_version >= 7) client_width -= g_scrollbar_width;
	else if(Prototype.Browser.Gecko || Prototype.Browser.Opera) client_width -= g_scrollbar_width * 2;
	client_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	//client_height = document.viewport.getHeight();
	//alert(client_width + "," + client_height);
	popup.style.width = "";//client_width;
	popup.style.height = "";//client_height;
	popup.innerHTML = html;
	
	height = Element.getHeight(popup);
	width = Element.getWidth(popup);
	h = Element.getHeight(obj);
	ppo = get_popup_offset(pop_number);
	n = Element.viewportOffset(obj).top;//up height
	m = client_height - n - h;//down height
	if(n > height)
	{//up popup
		if(Prototype.Browser.IE && (g_ie_version < 7))
		{
			popup.style.top = Element.cumulativeOffset(obj).top - ppo.top - height - h + "px";
		}
		else
		{
			popup.style.top = Element.cumulativeOffset(obj).top - ppo.top - height + "px";
		}
		py = n;
	}
	else if(n > m)
	{//up popup with scroll
		popup.style.top = Element.cumulativeOffset(obj).top - ppo.top - n + "px";
		py = n;
	}
	else
	{//down popup
		popup.style.top = Element.cumulativeOffset(obj).top - ppo.top + h + "px";
		py = m;
	}
	px = client_width - (Element.viewportOffset(obj).left);
	popup.style.left = (Element.cumulativeOffset(obj).left - ppo.left) + "px";
	m = py;
	if(!Prototype.Browser.IE || (g_ie_version >= 7)) m -= h;
	if(height > m)
	{//vertical scroll
		popup.style.height = m + "px";
		width += g_scrollbar_width;
		popup.style.width = width + "px";
	}
	m = px;
	if(width > m) popup.style.width = m + "px";
	
	popup.style.zIndex = 500 + pop_number;
	popup.style.visibility = "visible";
	if(option == 0)
	{//normal popup
		g_popup_check = pop_number + 1;
	}
	else
	{//other
		g_popup_check = pop_number;
	}
}
function get_popup_offset(pop_number)
{
	var result = [0,0] , n;
	if(pop_number > g_popup_max) pop_number = g_popup_max;
	result.left = 0;
	result.top = 0;
	if(Prototype.Browser.Opera) return result;
	/*for(n = 0 ; n < pop_number ; n++)
	{
		result.left += $("a_popup" + n).scrollLeft;
		result.top += $("a_popup" + n).scrollTop;
	}*/
	if(pop_number > 0)
	{
		result.left += $("a_popup" + (pop_number - 1)).scrollLeft;
		result.top += $("a_popup" + (pop_number - 1)).scrollTop;
	}
	return result;
}
function hide_popup()
{
	for(n = 0 ; n < g_popup_max ; n++)
	{
		popup = $("a_popup" + n);
		if(popup.style.visibility != "hidden")
		{
			popup.style.visibility = "hidden";
			popup.style.top = "";
			popup.style.left = "";
			popup.style.width = "";
			popup.style.height = "";
			popup.innerHTML = "";
		}
	}
}
function check_popup()
{
	if(g_popup_timer == 0)
	{
		g_popup_timer = setTimeout("check_popup2()" , 100);
	}
}
function cancel_check_popup()
{
	if(g_popup_timer)
	{
		clearTimeout(g_popup_timer);
		g_popup_timer = 0;
	}
}
function check_popup2()
{
	var n , m;
	
	g_popup_timer = 0;
	if($("a_menu").style.visibility == "visible") return;
	
	n = g_popup_max;
	m = 0;
	while(n--)
	{
		popup = $("a_popup" + n);
		if(popup.style.visibility == "hidden") continue;
		x = parseInt(popup.style.left);//popup.style.left;//Element.cumulativeOffset(popup).left;//
		y = parseInt(popup.style.top);//popup.style.top;//Element.cumulativeOffset(popup).top;//
		if((x <= g_mouse_x2) && (g_mouse_x2 <= (x + Element.getWidth(popup))) && 
			(y <= g_mouse_y2) && (g_mouse_y2 <= (y + Element.getHeight(popup))))
		{//in
			break;
		}
		else if(n < g_popup_check)
		{//out
			m = 1;
			hide_menu();
			popup.style.visibility = "hidden";
			popup.style.top = 0;
			popup.style.left = 0;
			popup.innerHTML = "";
		}
	}
	if(m)
	{
		for(n = g_popup_check ; n < g_popup_max ; n++)
		{
			popup = $("a_popup" + n);
			if(popup.style.visibility == "hidden") continue;
			popup.style.visibility = "hidden";
			popup.style.top = 0;
			popup.style.left = 0;
			popup.innerHTML = "";
		}
	}
}
function display_status()
{
	html = "";
	html += g_json.status + " : ";
	if(xml_status[0].childNodes[0].firstChild.nodeValue & 1)
	{
		html += g_json.s_download + "<br/>";
	}
	else
	{
		html += g_json.s_warning + "<br/>";
	}
	identification = g_xml.getElementsByTagName("identification");
	document.title = identification[0].childNodes[2].childNodes[0].firstChild.nodeValue;
	html += g_json.id + " : " + identification[0].childNodes[0].firstChild.nodeValue + "<br/>";
	html += g_json.keyword + " : <b>" + identification[0].childNodes[2].childNodes[0].firstChild.nodeValue + "</b><br/>";
	keywordname = identification[0].childNodes[2].getElementsByTagName("keywordname");
	n = keywordname.length;
	for(i = 0 ; i < n ; i++)
	{//display keyword
		if(i != (n - 1))
		{
			html += keywordname[i].firstChild.nodeValue + " ";
		}
		else
		{
			html += keywordname[i].firstChild.nodeValue + "<br/>";
		}
	}
	date1 = new Date(identification[0].childNodes[5].firstChild.nodeValue);
	html += g_json.date + " : " + date1.toLocaleString() + "<br/>";
	
	html += g_json.board_description + " : " + xml_boardinfo[0].childNodes[2].firstChild.nodeValue + "<br/>";
	html += g_json.board_life + " : " + xml_boardinfo[0].childNodes[4].firstChild.nodeValue + " " + g_json.days + "<br/>";
	if(parseInt(xml_boardinfo[0].childNodes[4].firstChild.nodeValue) == 0)
	{//out of date
		document.body.style.background = getStyleValue(".outofdate" , "background-color");

		//document.getElementById("body").backgroundColor = "#fee";
	}
	active_number = parseInt(xml_boardinfo[0].childNodes[5].firstChild.nodeValue);
	total_number = active_number;
	if((xml_status[0].childNodes[0].firstChild.nodeValue & 2) == 0)
	{
		total_number += parseInt(xml_boardinfo[0].childNodes[6].firstChild.nodeValue);
	}
	else
	{
		active_number -= parseInt(xml_boardinfo[0].childNodes[6].firstChild.nodeValue);
	}
	html += g_json.number_of_messages + " : " + active_number + " / " + total_number + "<br/>";
	
	
	html += "<br/><b>";
	if(xml_boardinfo[0].childNodes[0].firstChild.nodeValue == 0)
	{//open board
		html += g_json.board_open + "<br/>";
		require_sign = 0;
		xml_boardmask[0] = 1;
	}
	else if(xml_boardinfo[0].childNodes[0].firstChild.nodeValue == 1)
	{//signed board
		html += g_json.board_signed + "<br/>";
		require_sign = 1;
		xml_boardmask[0] = 1;
	}
	else if(xml_boardinfo[0].childNodes[0].firstChild.nodeValue == 2)
	{//closed board
		html += g_json.board_closed + "<br/>";
		require_sign = 0;
		xml_boardmask[0] = 0;
	}
	else if(xml_boardinfo[0].childNodes[0].firstChild.nodeValue == 3)
	{//certified board
		html += g_json.board_certified + "<br/>";
		require_sign = 1;
		xml_boardmask[0] = 0;
	}
	sign = identification[0].getElementsByTagName("sign");
	if(sign.length != 0)
	{
		html += g_json.board_with_sign + "<br/>";
	}
	if(xml_boardinfo[0].childNodes[3].firstChild.nodeValue & 1)
	{//unique disabled
		html += g_json.board_no_unique + "<br/>";
		unique_disabled = 1;
	}
	else
	{
		unique_disabled = 0;
	}
	if(xml_status[0].childNodes[0].firstChild.nodeValue & 2)
	{
		html += "<span style=\"color:#ff0000\">" + g_json.board_administrator + "</span><br/>";
	}
	html += "</b>";
	
	$("area51").innerHTML = html;
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
	g_target_menu = 0;
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
function show_menu(obj , pop_n , source)
{//0:ignore 1:show 2:ignore(sign) 3:show(sign) 4:delete 5:restore 6:verify 7:delete(sign) 8:restore(sign) 9:verify(sign) 10:ignore(unique) 11:show(unique)
	//xml_message.
	menu = $("a_menu");
	target_id = getContent(obj);
	if(g_res_number)
	{
		target_id = target_id.substring(1 , target_id.length - 1);
		var resid = IdNumConvert(target_id);
		if(resid != -1) target_id = resid;
	}
	g_target_object = obj;
	if(source == 1)
	{//remove ">>"
		target_id = target_id.replace(/>>/ , "");
	}
	
	g_target_message = null;
	g_target_message_n = -1;
	for(n = 0 ; n < xml_message.length ; n++)
	{
		if(xml_message[n].childNodes[3].firstChild.nodeValue == target_id)
		{
			g_target_message = xml_message[n];
			g_target_message_n = n;
			break;
		}
	}
	if(g_target_message == null) return;
	
	html = "";
	html += "<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" class=\"menu2\">";
	if(pop_n || source)
	{
		html += "<tr onclick=\"javascript:menu_command2(3);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_jump+"</td></tr>";//jump
		html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
	}
	html += "<tr onclick=\"javascript:menu_command2(4," + pop_n + ");\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_show_replies+"</td></tr>";//show replies
	html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
	html += "<tr onclick=\"javascript:menu_command2(0);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_reply+"</td></tr>";//reply
	html += "<tr onclick=\"javascript:menu_command2(1);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_quote_reply+"</td></tr>";//quote & reply
	if(Prototype.Browser.IE)
	{
		if(g_res_number)
		{
			html += "<tr onclick=\"javascript:menu_command2(2);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_copy_number+"</td></tr>";//copy number
		}
		else
		{
			html += "<tr onclick=\"javascript:menu_command2(2);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_copy_id+"</td></tr>";//copy id
		}
	}
	html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
	
	if((g_target_message.childNodes[1].firstChild.nodeValue & 1) == 0)
	{//message ignore
		html += "<tr onclick=\"javascript:menu_command(0);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_ignore+"</td></tr>";
	}
	else
	{//show
		html += "<tr onclick=\"javascript:menu_command(1);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_show+"</td></tr>";
	}
	if(g_target_message.childNodes[12].firstChild.nodeValue & 1)
	{
		if((g_target_message.childNodes[1].firstChild.nodeValue & 2) == 0)
		{//sign ignore
			html += "<tr onclick=\"javascript:menu_command(2);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_ignore_sign+"</td></tr>";
		}
		else
		{//show
			html += "<tr onclick=\"javascript:menu_command(3);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_show_sign+"</td></tr>";
		}
	}
	if((xml_boardinfo[0].childNodes[3].firstChild.nodeValue & 1) == 0)
	{//unique enabled
		if((g_target_message.childNodes[1].firstChild.nodeValue & 128) == 0)
		{//unique ignore
			html += "<tr onclick=\"javascript:menu_command(10);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_ignore_unique+"</td></tr>";
		}
		else
		{//show
			html += "<tr onclick=\"javascript:menu_command(11);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_show_unique+"</td></tr>";
		}
	}
	if(xml_status[0].childNodes[0].firstChild.nodeValue & 2)
	{//administrator
		if(xml_boardmask[0] == 1)
		{//black list
			html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
			if((g_target_message.childNodes[1].firstChild.nodeValue & 4) == 0)
			{//message delete
				html += "<tr onclick=\"javascript:menu_command(4);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_delete+"</td></tr>";
			}
			else
			{
				html += "<tr onclick=\"javascript:menu_command(5);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_restore+"</td></tr>";
			}
			if(g_target_message.childNodes[12].firstChild.nodeValue & 1)
			{
				if((g_target_message.childNodes[1].firstChild.nodeValue & 8) == 0)
				{//sign delete
					html += "<tr onclick=\"javascript:menu_command(7);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_delete_sign+"</td></tr>";
				}
				else
				{
					html += "<tr onclick=\"javascript:menu_command(8);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_restore_sign+"</td></tr>";
				}
			}
		}
		else
		{//white list
			html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
			if((g_target_message.childNodes[1].firstChild.nodeValue & 16) == 0)
			{//message verify
				html += "<tr onclick=\"javascript:menu_command(6);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_verify+"</td></tr>";
			}
			else
			{
				html += "<tr onclick=\"javascript:menu_command(5);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_delete+"</td></tr>";
			}
			if(g_target_message.childNodes[12].firstChild.nodeValue & 1)
			{
				if((g_target_message.childNodes[1].firstChild.nodeValue & 32) == 0)
				{//sign verify
					html += "<tr onclick=\"javascript:menu_command(9);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_verify_sign+"</td></tr>";
				}
				else
				{
					html += "<tr onclick=\"javascript:menu_command(8);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_delete_sign+"</td></tr>";
				}
			}
		}
	}
	
	html += "</table>";
	
	show_menu_core(html , obj , 0 , pop_n);
}
function show_menu2(obj)
{
	menu = $("a_menu");
	g_target_text = getContent(obj);
	g_target_object = obj;
	
	html = "";
	html += "<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" class=\"menu2\">";
	html += "<tr onclick=\"javascript:menu_command3(0);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_open_uri+"</td></tr>";//open uri
	if(Prototype.Browser.IE)
	{
		html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
		html += "<tr onclick=\"javascript:menu_command3(1);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_copy_to_clipboard+"</td></tr>";//copy to clipboard
	}
	
	html += "</table>";
	
	show_menu_core(html , obj , 1);
}
function show_menu3(obj)
{
	menu = $("a_menu");
	g_target_text = getContent(obj);
	
	html = "";
	html += "<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" class=\"menu2\">";
	html += "<tr onclick=\"javascript:menu_command3(2);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_download+"</td></tr>";//download
	if(Prototype.Browser.IE)
	{
		html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
		html += "<tr onclick=\"javascript:menu_command3(1);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_copy_to_clipboard+"</td></tr>";//copy to clipboard
	}
	
	html += "</table>";
	
	show_menu_core(html , obj , 1);
}
function show_menu4(obj , pop_n)
{
	menu = $("a_menu");
	g_target_text = getContent(obj);
	g_target_object = obj;
	
	html = "";
	html += "<table border=\"0\" cellpadding=\"2\" cellspacing=\"0\" class=\"menu2\">";
	html += "<tr onclick=\"javascript:menu_command2(5," + pop_n + ");\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_show_messages+"</td></tr>";//show messages
	html += "<tr onmouseover=\"javascript:view_menu();\"><td height=\"1\" align=\"center\" style=\"cursor:default\"><hr style=\"margin:0px;border:0px;padding:0px;height:1px;width:95%;background-color:#707070\"></td></tr>";//border
	html += "<tr onclick=\"javascript:menu_command3(1);\" onmouseover=\"javascript:this.bgColor='"+g_menu_color2+"';view_menu();\" onmouseout=\"javascript:this.bgColor='"+g_menu_color+"'\"><td style=\"cursor:default\">"+g_json.board_menu_copy_to_clipboard+"</td></tr>";//copy to clipboard
	
	html += "</table>";
	
	show_menu_core(html , obj , 1);
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
function menu_success(httpObject)
{
	if(httpObject.status == 200)
	{//success
		if(g_target_menu == 0)
		{//ignore
			g_target_message.childNodes[1].firstChild.nodeValue |= 1;
		}
		else if(g_target_menu == 1)
		{//show
			g_target_message.childNodes[1].firstChild.nodeValue &= ~1;
		}
		else if(g_target_menu == 4)
		{//delete
			g_target_message.childNodes[1].firstChild.nodeValue |= 4;
			g_target_message.childNodes[1].firstChild.nodeValue &= ~16;
		}
		else if(g_target_menu == 5)
		{//restore
			g_target_message.childNodes[1].firstChild.nodeValue &= ~4;
			g_target_message.childNodes[1].firstChild.nodeValue &= ~16;
		}
		else if(g_target_menu == 6)
		{//verify
			g_target_message.childNodes[1].firstChild.nodeValue &= ~4;
			g_target_message.childNodes[1].firstChild.nodeValue |= 16;
		}
		if((g_target_menu == 0) || (g_target_menu == 1) || (g_target_menu == 4) || (g_target_menu == 5) || (g_target_menu == 6))
		{
			html = "";
			display_message(g_target_message , 0 , 0);
			document.getElementById(g_target_message.childNodes[3].firstChild.nodeValue).innerHTML = html;
		}
		else
		{
			reload_window();
		}
	}
	else
	{
		menu_fail(httpObject);
	}
}
function menu_fail(httpObject)
{
}
function menu_command(command)
{
	g_target_menu = command;
	post_data = "id=" + encodeURIComponent(g_target_message.childNodes[3].firstChild.nodeValue) + "&menu=" + g_target_menu;
	hide_popup();
	hide_menu();
	new Ajax.Request("/menu" , {method:"post" , postBody:post_data , onComplete:menu_success , onFailure:menu_fail});
}
function menu_command2(command , pop_n)
{
	if((command == 0) || (command == 1))
	{
		textbox = document.getElementById("text");
		if(g_res_number)
		{
			text = ">>" + g_target_message.childNodes[0].firstChild.nodeValue + "\r\n";
		}
		else
		{
			text = ">>" + g_target_message.childNodes[3].firstChild.nodeValue + "\r\n";
		}
		
		if(command == 1)
		{//quote
			lines = g_target_message.childNodes[11].firstChild.nodeValue.split("<br/>");
			for(n = 0 ; n < lines.length ; n++)
			{
				text += "> " + lines[n].unescapeHTML() + "\r\n";
			}
		}
		
		textbox.value = text;
		textbox.focus();
		Element.scrollTo(textbox);
	}
	else if(command == 2)
	{//copy id or number
		if(Prototype.Browser.IE)
		{
			if(g_res_number) clipboardData.setData("Text" , ">>" + (g_target_message_n + 1) + "\r\n");
			else clipboardData.setData("Text" , ">>" + g_target_message.childNodes[3].firstChild.nodeValue + "\r\n");
		}
		hide_menu();
		check_popup();
		return;
	}
	else if(command == 3)
	{//jump
		if(g_target_message != null)
		{
			if((board_option_start <= g_target_message_n) && (g_target_message_n <= board_option_end))
			{//in view
				Element.scrollTo($(g_target_message.childNodes[3].firstChild.nodeValue));
			}
			else
			{//out of view
				n = (Math.floor(g_target_message_n / 100)) * 100;
				if(n >= 900) n = 900;
				cookie_set("reload_n" , g_target_message_n , 1);
				location.href = "../" + g_id_string + "/" + n + "-" + (n + 100);
			}
		}
	}
	else if(command == 4)
	{//show replies
		hide_menu();
		text = g_target_message.childNodes[3].firstChild.nodeValue;
		show_popup(g_target_object , text , pop_n , 1);
		return;
	}
	else if(command == 5)
	{//show messages of specified sign
		hide_menu();
		text = g_target_text;
		show_popup(g_target_object , text , pop_n , 2);
		return;
	}
	hide_menu();
	hide_popup();
}
function menu_success2(httpObject)
{
}
function menu_fail2(httpObject)
{
}
function menu_command3(command)
{//g_target_text
	if((command == 0) || (command == 2))
	{//uri
		post_data = "text=" + encodeURIComponent(g_target_text) + "&menu2=" + command;
		new Ajax.Request("/menu2" , {method:"post" , postBody:post_data , onComplete:menu_success2 , onFailure:menu_fail2});
	}
	else if(command == 1)
	{//copy to clipboard
		if(Prototype.Browser.IE) clipboardData.setData("Text" , g_target_text);
	}
	hide_menu();
	hide_popup();
}

function display_finish()
{//enable sign if the board requires signed message.
	if(require_sign == 1)
	{
		document.getElementById("sign").checked = true;
		check_sign();
	}
	x = parseInt(cookie_get("reload_x"));
	y = parseInt(cookie_get("reload_y"));
	if((isNaN(x) == 0) && (isNaN(y) == 0))
	{
		if(Prototype.Browser.IE)
		{
			document.documentElement.scrollLeft = x;
			document.documentElement.scrollTop = y;
		}
		else
		{
			window.scrollTo(x , y);
		}
	}
	x = parseInt(cookie_get("reload_n"));
	if(x != 0)
	{
		if((board_option_start <= x) && (x <= board_option_end))
		{//in view
			Element.scrollTo($(xml_message[x].childNodes[3].firstChild.nodeValue));
		}
	}
	cookie_clear("reload_x");
	cookie_clear("reload_y");
	cookie_clear("reload_n");
}

function check_sign()
{
	checkbox = document.getElementById("sign");
	namebox = document.getElementById("name");
	if(checkbox.checked == true)
	{//sign
		store_name = namebox.value;//store name
		new Ajax.Request("/current_sign.xml" , {method:"get" , onComplete:check_sign_success , onFailure:check_sign_fail});//get current sign
	}
	else
	{//no sign
		namebox.value = store_name;//restore name
		namebox.disabled = false;
	}
}
function check_sign_success(httpObject)
{
	xml2 = httpObject.responseXML;
	sign = xml2.getElementsByTagName("sign");
	if(sign.length == 0)
	{
		check_sign_fail(httpObject);
		return;
	}
	namebox = document.getElementById("name");
	namebox.disabled = true;//readonly , disabled
	namebox.value = sign[0].childNodes[0].firstChild.nodeValue;
	set_error(0 , 0);
	display_error();
}
function check_sign_fail(httpObject)
{
	document.getElementById("sign").checked = false;
	document.getElementById("name").disabled = false;

	set_error(0 , 1);
	display_error();
}

function post_get_status(httpObject)
{
	if(httpObject.status == 200)
	{
		xml_status = httpObject.responseXML.getElementsByTagName("status");
		display_status();
	}
	post();
}
function post()
{//post message
	var view_name , view_text;
	
	set_error(0 , 0);
	if(xml_status[0].childNodes[0].firstChild.nodeValue & 1)
	{
		set_error(4,0);
	}
	else
	{//no download register
		if(status_flag == 0)
		{//get up-to-date status
			status_flag = 1;
			new Ajax.Request("/" + g_id_string + ".xml?status" , {method:"get" , onComplete:post_get_status , onFailure:post_get_status});
			return;
		}
		set_error(4,1);
	}
	status_flag = 0;

	backup_sign = document.getElementById("sign").checked;
	if(require_sign == 1)
	{
		set_error(3,(backup_sign != true));//require sign
	}
	backup_name = document.getElementById("name").value;
	if(backup_name == "")
	{//get default name
		view_name = xml_boardinfo[0].childNodes[1].firstChild.nodeValue;
		post_name = backup_name;
	}
	else
	{
		view_name = backup_name;
		if(g_res_number && (backup_name == backup_name.match(/\d{1,3}/)))
		{//get ID number
			var resid = IdNumConvert(backup_name);
			if(resid != -1){
				post_name = resid;
			}else{
				post_name = backup_name;
			}
		}
		else
		{//backup name
			post_name = backup_name;
		}
	}
	
	if(backup_sign != true)
	{
		set_error(2,(post_name.indexOf("@") != -1));//"@" is only for sign.
	}
	else
	{
		set_error(2,0);
	}
	backup_title = document.getElementById("title").value;
	backup_text = document.getElementById("text").value;
	set_error(1,(backup_text.length == 0));//no message field.
	
	post_title = backup_title;
	post_text = backup_text;
	
	view_text = post_text.escapeHTML().replace(/\x0D\x0A|\x0D|\x0A/g , "<br/>");
	if(view_text.split("<br/>").length > 40)
	{
		set_error(5,1);
	}
	else
	{
		set_error(5,(post_text.length >= 2048));
	}

	if(display_error())
	{
		return;
	}
	if(g_res_number)
	{
		post_text = post_text.replace(/(>>)(\d{1,4})/g ,
			function(n0,n1,n2){	
				var resid = IdNumConvert(n2);
				if(resid != -1)
					return n1 + resid;
				else
					return n0;
			}
		);
	}
	
	$("area52").hide();//style.display = "none";
	html = "";//message confirmation
	html += "<font color=\"red\"><p><b>" + g_json.post_confirm;
	html += "</b></p></font>";
	html += g_json.post_name + view_name + "<br/>";
	html += g_json.post_title + post_title + "<br/>";
	html += view_text + "<br/>";
	html += "<form id=\"postform2\" action=\"javascript:void 0;\">\
<input type=\"submit\" id=\"submit\" value=\"" + g_json.post_post + "\" onClick=\"post2()\"/> \
<input type=\"submit\" id=\"cancel\" value=\"" + g_json.cancel + "\" onClick=\"post_cancel(true)\"/>\
</form>";
	$("area54").innerHTML = html;
	Element.scrollTo($("area51"));//scroll to info
	//window.scrollTo(0,0);
}
function post2()
{//send message
	post_data = "name=" + encodeURIComponent(post_name) + "&sign=" + encodeURIComponent(backup_sign) + "&title=" + 
		encodeURIComponent(post_title) + "&text=" + encodeURIComponent(post_text);
	new Ajax.Request("/postmessage" , {method:"post" , postBody:post_data , onComplete:post2_success , onFailure:post2_fail});
}
function post2_success(httpObject)
{
	if(httpObject.status == 200)
	{//success
		backup_name = "";
		backup_sign = 0;
		backup_title = "";
		backup_text = "";
		$("area53").innerHTML = "<p>" + g_json.post_success + "</p>";
		$("area54").innerHTML = "<input type=\"button\" id=\"ok\" value=\"" + g_json.ok + "\" onClick=\"board_new(0)\"/>";
	}
	else
	{//failed
		post2_fail(httpObject);
	}
}
function post2_fail(httpObject)
{
	//$("area52").innerHTML = "";
	if(httpObject.status == 418)
	{
		$("area53").innerHTML = "<p>" + g_json.e_post_limit + "</p>";
	}
	else
	{
		$("area53").innerHTML = "<p>" + g_json.post_failed + "</p>";
	}
	$("area54").innerHTML = "<input type=\"button\" id=\"ok\" value=\"" + g_json.ok + "\" onClick=\"board_new(1)\"/>";
}
function board_new(error)
{
	$("area52").show();//style.display = "";
	$("area53").innerHTML = "";
	post_cancel(error);
	display_finish();
}
function post_cancel(view_post)
{
	$("area52").show();//style.display = "";
	post_initialize();
	if(backup_sign == true)
	{
		document.getElementById("sign").checked = true;
		check_sign();
	}
	else
	{
		document.getElementById("sign").checked = false;
		document.getElementById("name").value = backup_name;
	}
	document.getElementById("title").value = backup_title;
	document.getElementById("text").value = backup_text;
	if(view_post)
	{
		$("area54").scrollIntoView(true);
	}
}

function set_error(number , flag)
{
	if(number < error_information.length)
	{
		if(flag == 0)
		{
			error_information[number][0] = 0;
		}
		else
		{
			error_information[number][0] = 1;
		}
	}
}
function display_error()
{
	ret = false;
	error_area = "area53";
	$(error_area).innerHTML = "";
	for(n = 0 ; n < error_information.length ; n++)
	{
		if(error_information[n][0] == 1)
		{
			$(error_area).innerHTML += "<p>" + error_information[n][1] + "</p>";
			ret = true;
		}
	}
	return ret;
}
function display_fail(httpObject)
{
	$("area51").innerHTML = "error - " + g_id_string;
}

function open_xml()
{
	location.href = "../" + g_id_string + ".xml";
}
function save_xml()
{
	var dY,dM,dD;
	date = new Date(identification[0].childNodes[5].firstChild.nodeValue);
	dY = date.getYear() % 100;
	dM = (date.getMonth()+1  > 9)? date.getMonth()+1 : "0"+(date.getMonth()+1);
	dD = (date.getDate()     > 9)? date.getDate()    : "0"+date.getDate();
	text = identification[0].childNodes[2].childNodes[0].firstChild.nodeValue + " [" + dY + dM + dD + "]";//date + board name
	
	view_command("command=0&text=" + text);//save xml
}


function getStyleValue(selector , property , sheetindex)
{
	selector = selector.toLowerCase();
	if(sheetindex == undefined) sheetindex = 0;
	if(property.indexOf( "-" ) != -1) property = property.camelize( );
	var rules = document.styleSheets[sheetindex].rules //IE
		|| document.styleSheets[sheetindex].cssRules; //Mozilla

	for(i = rules.length - 1 ; i >= 0 ; i--)
	{
		var rule = rules[i];
		if((rule.selectorText.toLowerCase( ) != selector) || (rule.style[ property ] == "")) continue;
		return rule.style[property];
	}
	
	return null;
}
function convertColor(color)
{
	if(color.match(/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/))
	{
		r = RegExp.$1;
		g = RegExp.$2;
		b = RegExp.$3;
		r = parseInt(r).toString(16);
		if (r.length == 1) r = '0' + r;
		g = parseInt(g).toString(16);
		if (g.length == 1) g = '0' + g;
		b = parseInt(b).toString(16);
		if (b.length == 1) b = '0' + b;
		return "#" + r + g + b;
	}
	else
	{
		return color;
	}
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
function reload_window()
{
	//x = (window.pageXOffset != null) ? window.pageXOffset : document.body.scrollLeft;//document.getElementsByTagName("body")[0]
	x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	cookie_set("reload_x" , x , 1);
	//x = (window.pageYOffset != null) ? window.pageYOffset : document.body.scrollTop;
	x = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	cookie_set("reload_y" , x , 1);
	
	location.reload();
}
function cookie_clear(name)
{//clear cookie
	document.cookie = name + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT;";//path=/";
}
function cookie_get(name)
{//get cookie
	value = null;
	var cookie_text = document.cookie;
	var position = cookie_text.indexOf(name + "=");
	if(position != -1)
	{
		n = position + (name + "=").length;
		m = cookie_text.indexOf(";",n);
		if(m == -1) m = cookie_text.length;
		value = cookie_text.substring(n , m);
	}
	if((Prototype.Browser.Opera) && (value != null))
	{
		value = value.replace(/%22/g, '"');
	}
	
	return value;
}
function cookie_set(name , value , life)
{//life (days)
	if(Prototype.Browser.Opera)
	{
		value = value.replace(/"/g, "%22");
	}
	var date = new Date();
	date.setTime(date.getTime() + (life * 24*60*60*1000));
	var expires = ";expires=" + date.toGMTString();
	document.cookie = name + "=" + value + expires;//escape(value)// + ';path=/';//value
}

/*if(typeof(obj.parentElement) != "undefined")
	{
		obj.parentElement;
	}
	else
	{
		obj.parentNode;
	}*/
	