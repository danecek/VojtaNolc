var types = { BK:"knihy", SE:"seriály (periodika)", MP:"mapy", MU:"hudebniny", GP:"grafika",
              AM:"zvuk. záznamy", VM:"videozáznamy", ER:"el. zdroje", DG:"digitalizované dokumenty",
              MD:"mikrodokumenty", RP:"staré tisky" };
var google_request = "";
var obalky_request = "";
var set_no = "";
var sorted_by = "";
var line_key = new Array;

var obalky = obalky || {};
obalky.url = window.location.protocol + "//www.obalkyknih.cz";
obalky.callback = obalky.callback || display_cover;

function translate(title) {
for ( k in types )
  title = title.replace(new RegExp("dokumentu= "+k,"gi"),"dokumentu= " + types[k]);
return title.replace(/c\|/g,"č").replace(/r\|/g,"ř").replace(/s\|/g,"š").replace(/z\|/g,"ž");
}

function set_page() {
if ( document.getElementById("title") ) {
  t = document.getElementById("title");
  t.innerHTML = translate(t.innerHTML); }

if ( document.getElementById("sort_options") )
  set_no = document.getElementById("sort_options").innerHTML.replace(/.*set_number=/,"").replace(/\&.*/,"");

if ( document.getElementById("short_table") ) {
  t = document.getElementById("short_table");
  for ( var i = 1; i < t.rows.length; i++ ) {
    var r = t.rows[i];
    line_key[i] = r.cells[r.cells.length-1].innerHTML.replace(/<[^>]*>/g,"");
    if ( line_key[i].match(/^(is[bs]n|oclc)/i) )
      line_key[i] = line_key[i].replace(/[ .,;-]/g,""); else line_key[i] = line_key[i].replace(/[ .,;]/g,"");
    r.id = i;

    var link = r.cells[0].innerHTML.match(/href=[^>]*/);
    var s = r.cells[2].innerHTML.replace(/(\&nbsp;|\s)+/g," ").replace(/ +$/,"");
    if ( s.indexOf(" / ") != -1 )
      r.cells[2].innerHTML = "<a " + link + ">" + s.replace(" / ","</a> / ");
    else
      r.cells[2].innerHTML = "<a " + link + ">" + s + "</a>";

    if (( t.rows[0].cells[5].innerHTML == "Vlastník" ) || ( t.rows[0].cells[5].innerHTML == "Owner" ))
      r.cells[6].innerHTML = r.cells[6].innerHTML.replace(/- *$/,"- <a " + link + ">atd.</a>");
    else
      r.cells[7].innerHTML = r.cells[7].innerHTML.replace(/- *$/,"- <a " + link + ">atd.</a>");

    var key = line_key[i];
    if ( key != "" && i <= 25 ) {
      if ( key.match(/^(is[bs]n|oclc|nbn)/i) ) {
        if ( obalky_request != "" ) obalky_request += ",";
        obalky_request += "{\"permalink\":\"http://aleph.nkp.cz\",\"bibinfo\":{\"" + key.replace(/:.*/,"").toLowerCase() + "\":\"" + key.replace(/^[^:]*:/,"") + "\"},\"callbacks\":{\"id\":\"" + r.id + "\"}}";
        if ( google_request != "" ) google_request += ","; google_request += key; }
      }
    }
  if ( obalky_request != "" ) {
    cover_search = document.createElement("script");
    cover_search.setAttribute("type","text/javascript");
    cover_search.setAttribute("src","http://www.obalkyknih.cz/api/books?books=[" + encodeURIComponent(obalky_request) + "]");
    document.body.appendChild(cover_search); }
  if ( google_request != "" ) {
    google_search = document.createElement("script");
    google_search.setAttribute("type","text/javascript");
    google_search.setAttribute("src","http://books.google.com/books?jscmd=viewapi&bibkeys=" + google_request + "&callback=display_google");
    document.body.appendChild(google_search); }
  }
if ( window.get_counter ) get_counter();
}

function display_cover(books) {
for ( k in books ) {
  if ( books[k].cover_icon_url ) {
    var line = document.getElementById(books[k].callbacks.id);
    line.cells[2].innerHTML = "<a href='javascript:open_window_ext(\"" + books[k].cover_medium_url + "\")'><img src='" + books[k].cover_icon_url + "' class='thumbnail' align='left' style='visibility:hidden' onload='this.style.visibility=\"visible\"'></a>" + line.cells[2].innerHTML; }
  }
}
function display_google(books) {
for ( var i = 1; i < t.rows.length; i++ ) {
  var r = t.rows[i];
  var key = line_key[i]; info = books[key];
  if ( key in books && ( info.preview == "partial" || info.preview == "full" ))
    r.cells[2].innerHTML += "&nbsp; <a href='" + info.preview_url + "' target='_blank' title='Další informace a ukázky textu'><img src='http://aleph.nkp.cz/exlibris/aleph/u22_1/alephe/www_f_cze/icon/gb-preview.gif' border='0' align='middle'></a>";
  }
}
function display_rank(r) {
r = r.replace(/[^0-9]/g,'');
if ( sorted_by == 'RANK' ) {
  if ( r != '' ) r = Math.round(r/10); else r = 0;
  document.write("<div style='margin-top:5px; margin-left:5px; margin-right:5px; width:30pt; height:6.5pt; border:1px solid; text-align:left; font-size:2pt'>");
  document.write("<div style='width:" + r + "%; height:6.5pt; background-color:#B5CBE7'></div></div>");
  document.write(r + " %") }
}

