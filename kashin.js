var html;

function initialize()
{
	view_change_css("css1" , "/kashin.css" , function(){initialize2()});
}
function initialize2()
{
	view_add_button();
	display();
}

function display()
{
	html = "";
	html += "<div class=\"status\">";	//ステータス開始
	g_xml_status = g_xml.getElementsByTagName("status");
	html += g_json.status + " : ";
	if(g_xml_status[0].childNodes[0].firstChild.nodeValue == 0)
	{
		html += g_json.s_warning + "<br/>";
	}
	else
	{
		html += g_json.s_download + "<br/>";
	}
	identification = g_xml.getElementsByTagName("identification");
	html += g_json.id + " : " + identification[0].childNodes[0].firstChild.nodeValue + "<br/>";
	html += g_json.keyword + " : " + identification[0].childNodes[1].childNodes[0].firstChild.nodeValue + "<br/>";
	keywordname = identification[0].childNodes[1].getElementsByTagName("keywordname");
	n = keywordname.length;
	for(i = 0 ; i < n ; i++)
	{
		if(i != (n - 1))
		{
			html += keywordname[i].firstChild.nodeValue + " ";
		}
		else
		{
			html += keywordname[i].firstChild.nodeValue + "<br/>";
		}
	}
	html += g_json.size + " : " + identification[0].childNodes[2].firstChild.nodeValue + " bytes.<br/>";
	date1 = new Date(identification[0].childNodes[4].firstChild.nodeValue);
	html += g_json.date + " : " + date1.toLocaleString() + "<br/>";
	html += g_json.count + " : " + identification[0].childNodes[7].firstChild.nodeValue + "<br/>";
	html += g_json.review + " : " + identification[0].childNodes[5].firstChild.nodeValue + " (" + 
		identification[0].childNodes[6].firstChild.nodeValue + ") [";
	
	review_count = 0;
	hq_count = 0;
	good_count = 0;
	bad_count = 0;
	review_value = g_xml.getElementsByTagName("reviewvalue");
	n = review_value.length;
	for(i = 0 ; i < n ; i++)
	{
		if(review_value[i].firstChild.nodeValue == 1)
		{
			hq_count++;
		}
		else if(review_value[i].firstChild.nodeValue == 2)
		{
			good_count++;
		}
		else if(review_value[i].firstChild.nodeValue == 3)
		{
			bad_count++;
		}
	}
	html += g_json.good + " : " + hq_count + " , " + g_json.normal + " : " + good_count + " , " + g_json.bad + " : " + bad_count + "] ";
	if(good_count == 0)
	{
		good_count = 1;
	}
	review_point = Math.round(50 * hq_count / good_count);
	if(review_point > 100)
	{
		review_point = 100;
	}
	html += review_point + " " + g_json.point + "<br/>";
	html += "</div>";	//ステータス終了
	//
	html += "<dl>";
	review = g_xml.getElementsByTagName("review");
	n = review.length;
	for(i = 0 ; i < n ; i++)
	{
		review_text = review[i].getElementsByTagName("text");
		if(review_text.length != 0)
		{
			display_review(review[i]);
		}
	}
	html += "</dl>";

	$("area51").innerHTML = html;
}

function display_review(review)
{
	html += "<div class=\"review\">";	//評価開始
	html += "<dt>";
	html += "<div class=\"reviewheader\">";	//ヘッダ開始
	html += g_json.review + " : ";
	review_value = review.getElementsByTagName("reviewvalue");
	if(review_value[0].firstChild.nodeValue == 1)
	{
		html += "<span class=\"good\">";
		html += g_json.good;
		html += "</span>";
	}
	else if(review_value[0].firstChild.nodeValue == 2)
	{
		html += "<span class=\"normal\">";
		html += g_json.normal;
		html += "</span>";
	}
	else if(review_value[0].firstChild.nodeValue == 3)
	{
		html += "<span class=\"bad\">";
		html += g_json.bad;
		html += "</span>";
	}
	else
	{
		html += "<span class=\"invalid\">";
		html += g_json.invalid;
		html += "</span>";
	}
	//review_text = review.getElementsByTagName("text")[0].firstChild.nodeValue.replace("\n" , "<br/>");
	review_text = review.getElementsByTagName("text")[0].firstChild.nodeValue;

	html += "</div>";	//ヘッダ終了
	html += "</dt>";
	html += "<dd>";
	html += "<div class=\"reviewmain\">";	//評価本文開始
	html += review_text;
	html += "<br><br>";
	html += "</div>";	//評価本文終了

	html += "<div class=\"reviewfooter\">";	//フッタ開始
	html += "</div>";	//フッタ終了
	html += "</dd>";
	html += "</div>";	//評価終了
}

function display_fail(httpObject)
{
	$("area51").innerHTML = "error - " + g_id_string;
}

function open_xml()
{
	location.href = g_id_string + ".xml";
}
function save_xml()
{
	var dY,dM,dD;
	date = new Date(identification[0].childNodes[4].firstChild.nodeValue);
	dY = date.getYear() % 100;
	dM = (date.getMonth()+1  > 9)? date.getMonth()+1 : "0"+(date.getMonth()+1);
	dD = (date.getDate()     > 9)? date.getDate()    : "0"+date.getDate();
	text = "[" + dY + dM + dD + "] " + identification[0].childNodes[1].childNodes[0].firstChild.nodeValue;//date + board name
	view_command("command=0&text=" + text);//save xml
}
