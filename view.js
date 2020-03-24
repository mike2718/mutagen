var g_id_string , g_option_string;//id string , option string
var g_json;//json text
var g_settings;//settings xml
var g_xml;//xml data
var g_ie_version;//ie version

function view_initialize()
{	
	//browser
	g_ie_version = 0;
	if(Prototype.Browser.IE)
	{
		var ua  = navigator.userAgent;
		var offset = ua.indexOf("MSIE ");
		if(offset != -1)
		{
			g_ie_version = parseFloat(ua.substring(offset + 5,ua.indexOf(";",offset)));
		}
	}
	
	//keydown
	document.onkeydown = view_keydown;
	
	//get xml filename
	document.URL.match("http://([0-9a-zA-Z\.:]+)/([0-9a-zA-Z%\+\-]+)/?(.*)");//'\+' for windows 2000
	g_id_string = RegExp.$2.replace(/\+/g , "%2B");//for windows2000
	g_option_string = RegExp.$3;
	
	//load json (language dependent text file)
	new Ajax.Request("/json.txt" , {method:"get" , onComplete:view_initialize2 , onFailure:view_fail});
}
function view_initialize2(httpObject)
{
	//process json
	g_json = eval("(" + httpObject.responseText + ")");
	//load settings
	new Ajax.Request("/settings.xml" , {method:"get" , onComplete:view_initialize3 , onFailure:view_fail});
}
function view_initialize3(httpObject)
{
	//process settings
	g_settings = httpObject.responseXML;
	//load xml
	new Ajax.Request("/" + g_id_string + ".xml" , {method:"get" , onComplete:view_display , onFailure:view_fail_xml});
}

function view_keycode(e)
{
	var e=window.event || e;
	if(document.all) return e.keyCode;
	else if(document.getElementById) return e.keyCode ? e.keyCode : e.charCode;
	else if(document.layers) return e.which;
}
function view_keydown(e)
{
	if(document.all && view_keycode(e) == 27)
	{//skip ESC key
		return false;
	}
	return true;
}

function view_display(httpObject)
{
	//process xml
	g_xml = httpObject.responseXML;
	
	if(g_xml.getElementsByTagName("kashin").length)
	{
		js_to_load = "/kashin.js";
	}
	else if(g_xml.getElementsByTagName("board").length)
	{
		js_to_load = "/board.js";
	}
	else
	{
		js_to_load = "";
	}
	
	if(js_to_load != "")
	{//load javascript
		new Ajax.Request(js_to_load , {method:"get" , onComplete:view_display2 , onFailure:view_fail});
	}
	else
	{//error
		view_fail_xml();
	}
}
function view_display2(httpObject)
{
	//script
	var script = document.createElement("script");
	script.type = "text/javascript";
	//script.src = "/test.js";//このコードだと、読み込まれるまで待機する必要がある（setTimeout("initialize()",1000);）。
	script.text = httpObject.responseText;
	document.documentElement.appendChild(script);
	
	initialize();
}

function view_fail(httpObject)
{
	$("area51").innerHTML = "error.";
}
function view_fail_xml(httpObject)
{
	$("area51").innerHTML = g_json.e_no_xml;
}

function view_change_css(id , url , onload)
{
	if(!document.getElementById) return false;
	var element = document.getElementById(id);
	if(!element) return false;
	element.href = url;
	if(onload) setTimeout(onload , 50);
	return true;
}

function view_add_button()
{
	//open xml
	button = document.createElement("input");
	button.type = "button";
	button.id = "button1";
	button.className = "button1";
	button.value = "open xml";
	button.onclick = function(){open_xml();};
	$("area50").appendChild(button);
	
	//save xml
	button = document.createElement("input");
	button.type = "button";
	button.id = "button2";
	button.className = "button1";
	button.value = "save xml";
	button.onclick = function(){save_xml();};
	$("area50").appendChild(button);
}

function view_add_div(id , class_name)
{
	div = document.createElement("div");
	div.id = id;
	div.className = class_name;
	
	document.body.appendChild(div);
}

function view_command(post_data)
{
	//command 0: save xml. text=file name
	new Ajax.Request("/view_command" , {method:"post" , postBody:post_data , onComplete:view_command_success , onFailure:view_command_fail});
}
function view_command_success(httpObject)
{
}
function view_command_fail(httpObject)
{
}
