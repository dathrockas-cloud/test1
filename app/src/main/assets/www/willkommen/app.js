(function(){
'use strict';
var KEY='sg_launcher_v1',SHARED='sg_shared_v1',VERSION='1.0.0';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var IC={
phone:'<path d="M5 4l4-1 2 5-2 1.5a10 10 0 0 0 5 5L16 13l5 2-1 4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
people:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c3 .2 5 2.3 5 5.3"/>',
dial:'<circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
wa:'<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-2-2.5-1-1 1c-1-.4-2-1.4-2.4-2.4l1-1-1-2.5z"/>',
camera:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/>',
map:'<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
news:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/>',
play:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
book:'<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'};
function svg(n,sz){return '<svg viewBox="0 0 24 24" width="'+(sz||48)+'" height="'+(sz||48)+'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[n]||IC.star)+'</svg>'}
function defaults(){return {v:1,setup:false,pin:null,
 person:{name:'',device:'',cc:'49',greet:true},
 ui:{fs:1.1,hc:false,cols:2,theme:'gruen',clock:true,bg:'wiese',bgPhoto:''},
 health:{kasse:'',kasseUrl:'',kasseTel:'',vnr:'',arzt:'',arztTel:''},
 contacts:[],
 sos:{addr:'',notes:'',msg:'Hilfe! Hier ist {name}. Ich brauche Hilfe. Bitte rufen Sie mich an.'},
 tiles:[
  {id:'t1',label:'Anrufen',kind:'contacts',url:'',icon:'people',color:'#2e7d32',on:true},
  {id:'t2',label:'Nummer wählen',kind:'dial',url:'',icon:'dial',color:'#1b5e20',on:true},
  {id:'t3',label:'Nachrichten',kind:'sms',url:'',icon:'chat',color:'#1565c0',on:true},
  {id:'t4',label:'WhatsApp',kind:'link',url:'https://wa.me/',pkg:'com.whatsapp',icon:'wa',color:'#00695c',on:true},
  {id:'t5',label:'Kamera',kind:'camera',url:'',icon:'camera',color:'#6a1b9a',on:true},
  {id:'t6',label:'Karte',kind:'link',url:'https://www.google.com/maps',pkg:'com.google.android.apps.maps',icon:'map',color:'#bf360c',on:true},
  {id:'t7',label:'Internet',kind:'link',url:'https://duckduckgo.com',pkg:'com.android.chrome',icon:'globe',color:'#283593',on:true},
  {id:'t8',label:'Wetter',kind:'link',url:'https://www.dwd.de',icon:'sun',color:'#e65100',on:true},
  {id:'t9',label:'Tagesschau',kind:'link',url:'https://www.tagesschau.de',icon:'news',color:'#37474f',on:true},
  {id:'t10',label:'Videos',kind:'link',url:'https://www.youtube.com',pkg:'com.google.android.youtube',icon:'play',color:'#b71c1c',on:true},
  {id:'t11',label:'E-Mail',kind:'mail',url:'',icon:'mail',color:'#0277bd',on:true},
  {id:'t13',label:'Krankenkasse',kind:'health',url:'',icon:'heart',color:'#8e24aa',on:true},
  {id:'t12',label:'Handy-Coach',kind:'link',url:'../lernen/',icon:'book',color:'#ad1457',on:true}]}}
var ST=load();
function load(){try{var j=JSON.parse(localStorage.getItem(KEY)||'null');if(!j)return defaults();var d=defaults();return {v:1,setup:!!j.setup,pin:j.pin||null,person:Object.assign(d.person,j.person),ui:Object.assign(d.ui,j.ui),health:Object.assign(d.health,j.health),contacts:j.contacts||[],sos:Object.assign(d.sos,j.sos),tiles:j.tiles&&j.tiles.length?j.tiles:d.tiles}}catch(e){return defaults()}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(ST));localStorage.setItem(SHARED,JSON.stringify({name:ST.person.name,device:ST.person.device,fs:ST.ui.fs,hc:ST.ui.hc}))}catch(e){}applyUi()}
var THEMES={gruen:'#1f4d3a',blau:'#0d47a1',orange:'#bf360c'};
function bgUrl(k){if(k==='eigen')return ST.ui.bgPhoto||'';return (window.SG_BG||{})[k]||''}
function applyUi(){var r=document.documentElement.style;var u=ST.ui.hc?'':bgUrl(ST.ui.bg),b=document.body.style;b.backgroundImage=u?'url("'+u+'")':'none';b.backgroundSize='cover';b.backgroundPosition='center top';b.backgroundAttachment='fixed';r.setProperty('--fs',ST.ui.fs);r.setProperty('--acc',THEMES[ST.ui.theme]||THEMES.gruen);document.body.classList.toggle('hc',!!ST.ui.hc)}
function digits(s){return String(s||'').replace(/[^\d+]/g,'')}
function danger(n){var d=String(n).replace(/\D/g,'');return d==='112'||d==='110'||d==='116117'}
function intl(n){var d=digits(n);if(d.indexOf('+')===0)return d.slice(1);if(d.indexOf('00')===0)return d.slice(2);if(d.indexOf('0')===0)return (ST.person.cc||'49')+d.slice(1);return d}
var IOS=/iPhone|iPad|iPod/.test(navigator.userAgent);
function smsLink(n,body){return 'sms:'+digits(n)+(body?(IOS?'&':'?')+'body='+encodeURIComponent(body):'')}
function uid(){return 'c'+Date.now().toString(36)+Math.floor(Math.random()*1e4).toString(36)}
function go(h){if(location.hash===h)render();else location.hash=h}
function initials(n){return (String(n).trim()[0]||'?').toUpperCase()}
function avatar(c,big){return c.photo?'<img class="av'+(big?' big':'')+'" src="'+esc(c.photo)+'" alt="">':'<span class="av'+(big?' big':'')+'" aria-hidden="true">'+esc(initials(c.name))+'</span>'}
/* ---- PIN / Admin ---- */
var AUTH=0,FAILS=0,LOCK=0;
function authed(){return Date.now()<AUTH}
function touch(){AUTH=Date.now()+5*60*1000}
function fnv(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return ('0000000'+(h>>>0).toString(16)).slice(-8)}
function hash(s){try{if(window.crypto&&crypto.subtle&&window.TextEncoder){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.prototype.map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2)}).join('')})}}catch(e){}return Promise.resolve('f'+fnv(s)+fnv(s.split('').reverse().join('')))}
function setPin(pin){var salt=uid();return hash(salt+pin).then(function(h){ST.pin={salt:salt,hash:h};save()})}
function checkPin(pin){return hash(ST.pin.salt+pin).then(function(h){return h===ST.pin.hash})}
/* ---- helpers for views ---- */
function pad(){return '<div class="pad">'+'123456789'.split('').map(function(d){return '<button class="key" data-k="'+d+'">'+d+'</button>'}).join('')+'<button class="key small" data-k="x">Löschen</button><button class="key" data-k="0">0</button><button class="key small" data-k="ok">OK</button></div>'}
var V={},RT={};
function view(h,bind,opt){return {h:h,b:bind,sos:!(opt&&opt.nosos)}}
function greeting(){var hr=new Date().getHours(),g=hr<11?'Guten Morgen':hr<18?'Guten Tag':'Guten Abend';return g+(ST.person.name?', '+esc(ST.person.name):'')+'!'}
function tileIcon(t){return t.icon||(t.kind==='tel'?'phone':t.kind==='wa'?'wa':'link')}
function openTile(t){
 var k=t.kind;
 if(t.pkg&&window.AndroidApp){try{if(window.AndroidApp.openApp(t.pkg))return}catch(e){}}
 if(k==='contacts')go('#/kontakte');
 else if(k==='dial')go('#/wahl');
 else if(k==='health')go('#/gesundheit');
 else if(k==='camera')$('#cam').click();
 else if(k==='sms')location.href='sms:';
 else if(k==='mail')location.href='mailto:';
 else if(k==='tel'){if(danger(t.url)){alert('Für den Notruf nutzen Sie bitte den roten SOS-Knopf.');return}location.href='tel:'+digits(t.url)}
 else if(k==='wa')location.href='https://wa.me/'+intl(t.url);
 else{var u=t.url||'';if(/^https?:/i.test(u))window.open(u,'_blank','noopener');else if(u)location.href=u}
}
/* ---- Nutzer-Ansichten ---- */
V.home=function(){
 var favs=ST.contacts.filter(function(c){return c.fav}).slice(0,4),tl=ST.tiles.filter(function(t){return t.on});
 var h='<div class="clockbox">'+(ST.ui.clock?'<div class="time" id="clk"></div><div class="date" id="dt"></div>':'')+(ST.person.greet?'<div class="greet">'+greeting()+'</div>':'')+'</div>';
 if(favs.length)h+='<div class="favs">'+favs.map(function(c){return '<button class="fav" data-contact="'+c.id+'">'+avatar(c)+'<span>'+esc(c.name)+'</span></button>'}).join('')+'</div>';
 h+='<div class="grid" style="grid-template-columns:repeat('+ST.ui.cols+',1fr)">'+tl.map(function(t){return '<button class="tile" data-tile="'+t.id+'" style="background:'+esc(t.color)+'">'+svg(tileIcon(t),48)+'<span>'+esc(t.label)+'</span></button>'}).join('')+'</div>';
 return view(h,function(r){
  function tick(){var d=new Date(),c=$('#clk',r),a=$('#dt',r);if(c)c.textContent=d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});if(a)a.textContent=d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'})}
  tick();var iv=setInterval(tick,15000);RT.clean=function(){clearInterval(iv)};
  r.addEventListener('click',function(e){var t=e.target.closest('[data-tile]');if(t){var x=ST.tiles.filter(function(q){return q.id===t.getAttribute('data-tile')})[0];if(x)openTile(x);return}var c=e.target.closest('[data-contact]');if(c)go('#/kontakt/'+c.getAttribute('data-contact'))});
 });
};
V.kontakte=function(){
 var h='<a class="back" href="#/">‹ Zurück</a><h1>Meine Lieben</h1>';
 if(!ST.contacts.length)h+='<div class="card"><p>Noch keine Kontakte eingetragen. Die Betreuungsperson kann sie unter „Einstellungen“ anlegen.</p></div>';
 else h+='<ul class="list">'+ST.contacts.map(function(c){return '<li><button class="row" style="width:100%;text-align:left;font:inherit;cursor:pointer" data-contact="'+c.id+'">'+avatar(c)+'<span class="grow">'+esc(c.name)+'<span class="sm">'+esc(c.tel)+'</span></span></button></li>'}).join('')+'</ul>';
 return view(h,function(r){r.addEventListener('click',function(e){var c=e.target.closest('[data-contact]');if(c)go('#/kontakt/'+c.getAttribute('data-contact'))})});
};
V.kontakt=function(id){
 var c=ST.contacts.filter(function(x){return x.id===id})[0];if(!c)return V.kontakte();
 var h='<a class="back" href="#/kontakte">‹ Zurück</a><div class="cc">'+avatar(c,true)+'<h1>'+esc(c.name)+'</h1><p class="small">'+esc(c.tel)+'</p></div><a class="btn big" href="tel:'+esc(digits(c.tel))+'">Anrufen</a><a class="btn alt big" href="'+esc(smsLink(c.tel))+'">Nachricht schreiben</a><a class="btn alt big" target="_blank" rel="noopener" href="https://wa.me/'+esc(intl(c.tel))+'">WhatsApp öffnen</a>'+(IOS?'<a class="btn alt big" href="facetime:'+esc(digits(c.tel))+'">Videoanruf (FaceTime)</a>':'')+'<p class="small">Das Telefon öffnet sich. Angerufen wird, wenn Sie dort den grünen Hörer tippen.</p>';
 return view(h,function(){});
};
V.wahl=function(){
 var v='';
 var h='<a class="back" href="#/">‹ Zurück</a><h1>Nummer wählen</h1><div class="dial" id="dl">&nbsp;</div><div class="pad">'+'123456789'.split('').map(function(d){return '<button class="key" data-k="'+d+'">'+d+'</button>'}).join('')+'<button class="key small" data-k="x">Löschen</button><button class="key" data-k="0">0</button><span></span></div><a class="btn big" id="call" role="button" aria-disabled="true" href="#">Anrufen</a><p id="m" class="msg bad"></p>';
 return view(h,function(r){
  function u(){$('#dl',r).textContent=v||'\u00a0';var c=$('#call',r),m=$('#m',r);if(danger(v)){m.textContent='Für den Notruf nutzen Sie bitte den roten SOS-Knopf.';c.setAttribute('aria-disabled','true');c.setAttribute('href','#');return}m.textContent='';if(v.length>=3){c.removeAttribute('aria-disabled');c.setAttribute('href','tel:'+v)}else{c.setAttribute('aria-disabled','true');c.setAttribute('href','#')}}
  r.addEventListener('click',function(e){var k=e.target.closest('[data-k]');if(k){var d=k.getAttribute('data-k');if(d==='x')v=v.slice(0,-1);else if(v.length<16)v+=d;u();return}var c=e.target.closest('#call');if(c&&c.getAttribute('aria-disabled')==='true')e.preventDefault()});
  u();
 });
};
var KK=[['AOK','https://www.aok.de'],['Techniker Krankenkasse (TK)','https://www.tk.de'],['BARMER','https://www.barmer.de'],['DAK-Gesundheit','https://www.dak.de'],['IKK classic','https://www.ikk-classic.de'],['KKH','https://www.kkh.de'],['hkk','https://www.hkk.de'],['HEK','https://www.hek.de'],['Knappschaft','https://www.knappschaft.de'],['SBK','https://www.sbk.org'],['mobil krankenkasse','https://www.mobil-krankenkasse.de'],['IKK gesund plus','https://www.ikk-gesundplus.de'],['BIG direkt gesund','https://www.big-direkt.de'],['VIACTIV','https://www.viactiv.de']];
V.gesundheit=function(){
 var H=ST.health,h='<a class="back" href="#/">‹ Zurück</a><h1>Gesundheit</h1>';
 if(H.kasse)h+='<div class="card"><h2>Meine Krankenkasse</h2><p class="lead"><b>'+esc(H.kasse)+'</b></p>'+(H.vnr?'<p>Versichertennummer:<br><b style="font-size:1.4rem;letter-spacing:.05em">'+esc(H.vnr)+'</b></p>':'')+(H.kasseTel?'<a class="btn big" href="tel:'+esc(digits(H.kasseTel))+'">Krankenkasse anrufen</a>':'')+(H.kasseUrl?'<a class="btn alt" target="_blank" rel="noopener" href="'+esc(H.kasseUrl)+'">Internetseite öffnen</a>':'')+'<p class="small">Die Pflegeversicherung gehört zur Krankenkasse. Bei Fragen zur Pflege ruft man dort an.</p></div>';
 else h+='<div class="card"><p>Die Krankenkasse ist noch nicht eingetragen. Das können Angehörige unter „Einstellungen“ machen.</p></div>';
 if(H.arzt||H.arztTel)h+='<div class="card"><h2>Mein Hausarzt</h2><p class="lead"><b>'+esc(H.arzt||'Hausarzt')+'</b></p>'+(H.arztTel?'<a class="btn big" href="tel:'+esc(digits(H.arztTel))+'">Hausarzt anrufen</a>':'')+'</div>';
 h+='<div class="card"><h2>Ärztlicher Bereitschaftsdienst</h2><p>Wenn die Praxis geschlossen ist und es <b>nicht lebensbedrohlich</b> ist, hilft die Nummer <b>116 117</b>.</p><a class="btn big" href="tel:116117">116 117 anrufen</a><p class="small">Bei Lebensgefahr gilt immer der rote SOS-Knopf.</p></div>';
 h+='<div class="card"><h2>Alle Krankenkassen (Auswahl)</h2><p class="small">Tippen Sie auf einen Namen, um die Internetseite zu öffnen. Die Liste ist eine Auswahl. Internetadressen können sich ändern.</p><ul class="list">'+KK.map(function(k){return '<li><a class="btn alt" target="_blank" rel="noopener" href="'+k[1]+'">'+esc(k[0])+'</a></li>'}).join('')+'</ul></div>';
 return view(h,function(){});
};
V.foto=function(){var h='<a class="back" href="#/">‹ Fertig</a><h1>Ihr Foto</h1>'+(window.__PHOTO?'<img class="photo" alt="Ihr Foto" src="'+esc(window.__PHOTO)+'">':'<p>Kein Foto vorhanden.</p>')+'<a class="btn big" href="#/">Fertig</a>';return view(h,function(){})};
V.sos=function(){
 var C=ST.contacts.filter(function(c){return c.sos}),I=ST.sos,nm=ST.person.name,loc='';
 var h='<a class="back" href="#/">‹ Zurück, alles in Ordnung</a><h1 style="color:var(--danger)">Notruf-Hilfe</h1><div class="sosbox"><h2>1. Notruf 112</h2><p>Bei Lebensgefahr, Unfall, Brand oder starken Beschwerden.</p><a class="btn danger big" href="tel:112">Jetzt 112 anrufen</a><p class="small">Das Telefon öffnet sich mit der 112. Zum Anrufen tippen Sie dort den grünen Hörer.</p></div>';
 h+='<div class="card"><h2>2. Angehörige informieren</h2>'+(C.length?'<button class="btn alt" id="locb">Meinen Standort holen</button><p id="lm" class="small">Mit Standort weiß die Familie, wo Sie sind. Ihr Handy fragt um Erlaubnis.</p>'+C.map(function(c){return '<div class="row" style="margin:.5rem 0">'+avatar(c)+'<span class="grow">'+esc(c.name)+'</span></div><div class="row2"><a class="btn big" href="tel:'+esc(digits(c.tel))+'">Anrufen</a><a class="btn alt big" data-sms="'+esc(c.tel)+'" href="'+esc(smsLink(c.tel,(I.msg||'').replace('{name}',nm||'Ihr Angehöriger')))+'">SMS</a></div>'}).join(''):'<p>Noch keine Notfallkontakte eingetragen. Die Betreuungsperson kann sie in den Einstellungen festlegen.</p>')+'</div>';
 h+='<div class="card"><h2>Das sage ich der Notruf-Zentrale</h2><p><b>Wer:</b> '+(nm?esc(nm):'mein Name')+'<br><b>Wo:</b> '+(I.addr?esc(I.addr):'meine Adresse')+'<br><b>Was:</b> was passiert ist'+(I.notes?'<br><b>Wichtig:</b> '+esc(I.notes):'')+'</p><p class="small">Ruhig sprechen und am Telefon bleiben, bis die Notruf-Zentrale fertig ist.</p></div><p class="small">Diese App ruft und sendet nie von selbst. Sie bestätigen alles im Telefon.</p>';
 return view(h,function(r){
  var b=$('#locb',r);if(b)b.onclick=function(){var m=$('#lm',r);if(!navigator.geolocation){m.textContent='Standort ist auf diesem Gerät nicht verfügbar.';return}m.textContent='Einen Moment …';
   navigator.geolocation.getCurrentPosition(function(p){loc='https://maps.google.com/?q='+p.coords.latitude.toFixed(5)+','+p.coords.longitude.toFixed(5);m.className='msg good';m.textContent='Standort gefunden und an die SMS angehängt.';$$('[data-sms]',r).forEach(function(a){a.href=smsLink(a.getAttribute('data-sms'),(I.msg||'').replace('{name}',nm||'Ihr Angehöriger')+' Mein Standort: '+loc)})},function(){m.className='msg bad';m.textContent='Der Standort ging nicht. Die SMS ist trotzdem bereit.'},{timeout:12000,enableHighAccuracy:true})}
 },{nosos:true});
};
/* ---- PIN-Eingabe ---- */
V.pin=function(){
 if(!ST.pin)return V.einrichtung(0);
 var v='';
 var h='<a class="back" href="#/">‹ Zurück</a><h1>Einstellungen</h1><p class="lead">Bitte die Geheimzahl eingeben. Sie ist für Angehörige oder Betreuer da.</p><div class="pdots" id="pd" aria-hidden="true">&nbsp;</div>'+pad()+'<p id="m" class="msg bad" aria-live="polite"></p><p class="small"><a href="#/vergessen">Geheimzahl vergessen?</a></p>';
 return view(h,function(r){
  function dots(){$('#pd',r).innerHTML=v?v.split('').map(function(){return '<i></i>'}).join(''):'&nbsp;'}
  r.addEventListener('click',function(e){var k=e.target.closest('[data-k]');if(!k)return;var d=k.getAttribute('data-k'),m=$('#m',r);
   if(d==='x'){v=v.slice(0,-1);dots();return}
   if(d==='ok'){if(Date.now()<LOCK){m.textContent='Bitte warten Sie kurz und versuchen Sie es dann erneut.';return}
    checkPin(v).then(function(ok){if(ok){FAILS=0;touch();go(ST.setup?'#/admin':'#/einrichtung/2')}else{FAILS++;v='';dots();if(FAILS>=5){LOCK=Date.now()+30000;FAILS=0;m.textContent='Zu viele Versuche. Bitte 30 Sekunden warten.'}else m.textContent='Das war nicht die richtige Geheimzahl.'}});return}
   if(v.length<6){v+=d;dots()}});
 },{nosos:true});
};
V.vergessen=function(){
 var h='<a class="back" href="#/pin">‹ Zurück</a><h1>Geheimzahl vergessen?</h1><div class="card"><p>Aus Sicherheitsgründen gibt es keine Wiederherstellung. Sie können nur <b>alles löschen</b> und von vorn beginnen (Kontakte, Notfallinfos, Knöpfe, Geheimzahl).</p><button class="btn danger" id="w1">Alles löschen …</button><div id="w2" hidden><p class="msg bad">Wirklich alles löschen?</p><button class="btn danger" id="w3">Ja, alles löschen</button></div></div>';
 return view(h,function(r){$('#w1',r).onclick=function(){$('#w2',r).hidden=false};$('#w3',r).onclick=function(){try{localStorage.removeItem(KEY);localStorage.removeItem(SHARED)}catch(e){}ST=defaults();AUTH=0;applyUi();go('#/')}},{nosos:true});
};
/* ---- Einrichtung & Admin ---- */
var WIZ=['#/einrichtung','#/admin/person','#/admin/kontakte','#/admin/sos','#/admin/kasse','#/admin/kacheln','#/fertig'];
function nav(route){if(ST.setup)return '<a class="btn alt" href="#/admin">‹ Zurück zum Menü</a>';var i=WIZ.indexOf(route);return '<div class="row2">'+(i>0?'<a class="btn alt" href="'+WIZ[i-1]+'">Zurück</a>':'<span></span>')+'<a class="btn" href="'+WIZ[i+1]+'">Weiter</a></div>'}
function pinForm(title,done){
 var step=0,first='',v='';
 var h='<h1>'+title+'</h1><p class="lead" id="pl">Wählen Sie eine Geheimzahl mit 4 bis 6 Ziffern.</p><div class="pdots" id="pd">&nbsp;</div>'+pad()+'<p id="m" class="msg bad" aria-live="polite"></p>';
 return view(h,function(r){
  function dots(){$('#pd',r).innerHTML=v?v.split('').map(function(){return '<i></i>'}).join(''):'&nbsp;'}
  r.addEventListener('click',function(e){var k=e.target.closest('[data-k]');if(!k)return;var d=k.getAttribute('data-k'),m=$('#m',r);
   if(d==='x'){v=v.slice(0,-1);dots();return}
   if(d==='ok'){if(v.length<4){m.textContent='Mindestens 4 Ziffern.';return}
    if(step===0){first=v;v='';step=1;dots();m.textContent='';$('#pl',r).textContent='Zur Sicherheit: dieselbe Geheimzahl noch einmal.';return}
    if(v!==first){m.textContent='Die Geheimzahlen sind nicht gleich. Bitte noch einmal von vorn.';step=0;v='';first='';dots();$('#pl',r).textContent='Wählen Sie eine Geheimzahl mit 4 bis 6 Ziffern.';return}
    setPin(v).then(function(){touch();done()});return}
   if(v.length<6){v+=d;dots()}});
 },{nosos:true});
}
V.einrichtung=function(step){
 step=parseInt(step,10)||0;
 if(step===1)return pinForm('Geheimzahl für Angehörige festlegen',function(){go('#/admin/person')});
 if(ST.pin&&!authed())return V.pin();
 var h='<h1>Willkommen!</h1><div class="card"><p class="lead">Diese Einrichtung machen Angehörige oder eine Betreuungsperson. Danach hat die Person eine einfache Startseite mit großen Knöpfen und einem roten SOS-Knopf.</p><p>In diesen Schritten:</p><ol><li>Geheimzahl für Angehörige festlegen</li><li>Name und Handy</li><li>Meine Lieben (Kontakte)</li><li>SOS und Notfallinfos</li><li>Knöpfe auswählen</li><li>Krankenkasse und Hausarzt (freiwillig)</li></ol><p class="small">Alles bleibt auf diesem Gerät. Es gibt kein Konto im Internet.</p></div><a class="btn big" href="'+(ST.pin?'#/admin/person':'#/einrichtung/1')+'">Einrichtung starten</a>';
 return view(h,function(){},{nosos:true});
};
V.fertig=function(){
 ST.setup=true;save();
 return view('<h1>Fertig!</h1><div class="card"><p class="lead">Die Startseite ist eingerichtet.</p><p>Tipp: Legen Sie die App jetzt auf den Startbildschirm und testen Sie den SOS-Knopf gemeinsam (ohne die 112 wirklich zu wählen).</p></div><a class="btn big" href="#/">Zur Startseite</a><a class="btn alt" href="#/admin/hilfe">Wie lege ich die App auf den Startbildschirm?</a>',function(){},{nosos:true});
};
V.admin=function(sub,id){
 if(!ST.pin)return V.einrichtung(0);
 if(!authed()){return V.pin()}
 touch();
 var f=V['a_'+(sub||'menu')];return f?f(id):V.a_menu();
};
V.a_menu=function(){
 var items=[['person','Person und Handy'],['kontakte','Meine Lieben (Kontakte)'],['sos','SOS und Notfallinfos'],['kasse','Krankenkasse und Hausarzt'],['kacheln','Meine Knöpfe (Apps)'],['look','Aussehen und Hintergrund'],['pinaend','Geheimzahl ändern'],['backup','Sicherheitskopie'],['hilfe','Einrichtungshilfe']];
 return view('<a class="back" href="#/">‹ Fertig</a><h1>Einstellungen</h1><div class="list">'+items.map(function(i){return '<a class="btn alt big" href="#/admin/'+i[0]+'">'+i[1]+'</a>'}).join('')+'</div><a class="btn big" href="#/" id="out">Abmelden und zur Startseite</a>',function(r){$('#out',r).onclick=function(){AUTH=0}},{nosos:true});
};
V.a_person=function(){
 var P=ST.person;
 var h='<h1>Person und Handy</h1><div class="card"><label for="nm">Name der Person</label><input id="nm" type="text" value="'+esc(P.name)+'" placeholder="Vorname"><label class="chk"><input id="gr" type="checkbox"'+(P.greet?' checked':'')+'><span>Begrüßung anzeigen („Guten Morgen, …“)</span></label><label for="dv">Handy</label><select id="dv"><option value="">Weiß nicht</option><option value="android"'+(P.device==='android'?' selected':'')+'>Android</option><option value="iphone"'+(P.device==='iphone'?' selected':'')+'>iPhone</option></select><label for="cc">Landesvorwahl (für WhatsApp, ohne +)</label><input id="cc" type="tel" inputmode="numeric" value="'+esc(P.cc)+'"></div><p class="small">Name, Handy-Typ und Schriftgröße übernimmt auch der Handy-Coach (wenn beide Apps zusammen installiert sind).</p>'+nav('#/admin/person');
 return view(h,function(r){var s=function(){P.name=$('#nm',r).value.trim().slice(0,40);P.greet=$('#gr',r).checked;P.device=$('#dv',r).value;P.cc=($('#cc',r).value||'49').replace(/\D/g,'')||'49';save()};['nm','gr','dv','cc'].forEach(function(i){var e=$('#'+i,r);e.addEventListener('input',s);e.addEventListener('change',s)})},{nosos:true});
};
V.a_kasse=function(){
 var H=ST.health;
 var h='<h1>Krankenkasse und Hausarzt</h1><div class="card"><label for="ks">Krankenkasse aus der Liste wählen</label><select id="ks"><option value="">Bitte wählen</option>'+KK.map(function(k){return '<option value="'+esc(k[0])+'"'+(H.kasse===k[0]?' selected':'')+'>'+esc(k[0])+'</option>'}).join('')+'</select><label for="kn">Name der Krankenkasse (zum Ändern oder wenn sie nicht in der Liste steht)</label><input id="kn" type="text" value="'+esc(H.kasse)+'"><label for="ku">Internetadresse (freiwillig)</label><input id="ku" type="text" value="'+esc(H.kasseUrl)+'" placeholder="https://…"><label for="kt">Telefonnummer der Krankenkasse</label><input id="kt" type="tel" inputmode="tel" value="'+esc(H.kasseTel)+'"><label for="kv">Versichertennummer (freiwillig)</label><input id="kv" type="text" value="'+esc(H.vnr)+'"><p class="small">Die Nummer steht nur auf diesem Handy. Sie wird auf der Seite „Gesundheit“ groß angezeigt, damit man sie am Telefon vorlesen kann.</p></div><div class="card"><h3>Hausarzt</h3><label for="az">Name der Praxis oder des Arztes</label><input id="az" type="text" value="'+esc(H.arzt)+'"><label for="at">Telefonnummer</label><input id="at" type="tel" inputmode="tel" value="'+esc(H.arztTel)+'"></div>'+nav('#/admin/kasse');
 return view(h,function(r){
  var m={kn:'kasse',ku:'kasseUrl',kt:'kasseTel',kv:'vnr',az:'arzt',at:'arztTel'};
  Object.keys(m).forEach(function(id){$('#'+id,r).addEventListener('input',function(){H[m[id]]=this.value.trim();save()})});
  $('#ks',r).addEventListener('change',function(){var n=this.value,f=KK.filter(function(k){return k[0]===n})[0];if(f){H.kasse=f[0];H.kasseUrl=f[1];$('#kn',r).value=f[0];$('#ku',r).value=f[1];save()}});
 },{nosos:true});
};
V.a_kontakte=function(){
 var h='<h1>Meine Lieben</h1><p class="small">Diese Personen erscheinen bei „Anrufen“. Lieblingskontakte stehen oben auf der Startseite.</p>'+(ST.contacts.length?'<ul class="list">'+ST.contacts.map(function(c){return '<li class="row">'+avatar(c)+'<span class="grow">'+esc(c.name)+'<span class="sm">'+esc(c.tel)+(c.fav?' · Liebling':'')+(c.sos?' · SOS':'')+'</span></span><a class="mini" href="#/admin/kontakt/'+c.id+'">Ändern</a></li>'}).join('')+'</ul>':'<div class="card"><p>Noch keine Kontakte.</p></div>')+'<a class="btn" href="#/admin/kontakt/neu">+ Kontakt hinzufügen</a>'+nav('#/admin/kontakte');
 return view(h,function(){},{nosos:true});
};
function resize(file,max){return new Promise(function(res,rej){var u=URL.createObjectURL(file),im=new Image();im.onload=function(){var s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c.toDataURL('image/jpeg',.8))};im.onerror=function(){rej()};im.src=u})}
V.a_kontakt=function(id){
 var isNew=id==='neu',c=isNew?{id:uid(),name:'',tel:'',photo:'',fav:false,sos:false}:ST.contacts.filter(function(x){return x.id===id})[0];
 if(!c)return V.a_kontakte();
 var h='<a class="back" href="#/admin/kontakte">‹ Zurück</a><h1>'+(isNew?'Neuer Kontakt':'Kontakt ändern')+'</h1><div class="card"><label for="cn">Name (so soll er auf dem Handy stehen)</label><input id="cn" type="text" value="'+esc(c.name)+'" placeholder="z. B. Tochter Anna"><label for="ct">Telefonnummer</label><input id="ct" type="tel" inputmode="tel" value="'+esc(c.tel)+'" placeholder="z. B. 0171 1234567"><label class="chk"><input id="cf" type="checkbox"'+(c.fav?' checked':'')+'><span>Lieblingskontakt (steht oben auf der Startseite)</span></label><label class="chk"><input id="cs" type="checkbox"'+(c.sos?' checked':'')+'><span>Im Notfall informieren (SOS)</span></label><label for="cp">Foto (freiwillig)</label><input id="cp" type="file" accept="image/*"><div id="pv">'+(c.photo?avatar(c,true):'')+'</div></div><p id="m" class="msg bad"></p><button class="btn big" id="sv">Speichern</button>'+(isNew?'':'<button class="btn danger" id="dl">Kontakt löschen</button><div id="d2" hidden><p class="msg bad">Wirklich löschen?</p><button class="btn danger" id="d3">Ja, löschen</button></div>');
 return view(h,function(r){
  $('#cp',r).onchange=function(){var f=this.files&&this.files[0];if(!f)return;resize(f,220).then(function(d){c.photo=d;$('#pv',r).innerHTML=avatar(c,true)},function(){$('#m',r).textContent='Das Foto konnte nicht gelesen werden.'})};
  $('#sv',r).onclick=function(){var n=$('#cn',r).value.trim(),t=$('#ct',r).value.trim(),m=$('#m',r);if(!n){m.textContent='Bitte einen Namen eintragen.';return}if(digits(t).length<3){m.textContent='Bitte eine gültige Telefonnummer eintragen.';return}
   c.name=n.slice(0,40);c.tel=t;c.fav=$('#cf',r).checked;c.sos=$('#cs',r).checked;if(isNew)ST.contacts.push(c);save();go('#/admin/kontakte')};
  var d=$('#dl',r);if(d){d.onclick=function(){$('#d2',r).hidden=false};$('#d3',r).onclick=function(){ST.contacts=ST.contacts.filter(function(x){return x.id!==c.id});save();go('#/admin/kontakte')}}
 },{nosos:true});
};
V.a_sos=function(){
 var I=ST.sos,C=ST.contacts.filter(function(c){return c.sos});
 var h='<h1>SOS und Notfallinfos</h1><div class="card"><h3>Notfallkontakte</h3>'+(C.length?'<ul class="list">'+C.map(function(c){return '<li class="row">'+avatar(c)+'<span class="grow">'+esc(c.name)+'</span></li>'}).join('')+'</ul>':'<p>Noch keine. Bei einem Kontakt „Im Notfall informieren“ ankreuzen.</p>')+'<a class="btn alt" href="#/admin/kontakte">Kontakte bearbeiten</a></div><div class="card"><h3>Das sagt die Person der Notruf-Zentrale</h3><label for="ad">Adresse</label><input id="ad" type="text" value="'+esc(I.addr)+'" placeholder="Straße, Hausnummer, Ort"><label for="no">Wichtige Hinweise (z. B. Allergien, Medikamente)</label><textarea id="no" rows="3">'+esc(I.notes)+'</textarea><p class="small">Diese Angaben stehen nur auf diesem Gerät und erscheinen auf dem SOS-Bildschirm.</p><label for="ms">SMS-Text an Angehörige ({name} wird ersetzt)</label><textarea id="ms" rows="3">'+esc(I.msg)+'</textarea></div><a class="btn alt" href="#/sos">SOS-Bildschirm ansehen (ohne anzurufen)</a>'+nav('#/admin/sos');
 return view(h,function(r){var s=function(){I.addr=$('#ad',r).value.trim();I.notes=$('#no',r).value.trim();I.msg=$('#ms',r).value;save()};['ad','no','ms'].forEach(function(i){$('#'+i,r).addEventListener('input',s)})},{nosos:true});
};
V.a_kacheln=function(){
 var h='<h1>Meine Knöpfe (Apps)</h1><p class="small">Hier können Sie Knöpfe ein- oder ausschalten, die Reihenfolge ändern und eigene Knöpfe hinzufügen.</p><ul class="list">'+ST.tiles.map(function(t,i){return '<li class="row"><input type="checkbox" data-on="'+t.id+'" '+(t.on?'checked':'')+' style="width:1.8rem;height:1.8rem;accent-color:var(--acc)" aria-label="'+esc(t.label)+' anzeigen"><span class="grow">'+esc(t.label)+'<span class="sm">'+esc(t.kind==='link'?t.url:t.kind)+'</span></span><button class="mini" data-up="'+i+'" aria-label="nach oben">▲</button><button class="mini" data-dn="'+i+'" aria-label="nach unten">▼</button><a class="mini" href="#/admin/kachel/'+t.id+'">Ändern</a></li>'}).join('')+'</ul><a class="btn" href="#/admin/kachel/neu">+ Eigener Knopf</a>'+nav('#/admin/kacheln');
 return view(h,function(r){
  r.addEventListener('change',function(e){var c=e.target.getAttribute&&e.target.getAttribute('data-on');if(c){ST.tiles.forEach(function(t){if(t.id===c)t.on=e.target.checked});save()}});
  r.addEventListener('click',function(e){var u=e.target.getAttribute&&e.target.getAttribute('data-up'),d=e.target.getAttribute&&e.target.getAttribute('data-dn');var i=u!=null?+u:d!=null?+d:-1;if(i<0)return;var j=u!=null?i-1:i+1;if(j<0||j>=ST.tiles.length)return;var t=ST.tiles[i];ST.tiles[i]=ST.tiles[j];ST.tiles[j]=t;save();render()});
 },{nosos:true});
};
var COLORS=['#2e7d32','#1565c0','#6a1b9a','#bf360c','#00695c','#ad1457','#283593','#37474f','#b71c1c','#0277bd'];
V.a_kachel=function(id){
 var isNew=id==='neu',t=isNew?{id:uid(),label:'',kind:'link',url:'',icon:'star',color:COLORS[ST.tiles.length%COLORS.length],on:true,custom:true}:ST.tiles.filter(function(x){return x.id===id})[0];
 if(!t)return V.a_kacheln();
 var fixed=!isNew&&['contacts','dial','camera','sms','mail'].indexOf(t.kind)>=0;
 var h='<a class="back" href="#/admin/kacheln">‹ Zurück</a><h1>'+(isNew?'Eigener Knopf':'Knopf ändern')+'</h1><div class="card"><label for="tl">Name auf dem Knopf</label><input id="tl" type="text" value="'+esc(t.label)+'" placeholder="z. B. Hausarzt">'+(fixed?'<p class="small">Dieser Knopf hat eine feste Funktion.</p>':'<label for="tk">Was soll passieren?</label><select id="tk"><option value="link"'+(t.kind==='link'?' selected':'')+'>Webseite oder App-Link öffnen</option><option value="tel"'+(t.kind==='tel'?' selected':'')+'>Telefonnummer anrufen</option><option value="wa"'+(t.kind==='wa'?' selected':'')+'>WhatsApp-Chat mit Nummer öffnen</option></select><label for="tu">Adresse oder Nummer</label><input id="tu" type="text" value="'+esc(t.url)+'" placeholder="https://… oder 0171 …"><p class="small">Tipp: Links wie https://www.youtube.com oder https://www.google.com/maps öffnen auf vielen Handys direkt die passende App.</p>')+'<label for="tc">Farbe</label><select id="tc">'+COLORS.map(function(c,i){return '<option value="'+c+'"'+(t.color===c?' selected':'')+'>Farbe '+(i+1)+'</option>'}).join('')+'</select></div><p id="m" class="msg bad"></p><button class="btn big" id="sv">Speichern</button>'+(t.custom?'<button class="btn danger" id="dl">Knopf löschen</button>':'');
 return view(h,function(r){
  $('#sv',r).onclick=function(){var l=$('#tl',r).value.trim(),m=$('#m',r);if(!l){m.textContent='Bitte einen Namen eintragen.';return}
   t.label=l.slice(0,24);t.color=$('#tc',r).value;if(!fixed){t.kind=$('#tk',r).value;t.url=$('#tu',r).value.trim();if(!t.url){m.textContent='Bitte Adresse oder Nummer eintragen.';return}if(t.kind==='link'&&!/^(https?:\/\/|\.\.\/|[a-z]+:)/i.test(t.url)){t.url='https://'+t.url}if(t.kind==='tel'&&danger(t.url)){m.textContent='Notrufnummern bitte nicht als Knopf anlegen. Dafür gibt es den roten SOS-Knopf.';return}t.icon=t.kind==='tel'?'phone':t.kind==='wa'?'wa':(t.icon||'link')}
   if(isNew)ST.tiles.push(t);save();go('#/admin/kacheln')};
  var d=$('#dl',r);if(d)d.onclick=function(){ST.tiles=ST.tiles.filter(function(x){return x.id!==t.id});save();go('#/admin/kacheln')};
 },{nosos:true});
};
V.a_look=function(){
 var BGN=[['wiese','Blumenwiese'],['blumen','Blumen'],['berge','Berge und See'],['meer','Meer'],['herbst','Herbstwald'],['abend','Abendrot'],['hell','Schlicht hell'],['keins','Ohne Bild']];
 var U=ST.ui;
 var h='<a class="back" href="#/admin">‹ Zurück</a><h1>Aussehen</h1><div class="card"><label for="fs">Schriftgröße</label><input id="fs" type="range" min="1" max="1.6" step="0.1" value="'+U.fs+'"><label for="co">Wie viele Knöpfe nebeneinander?</label><select id="co"><option value="1"'+(U.cols==1?' selected':'')+'>1 (sehr groß)</option><option value="2"'+(U.cols==2?' selected':'')+'>2 (groß)</option><option value="3"'+(U.cols==3?' selected':'')+'>3 (mehr Knöpfe)</option></select><label for="th">Farbe der Kopfzeile</label><select id="th"><option value="gruen"'+(U.theme==='gruen'?' selected':'')+'>Grün</option><option value="blau"'+(U.theme==='blau'?' selected':'')+'>Blau</option><option value="orange"'+(U.theme==='orange'?' selected':'')+'>Orange</option></select><label class="chk"><input id="hc" type="checkbox"'+(U.hc?' checked':'')+'><span>Hoher Kontrast</span></label><label class="chk"><input id="ck" type="checkbox"'+(U.clock?' checked':'')+'><span>Uhr und Datum anzeigen</span></label></div><div class="card"><h3>Hintergrundbild</h3><div class="bgs">'+BGN.concat(U.bgPhoto?[['eigen','Mein Foto']]:[]).map(function(b){var u=bgUrl(b[0]);return '<button class="bgb'+(U.bg===b[0]?' on':'')+'" data-bg="'+b[0]+'" style="background-image:'+(u?'url(\''+u+'\')':'none')+'"><span>'+b[1]+'</span></button>'}).join('')+'</div><label for="bp">Eigenes Foto als Hintergrund</label><input id="bp" type="file" accept="image/*"><p class="small">Das Foto bleibt nur auf diesem Handy.</p></div>';
 return view(h,function(r){var s=function(){U.fs=+$('#fs',r).value;U.cols=+$('#co',r).value;U.theme=$('#th',r).value;U.hc=$('#hc',r).checked;U.clock=$('#ck',r).checked;save()};['fs','co','th','hc','ck'].forEach(function(i){var e=$('#'+i,r);e.addEventListener('input',s);e.addEventListener('change',s)});
  r.addEventListener('click',function(e){var b=e.target.closest('[data-bg]');if(!b)return;U.bg=b.getAttribute('data-bg');save();$$('.bgb',r).forEach(function(x){x.classList.toggle('on',x===b)})});
  $('#bp',r).onchange=function(){var f=this.files&&this.files[0];if(!f)return;resize(f,900).then(function(d){U.bgPhoto=d;U.bg='eigen';save();render()},function(){})}},{nosos:true});
};
V.a_pinaend=function(){return pinForm('Neue Geheimzahl',function(){go('#/admin')})};
function pack(){return btoa(unescape(encodeURIComponent(JSON.stringify(ST))))}
V.a_backup=function(){
 var h='<a class="back" href="#/admin">‹ Zurück</a><h1>Sicherheitskopie</h1><div class="card"><p>Der Kopier-Code enthält alle persönlichen Angaben (Kontakte, Notfallinfos, Geheimzahl). Bewahren Sie ihn sicher auf.</p><label for="code">Mein Kopier-Code</label><textarea id="code" rows="4" readonly></textarea><button class="btn alt" id="cp">Code kopieren</button><label for="inp">Code einfügen (z. B. auf einem neuen Handy)</label><textarea id="inp" rows="3" placeholder="Code hier einfügen"></textarea><button class="btn" id="rs">Einlesen</button><p id="m" class="msg" aria-live="polite"></p></div>';
 return view(h,function(r){var ta=$('#code',r),m=$('#m',r);ta.value=pack();
  $('#cp',r).onclick=function(){ta.select();if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(ta.value).then(function(){m.className='msg good';m.textContent='Kopiert.'},function(){m.textContent='Bitte den markierten Code selbst kopieren.'});else{try{document.execCommand('copy');m.className='msg good';m.textContent='Kopiert.'}catch(e){m.textContent='Bitte den markierten Code selbst kopieren.'}}};
  $('#rs',r).onclick=function(){try{var j=JSON.parse(decodeURIComponent(escape(atob($('#inp',r).value.replace(/\s/g,'')))));if(!j||j.v!==1||!j.tiles)throw 1;ST=j;try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}save();m.className='msg good';m.textContent='Eingelesen. Alles ist wieder da.'}catch(e){m.className='msg bad';m.textContent='Der Code passt nicht. Bitte vollständig einfügen.'}};
 },{nosos:true});
};
V.a_hilfe=function(){
 return view('<a class="back" href="#/admin">‹ Zurück</a><h1>Einrichtungshilfe</h1><div class="card"><h3>Als Startseite nutzen</h3><p><b>Android (Chrome):</b> Drei Punkte oben rechts › „App installieren“ oder „Zum Startbildschirm hinzufügen“. Das Symbol auf die erste Startbildschirm-Seite schieben.</p><p><b>iPhone (Safari):</b> Teilen-Symbol › „Zum Home-Bildschirm“. Das Symbol auf die erste Seite legen.</p><p class="small">Menünamen können je nach Gerät und Version abweichen.</p></div><div class="card"><h3>Versehentliches Verlassen verhindern</h3><p><b>Android:</b> In den Einstellungen nach „Bildschirm anpinnen“ (oder „App fixieren“) suchen und die App anpinnen.</p><p><b>iPhone:</b> In den Einstellungen unter „Bedienungshilfen“ den „Geführten Zugriff“ einschalten.</p><p class="small">Beides sind Funktionen des Handys selbst. Diese App kann sie nicht für Sie einschalten.</p></div><div class="card"><h3>Was die App kann und was nicht</h3><p>Sie öffnet Telefon, Nachrichten, WhatsApp, Karten & Co. über Links und bereitet Anrufe und SMS vor. Sie ersetzt <b>nicht</b> die richtige Startseite des Handys und kann fremde Apps nicht einrichten. Dafür braucht es eine eigene Start-App für Android.</p></div>',function(){},{nosos:true});
};
/* ---- Router ---- */
function render(){
 if(RT.clean){try{RT.clean()}catch(e){}RT.clean=null}
 var p=location.hash.replace(/^#\/?/,'').split('/'),a=p[0]||'',out;
 if(!ST.setup&&a===''&&!ST.pin&&ST.contacts.length===0)return go('#/einrichtung');
 if(a===''||a==='')out=V.home();
 else if(a==='kontakte')out=V.kontakte();else if(a==='kontakt')out=V.kontakt(p[1]);else if(a==='wahl')out=V.wahl();else if(a==='gesundheit')out=V.gesundheit();else if(a==='foto')out=V.foto();
 else if(a==='sos')out=V.sos();else if(a==='pin')out=V.pin();else if(a==='vergessen')out=V.vergessen();
 else if(a==='einrichtung')out=V.einrichtung(p[1]);
 else if(a==='fertig'){if(!authed()&&ST.pin)out=V.pin();else out=V.fertig()}
 else if(a==='admin')out=V.admin(p[1],p[2]);
 else out=V.home();
 var app=$('#app');app.innerHTML='<div id="view" class="'+(a===''?'home':'pg')+'">'+out.h+'</div>';
 var s=$('#sosbar');if(s)s.hidden=!out.sos;
 var g=$('#gear');if(g)g.hidden=/^(admin|einrichtung|pin|fertig|vergessen)/.test(a);
 if(out.b)out.b($('#view'));
 var h1=$('#app h1');if(h1){h1.setAttribute('tabindex','-1');try{h1.focus({preventScroll:true})}catch(e){}}
 window.scrollTo(0,0);
}
document.addEventListener('DOMContentLoaded',function(){});
var cam=$('#cam');if(cam)cam.addEventListener('change',function(){var f=this.files&&this.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){window.__PHOTO=rd.result;go('#/foto')};rd.readAsDataURL(f);this.value=''});
window.addEventListener('hashchange',render);
window.__SGL={V:V,S:function(){return ST},render:render,auth:function(){touch()}};
if('serviceWorker' in navigator&&!window.SG_SINGLE&&!window.AndroidApp&&/^https?:$/.test(location.protocol)){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}
applyUi();render();
})();
