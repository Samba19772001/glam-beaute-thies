(function(){
var $=function(id){return document.getElementById(id)};
var each=function(l,f){Array.prototype.forEach.call(l,f)};
var T=[["Fuchsia Thiès","#cd2f80","#fff"],["Bordeaux","#8e1b3a","#fff"],["Or Saloum","#d4a03c","#3a1541"],["Nude Sahel","#d9a38f","#3a1541"]];
var pick=$("pick");
function setTint(i){document.documentElement.style.setProperty("--accent",T[i][1]);document.documentElement.style.setProperty("--on",T[i][2]);$("cname").textContent=T[i][0];
each(pick.children,function(b,j){b.setAttribute("aria-pressed",j===i?"true":"false")});
try{localStorage.setItem("glam-teinte",String(i))}catch(e){}}
T.forEach(function(t,i){var b=document.createElement("button");b.type="button";b.style.background=t[1];b.setAttribute("aria-label",t[0]);b.onclick=function(){setTint(i)};pick.appendChild(b)});
var s=0;try{s=parseInt(localStorage.getItem("glam-teinte"),10)||0}catch(e){}
setTint(s<T.length?s:0);
var nav=$("nav"),burger=$("burger"),menu=$("menu");
burger.onclick=function(){var o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",String(o))};
menu.onclick=function(e){if(e.target.tagName==="A"){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}};
function sc(){nav.classList.toggle("solid",window.scrollY>40)}
window.addEventListener("scroll",sc,{passive:true});sc();
var d=new Date(),dy=d.getUTCDay(),mn=d.getUTCHours()*60+d.getUTCMinutes(),ok=dy>0&&mn>=600&&mn<1170,t;
if(ok)t="Ouvert maintenant, jusqu'à 19h30";else if(dy>0&&mn<600)t="Ouvre aujourd'hui à 10h";else if(dy===6)t="Fermé, ouvre lundi à 10h";else t="Fermé, ouvre demain à 10h";
$("open").textContent=t;$("open").className=ok?"on":"";
var tabs=$("tabs"),gal=$("gal"),lb=$("lb"),li=lb.querySelector("img");
tabs.onclick=function(e){var b=e.target.closest("button");if(!b)return;var f=b.getAttribute("data-f");
each(tabs.children,function(x){x.classList.toggle("on",x===b)});
each(gal.children,function(g){g.hidden=(f!=="all"&&g.getAttribute("data-c")!==f)})};
gal.onclick=function(e){var g=e.target.closest("figure");if(!g)return;var im=g.querySelector("img");li.src=im.src;li.alt=im.alt;lb.showModal()};
lb.onclick=function(){lb.close()};
function upd(){var n=$("nom").value.trim(),j=$("jour").value.trim();
var m="Bonjour Glam Beauté"+(n?", je m'appelle "+n:"")+". Je voudrais un rendez-vous pour : "+$("svc").value+(j?", "+j:"")+".";
$("go").href="https://wa.me/221776337105?text="+encodeURIComponent(m)}
["nom","svc","jour"].forEach(function(id){$(id).addEventListener("input",upd);$(id).addEventListener("change",upd)});upd();
each(document.querySelectorAll("[data-s]"),function(b){b.onclick=function(){$("svc").value=b.getAttribute("data-s");upd();$("rdv").scrollIntoView({behavior:"smooth"})}});
})();
