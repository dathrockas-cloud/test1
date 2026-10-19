(function(){
'use strict';
var VERSION='1.0.0',KEY='sg_handycoach_v1';
var MODULES=window.MODULES,ETAPPEN=window.ETAPPEN,HILLS=window.HILLS||'';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var DEF={name:'',device:'',fs:1,hc:false,tts:false,done:{},prac:{},chk:{}};
var S=load(),CUR=-1,CLEAN=[];
function shared(){try{return JSON.parse(localStorage.getItem('sg_shared_v1')||'{}')}catch(e){return {}}}
function load(){try{var j=JSON.parse(localStorage.getItem(KEY)||'{}'),sh=shared();return {name:j.name||sh.name||'',device:j.device||sh.device||'',fs:+j.fs||+sh.fs||1,hc:j.hc!==undefined?!!j.hc:!!sh.hc,tts:!!j.tts,done:j.done||{},prac:j.prac||{},chk:j.chk||{}}}catch(e){return JSON.parse(JSON.stringify(DEF))}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function esc(t){return String(t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function prefs(){document.documentElement.style.setProperty('--fs',S.fs);document.body.classList.toggle('hc',!!S.hc)}
function onClean(f){CLEAN.push(f)}
function cleanup(){CLEAN.forEach(function(f){try{f()}catch(e){}});CLEAN=[];try{if('speechSynthesis' in window)speechSynthesis.cancel()}catch(e){}}
function say(t){try{if(!('speechSynthesis' in window))return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang='de-DE';u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
function buzz(){try{if(navigator.vibrate)navigator.vibrate(40)}catch(e){}}
function flowers(){var cols=['#e53935','#fdd835','#ec407a','#ab47bc','#ff7043','#42a5f5','#ffffff'];for(var i=0;i<26;i++){var s=document.createElement('span');var z=18+Math.random()*18;s.className='fl';s.style.cssText='left:'+Math.random()*100+'vw;width:'+z+'px;height:'+z+'px;animation-duration:'+(2+Math.random()*2)+'s;animation-delay:'+Math.random()*.6+'s;background:radial-gradient(circle,#ff8f00 28%,'+cols[i%7]+' 30%)';document.body.appendChild(s);(function(n){setTimeout(function(){n.remove()},4800)})(s)}}
function doneCount(){return Object.keys(S.done).filter(function(k){return S.done[k]}).length}
function ic(m,sz){return '<svg class="ic" width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="'+m.color+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+m.icon+'</svg>'}
function dots3(l){var o='';for(var i=0;i<3;i++)o+='<span style="display:inline-block;width:.7rem;height:.7rem;border-radius:50%;margin-left:.2rem;background:'+(i<l?'#1f4d3a':'#cfd8dc')+'"></span>';return o}
var PAGES=['intro','s1','s2','s3','s4','ueben','echt','stempel'];
var REAL=['Üben Sie die PIN-Eingabe an einem Übungs-Tastenfeld, ganz ohne Risiko.','Öffnen Sie die Telefon-App Ihres Handys mit einer Nummer Ihrer Wahl. Angerufen wird erst, wenn Sie dort den grünen Hörer tippen.','Öffnen Sie Ihre Nachrichten-App mit einem vorbereiteten Text. Gesendet wird erst, wenn Sie dort auf den Pfeil tippen.','Schalten Sie die echte Kamera ein und machen Sie ein Übungsfoto. Es wird nirgends gespeichert.','Sehen Sie live, ob Ihr Handy gerade mit dem Internet verbunden ist.','Testen Sie die Selfie-Kamera wie bei einem Videoanruf: Bild auf Augenhöhe, gutes Licht.','Prüfen Sie, welche Version dieser App Sie haben und ob eine neuere bereitsteht.','Testen Sie, wie stark ein Beispiel-Passwort ist. Es wird nicht gespeichert oder gesendet.','Entscheiden Sie bei fünf Beispiel-Nachrichten: antippen oder nicht?','Sichern Sie Ihren Lernstand wie Fotos in einer Cloud: als Sicherungscode zum Aufbewahren.','Legen Sie diese App auf den Startbildschirm Ihres Handys, wie eine gewöhnliche App.','Sprechen Sie mit dem Handy und sehen Sie, was es versteht. Oder lassen Sie sich einen Text vorlesen.','Stellen Sie die Schrift in dieser App so groß, wie es für Sie angenehm ist.','Sehen Sie, wie voll der Akku Ihres Geräts ist und ob es lädt (geht nicht auf allen Handys).','Suchen Sie etwas im Internet. Das Ergebnis öffnet sich in einem neuen Fenster.','Lassen Sie sich Ihren Standort anzeigen. Er bleibt auf Ihrem Handy.','Nehmen Sie eine Sprachnachricht auf und hören Sie sie an. Sie wird nirgends gespeichert oder gesendet.','Üben Sie die 112 an einem Übungsfeld. Der echte Notruf ist extra geschützt, damit nichts aus Versehen passiert.'];
/* ---------- Views ---------- */
function home(){
 var d=doneCount(),t=MODULES.length,nx=MODULES.filter(function(m){return !S.done[m.id]})[0];
 var h='<section class="hero"><div class="herotxt"><p class="eyebrow">SozialGreen · Technik ohne Angst</p><h1>'+(S.name?'Hallo, '+esc(S.name)+'!':'Willkommen!')+'</h1><p class="lead">Lernen Sie Ihr Handy kennen, Schritt für Schritt und in Ruhe.</p></div>'+HILLS+'</section>';
 h+='<section class="card prog"><div class="progtop"><b>'+d+' von '+t+' Stempeln</b></div><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="'+t+'" aria-valuenow="'+d+'"><span style="width:'+Math.round(d/t*100)+'%"></span></div>';
 h+=nx?'<a class="btn big" href="#/m/'+nx.id+'/0">'+(d?'Weiter mit Modul ':'Start mit Modul ')+nx.n+': '+esc(nx.title)+'</a>':'<a class="btn big" href="#/urkunde">Zur Handy-Urkunde</a>';
 h+='</section><a class="btn danger big" href="#/m/17/6">Notruf-Hilfe</a>';
 ETAPPEN.forEach(function(e,ei){
  h+='<section class="card"><h2 style="color:'+e.color+'">Etappe '+(ei+1)+': '+esc(e.name)+'</h2><ul class="mlist">';
  MODULES.filter(function(m){return m.etappe===ei}).forEach(function(m){h+='<li><a class="mrow'+(S.done[m.id]?' ok':'')+'" href="#/m/'+m.id+'/0">'+ic(m,34)+'<span class="mt"><small>Modul '+m.n+' · ca. '+m.min+' Min.</small>'+esc(m.title)+'</span><span class="stamp">'+(S.done[m.id]?'Gestempelt':'Offen')+'</span></a></li>'});
  h+='</ul></section>'});
 return h+'<div class="row2"><a class="btn alt" href="#/urkunde">Urkunde</a><a class="btn alt" href="#/einstellungen">Einstellungen</a></div>';
}
function devCard(m){var a='<p><b>Android:</b> '+esc(m.hA)+'</p>',i='<p><b>iPhone:</b> '+esc(m.hI)+'</p>';return '<div class="card"><h3>Auf Ihrem Handy</h3>'+(S.device==='android'?a:S.device==='iphone'?i:a+i)+'<p class="small">Die Namen der Menüs können je nach Hersteller und Version etwas abweichen.</p></div>'}
function fwCard(m){return '<div class="card fw" style="border-color:'+m.color+'"><h3 style="color:'+m.color+'">Fachwort einfach erklärt</h3><p>'+esc(m.fw)+'</p></div>'}
function phoneBox(m,act){return '<div class="phonewrap'+(act?' act':'')+'">'+m.svg+'</div>'}
function mod(id,p){
 var m=MODULES[id];if(!m)return home();
 p=Math.max(0,Math.min(PAGES.length-1,p|0));CUR=id;var pg=PAGES[p];
 var dts=PAGES.map(function(x,i){return '<span class="dot'+(i===p?' cur':i<p?' pass':'')+'"></span>'}).join('');
 var h='<div class="mtop"><a class="back" href="#/">‹ Übersicht</a><div class="dots" role="img" aria-label="Seite '+(p+1)+' von '+PAGES.length+'">'+dts+'</div></div><h1 class="mh" style="color:'+m.color+'">'+ic(m,40)+'<span>Modul '+m.n+': '+esc(m.title)+'</span></h1>';
 if(pg==='intro'){
  h+='<div class="card"><p class="lead">Das lernen Sie hier: <b>'+esc(m.title)+'</b></p><div class="pills"><span class="pill">ca. '+m.min+' Min.</span><span class="pill">Level '+dots3(m.level)+'</span></div></div>'+fwCard(m)+devCard(m)+'<div class="card"><p class="quote">„'+esc(m.saying)+'“</p></div>';
 }else if(/^s\d$/.test(pg)){
  var i=p-1;h+='<div class="card step"><div class="snum" style="background:'+m.color+'">'+(i+1)+'</div><p class="steptxt">'+esc(m.steps[i])+'</p></div>'+phoneBox(m,false)+'<p class="small" style="text-align:center">Der orange Ring zeigt, wo getippt wird.</p><button class="btn alt" data-say="'+esc('Schritt '+(i+1)+'. '+m.steps[i])+'">Vorlesen</button>';
 }else if(pg==='ueben'){
  h+='<div class="card"><p class="lead">Probieren Sie es aus: Tippen Sie auf den <b>orangefarbenen Ring</b> im Handy-Bild.</p></div>'+phoneBox(m,true)+'<div id="ok" class="okbox"'+(S.prac[id]?'':' hidden')+'>Super gemacht!</div>';
 }else if(pg==='echt'){
  h+='<div class="card"><h3>Jetzt echt ausprobieren</h3><p>'+esc(REAL[id])+'</p></div><div id="widget" class="card"></div>';
 }else{
  var c=S.chk[id]||[false,false,false];
  h+='<div class="card"><h3>Das habe ich geschafft</h3>'+['Ich habe es einmal selbst ausprobiert','Ich habe es mit Begleitung geübt','Ich kann es allein'].map(function(t,i){return '<label class="chk"><input type="checkbox" data-chk="'+i+'"'+(c[i]?' checked':'')+'><span>'+t+'</span></label>'}).join('')+'</div><div class="card"><div class="stampbox'+(S.done[id]?' on':'')+'" style="--c:'+m.color+'"><span>STEMPEL</span></div><p class="tipbox"><b>Gut zu wissen:</b> '+esc(m.tip)+'</p><button class="btn big" data-act="stamp"'+(c[0]?'':' disabled')+'>'+(S.done[id]?'Gestempelt':'Stempel holen')+'</button><p class="small">Der Stempel wird freigeschaltet, sobald Sie „Ich habe es einmal selbst ausprobiert“ angekreuzt haben.</p></div><p class="quote">„'+esc(m.saying)+'“</p>';
 }
 var last=p===PAGES.length-1;
 h+='<div class="nav">'+(p>0?'<a class="btn alt" href="#/m/'+id+'/'+(p-1)+'">Zurück</a>':'<span></span>')+(!last?'<a class="btn" href="#/m/'+id+'/'+(p+1)+'">Weiter</a>':(id<MODULES.length-1?'<a class="btn" href="#/m/'+(id+1)+'/0">Nächstes Modul</a>':'<a class="btn" href="#/urkunde">Zur Urkunde</a>'))+'</div>';
 return h;
}
function cert(){
 var d=doneCount(),t=MODULES.length;
 if(d<t)return '<h1>Handy-Urkunde</h1><div class="card"><p class="lead">Noch '+(t-d)+' Stempel bis zur Urkunde. Sie schaffen das!</p><div class="bar"><span style="width:'+Math.round(d/t*100)+'%"></span></div><a class="btn" href="#/">Weiter lernen</a></div>';
 var dt=new Date().toLocaleDateString('de-DE',{day:'numeric',month:'long',year:'numeric'});
 return '<h1>Herzlichen Glückwunsch!</h1><div class="cert"><h2>Handy-Urkunde</h2><p>Hiermit wird bestätigt, dass</p><div class="nm">'+(S.name?esc(S.name):'&nbsp;')+'</div><p>alle '+t+' Module des Senioren-Handy-Passes gemeistert hat und sicher mit dem Handy unterwegs ist.</p><p>'+dt+'</p><p><b>SozialGreen · Technik ohne Angst</b></p></div><button class="btn big noprint" data-act="print">Urkunde drucken</button><a class="btn alt noprint" href="#/">Zur Übersicht</a>';
}
function settings(){
 return '<h1>Einstellungen</h1><div class="card"><label for="nm">Mein Name</label><input id="nm" type="text" autocomplete="given-name" value="'+esc(S.name)+'" placeholder="Vorname"><h3>Mein Handy</h3>'+[['android','Android'],['iphone','iPhone'],['','Weiß ich nicht']].map(function(o){return '<label class="chk"><input type="radio" name="dev" value="'+o[0]+'"'+(S.device===o[0]?' checked':'')+'><span>'+o[1]+'</span></label>'}).join('')+'</div><div class="card"><label for="sfs">Schriftgröße</label><div class="slr"><span aria-hidden="true">A</span><input id="sfs" type="range" min="1" max="1.8" step="0.1" value="'+S.fs+'"><span aria-hidden="true" style="font-size:1.6em">A</span></div><label class="chk"><input id="shc" type="checkbox"'+(S.hc?' checked':'')+'><span>Hoher Kontrast</span></label><label class="chk"><input id="stts" type="checkbox"'+(S.tts?' checked':'')+'><span>Schritte automatisch vorlesen</span></label></div><div class="card"><h3>Lernstand sichern</h3><div id="bk"></div></div><div class="card"><h3>Alles zurücksetzen</h3><div id="rs"><button class="btn alt" data-act="reset1">Lernstand löschen …</button></div></div>';
}
function info(){
 return '<h1>Über die App</h1><div class="card"><p>Der <b>SozialGreen Handy-Coach</b> begleitet Sie Schritt für Schritt: bildlich, in Ruhe und mit echten Übungen.</p><h3>Datenschutz in einfachen Worten</h3><p>Alles bleibt auf Ihrem Handy. Es gibt kein Konto und keine Werbung. Kamera, Mikrofon und Standort werden nur bei den Übungen benutzt, wenn Sie es erlauben. Fotos, Aufnahmen und Standort werden nicht gespeichert und nicht gesendet.</p><p class="small">Version '+VERSION+'</p></div><div class="card"><p class="small"><b>Wichtig:</b> Diese App ersetzt keinen Notruf und keine persönliche Beratung. Im Notfall wählen Sie die 112.</p></div><a class="btn alt" href="#/">Zur Übersicht</a>';
}
/* ---------- Widgets ---------- */
var W={};
var KEYS='123456789'.split('').map(function(d){return '<button class="key" data-d="'+d+'">'+d+'</button>'}).join('');
function danger(n){var d=n.replace(/\D/g,'');return d==='112'||d==='110'||d==='116117'}
W[0]=function(el){
 var v='',tries=0;
 el.innerHTML='<p class="lead">Übungs-PIN: <b>1234</b><br><small>Nur zum Üben, nicht Ihre echte PIN!</small></p><div class="pdots" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="pad">'+KEYS+'<button class="key small" data-d="x">Löschen</button><button class="key" data-d="0">0</button><span></span></div><p class="msg" id="pmsg" aria-live="polite"></p>';
 function upd(){$$('.pdots i',el).forEach(function(i,k){i.className=k<v.length?'on':''})}
 el.addEventListener('click',function(e){var b=e.target.closest('.key');if(!b)return;var d=b.getAttribute('data-d'),msg=$('#pmsg',el);
  if(d==='x'){v=v.slice(0,-1);upd();return}
  if(v.length>=4)return;v+=d;upd();
  if(v.length===4){if(v==='1234'){msg.className='msg good';msg.textContent='Richtig! So entsperrt man ein Handy.';flowers();buzz()}else{tries++;msg.className='msg bad';msg.textContent=tries>=3?'Nicht ganz. Bei einer echten SIM-PIN sperrt sich die Karte nach 3 Fehlversuchen. Hier dürfen Sie so oft üben, wie Sie möchten.':'Das war nicht die Übungs-PIN. Versuchen Sie es noch einmal.'}setTimeout(function(){v='';upd()},600)}
 });
};
W[1]=function(el){
 el.innerHTML='<label for="tel">Rufnummer</label><input id="tel" type="tel" inputmode="tel" autocomplete="off" placeholder="z. B. Nummer eines Angehörigen"><a id="go" class="btn big" role="button" aria-disabled="true" href="#">Telefon-App öffnen</a><p class="small">Ihr Handy öffnet nur das Wählfeld. Angerufen wird erst, wenn Sie dort den grünen Hörer tippen.</p><p id="m" class="msg bad" hidden></p>';
 var t=$('#tel',el),g=$('#go',el),m=$('#m',el);
 function u(){var n=t.value.replace(/[^\d+]/g,'');if(danger(n)){m.hidden=false;m.textContent='Das ist eine Notrufnummer. Bitte nur im echten Notfall wählen. Zum Üben nehmen Sie eine andere Nummer.';g.setAttribute('aria-disabled','true');g.setAttribute('href','#');return}m.hidden=true;if(n.length>=4){g.removeAttribute('aria-disabled');g.setAttribute('href','tel:'+n)}else{g.setAttribute('aria-disabled','true');g.setAttribute('href','#')}}
 t.addEventListener('input',u);g.addEventListener('click',function(e){if(g.getAttribute('aria-disabled')==='true')e.preventDefault()});
};
W[2]=function(el){
 el.innerHTML='<label for="tel">Rufnummer</label><input id="tel" type="tel" inputmode="tel" autocomplete="off" placeholder="z. B. Nummer eines Angehörigen"><label for="tx">Text</label><textarea id="tx" rows="3">Hallo! Ich übe gerade mit meinem Handy-Coach.</textarea><a id="go" class="btn big" role="button" aria-disabled="true" href="#">Nachrichten-App öffnen</a><p class="small">Die Nachricht wird erst gesendet, wenn Sie in der Nachrichten-App auf den Pfeil tippen.</p><p id="m" class="msg bad" hidden></p>';
 var t=$('#tel',el),x=$('#tx',el),g=$('#go',el),m=$('#m',el),ios=/iPhone|iPad|iPod/.test(navigator.userAgent);
 function u(){var n=t.value.replace(/[^\d+]/g,'');if(danger(n)){m.hidden=false;m.textContent='Das ist eine Notrufnummer. Dahin schreibt man keine Übungsnachricht.';g.setAttribute('aria-disabled','true');g.setAttribute('href','#');return}m.hidden=true;if(n.length>=4){g.removeAttribute('aria-disabled');g.setAttribute('href','sms:'+n+(ios?'&':'?')+'body='+encodeURIComponent(x.value))}else{g.setAttribute('aria-disabled','true');g.setAttribute('href','#')}}
 t.addEventListener('input',u);x.addEventListener('input',u);g.addEventListener('click',function(e){if(g.getAttribute('aria-disabled')==='true')e.preventDefault()});
};
function cam(el,facing,txt){
 el.innerHTML='<p class="small">'+txt+'</p><button class="btn big" id="on">Kamera einschalten</button><div id="area" hidden><video id="vid" playsinline muted autoplay></video><button class="shutter" id="shot" aria-label="Foto machen"></button><p class="small" style="text-align:center">Runder Knopf = Foto machen</p></div><div id="photo"></div><p id="cm" class="msg" aria-live="polite"></p>';
 $('#on',el).addEventListener('click',function(){var cm=$('#cm',el);
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){cm.className='msg bad';cm.textContent='Die Kamera ist in diesem Browser nicht verfügbar.';return}
  navigator.mediaDevices.getUserMedia({video:{facingMode:facing},audio:false}).then(function(s){onClean(function(){s.getTracks().forEach(function(t){t.stop()})});$('#vid',el).srcObject=s;$('#area',el).hidden=false;$('#on',el).hidden=true;cm.textContent=''}).catch(function(e){cm.className='msg bad';cm.textContent=e&&e.name==='NotAllowedError'?'Die Kamera wurde nicht erlaubt. Tippen Sie beim nächsten Mal auf „Zulassen“.':'Die Kamera konnte nicht gestartet werden.'})});
 $('#shot',el).addEventListener('click',function(){var v=$('#vid',el);if(!v.videoWidth)return;var c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);$('#photo',el).innerHTML='<img alt="Ihr Übungsfoto" src="'+c.toDataURL('image/jpeg',.8)+'"><p class="small">Dieses Foto bleibt nur hier im Fenster. Es wird nicht gespeichert oder gesendet.</p>';buzz();flowers()});
}
W[3]=function(el){cam(el,'environment','Ihr Handy fragt gleich um Erlaubnis. Tippen Sie auf „Zulassen“.')};
W[5]=function(el){cam(el,'user','Selfie-Kamera: Halten Sie das Handy auf Augenhöhe und sorgen Sie für Licht von vorne.')};
W[4]=function(el){
 function d(){var c=navigator.connection||{},on=navigator.onLine,t=c.type,et=c.effectiveType;
  var x=!on?'Sie sind gerade nicht mit dem Internet verbunden. Prüfen Sie, ob das WLAN eingeschaltet ist.':t==='wifi'?'Sie sind per WLAN verbunden.':t==='cellular'?'Sie nutzen Mobilfunk. Dabei wird Datenvolumen verbraucht.':'Sie sind mit dem Internet verbunden'+(et?' (Verbindung: '+esc(et)+')':'')+'. Ob WLAN oder Mobilfunk, zeigt Ihr Browser nicht an. Schauen Sie dafür oben im Handy-Display.';
  el.innerHTML='<div class="bigstat '+(on?'on':'off')+'">'+(on?'Online':'Offline')+'</div><p>'+x+'</p>'}
 d();var c=navigator.connection;window.addEventListener('online',d);window.addEventListener('offline',d);if(c&&c.addEventListener)c.addEventListener('change',d);
 onClean(function(){window.removeEventListener('online',d);window.removeEventListener('offline',d);if(c&&c.removeEventListener)c.removeEventListener('change',d)});
};
W[6]=function(el){
 el.innerHTML='<p>Diese App hat die Version <b>'+VERSION+'</b>.</p><button class="btn big" id="chk">Nach Update suchen</button><p id="um" class="msg" aria-live="polite"></p>';
 $('#chk',el).addEventListener('click',function(){var m=$('#um',el);
  if(!('serviceWorker' in navigator)||window.SG_SINGLE){m.textContent='Hier gibt es kein automatisches Update. Sie sehen immer die neueste Fassung.';return}
  m.textContent='Einen Moment …';
  navigator.serviceWorker.getRegistration().then(function(r){if(!r){m.textContent='Die App ist noch nicht für den Offline-Betrieb eingerichtet.';return}
   return r.update().then(function(){var nw=r.installing||r.waiting;if(nw){m.textContent='Eine neue Version wurde gefunden. Die App lädt sich gleich neu.';nw.addEventListener('statechange',function(){if(nw.state==='activated')location.reload()});setTimeout(function(){location.reload()},4000)}else{m.className='msg good';m.textContent='Sie haben die neueste Version.'}})}).catch(function(){m.className='msg bad';m.textContent='Die Suche hat nicht geklappt. Prüfen Sie Ihre Internetverbindung.'})});
};
W[7]=function(el){
 el.innerHTML='<label for="pw">Beispiel-Passwort oder Satz</label><input id="pw" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="z. B. ein langer Satz"><div class="meter" aria-hidden="true"><span id="mb"></span></div><p id="ml" class="lead" aria-live="polite">Tippen Sie etwas ein.</p><p class="small">Nutzen Sie hier nicht Ihr echtes Passwort. Nichts wird gespeichert oder gesendet.</p>';
 var L=['Sehr schwach','Schwach','Mittel','Gut','Sehr stark'],Wd=[12,30,55,80,100],C=['#c62828','#e65100','#f9a825','#558b2f','#2e7d32'];
 function sc(p){var l=p.length,s=l>=16?3:l>=12?2:l>=8?1:0;if(l>=12&&/\s/.test(p))s++;else if(l>=10&&/\d/.test(p)&&/[A-Za-zÄÖÜäöüß]/.test(p))s++;if(/^(123456|passwort|password|qwertz|111111|000000)/i.test(p))s=0;if(/^\d+$/.test(p))s=Math.min(s,1);return Math.min(s,4)}
 $('#pw',el).addEventListener('input',function(){var p=this.value,mb=$('#mb',el),ml=$('#ml',el);if(!p){mb.style.width='0';ml.textContent='Tippen Sie etwas ein.';return}var s=sc(p);mb.style.width=Wd[s]+'%';mb.style.background=C[s];ml.textContent=L[s]+(s<3?': Länger und mit mehreren Wörtern wird es besser.':'.')});
};
var MS=[{t:'Ihre Bank: Bitte bestätigen Sie sofort Ihre PIN unter bit.ly/xk-12',ok:false,e:'Banken fragen nie per SMS nach der PIN. Link nicht antippen.'},{t:'Hallo Oma, ich habe eine neue Nummer. Kannst du mir schnell 800 Euro schicken?',ok:false,e:'Rufen Sie die Person unter der alten, bekannten Nummer an. Bei Geldwünschen immer erst nachfragen.'},{t:'Die Nachbarin schreibt (Nummer ist in Ihren Kontakten): Treffen wir uns um 15 Uhr zum Kaffee?',ok:true,e:'Bekannte Person, keine Geldforderung, kein Link: das ist in Ordnung.'},{t:'Gewinnspiel: Sie haben ein neues Handy gewonnen! Jetzt Daten eintragen.',ok:false,e:'Ein Gewinn, bei dem Sie nie mitgespielt haben, ist fast immer Betrug.'},{t:'Paketdienst: Ihr Paket kann nicht zugestellt werden. Zahlen Sie 1,99 € unter paket-info.xyz',ok:false,e:'Löschen Sie die Nachricht. Echte Paketdienste verlangen keine Zahlung per Link.'}];
W[8]=function(el){var i=0,ok=0;
 function show(){
  if(i>=MS.length){el.innerHTML='<div class="bigstat on">'+ok+' von '+MS.length+' richtig</div><p>'+(ok===MS.length?'Sehr gut! Sie erkennen Betrug schon sicher.':'Üben Sie ruhig noch einmal. Im Zweifel: nichts antippen, löschen und selbst anrufen.')+'</p><button class="btn alt" id="again">Nochmal</button>';$('#again',el).onclick=function(){i=0;ok=0;show()};if(ok===MS.length)flowers();return}
  var q=MS[i];el.innerHTML='<p class="small">Nachricht '+(i+1)+' von '+MS.length+'</p><div class="sms">'+esc(q.t)+'</div><div class="row2"><button class="btn" data-a="yes">Antippen oder antworten</button><button class="btn alt" data-a="no">Nicht antippen</button></div><p id="fb" class="msg" aria-live="polite"></p>';
  el.onclick=function(e){var b=e.target.closest('[data-a]');if(!b||b.disabled)return;var r=(b.getAttribute('data-a')==='yes')===q.ok;if(r)ok++;var fb=$('#fb',el);fb.className='msg '+(r?'good':'bad');fb.textContent=(r?'Richtig. ':'Leider nicht. ')+q.e;$$('[data-a]',el).forEach(function(x){x.disabled=true});el.insertAdjacentHTML('beforeend','<button class="btn" id="nx">Weiter</button>');$('#nx',el).onclick=function(){i++;show()}}
 }
 show()};
function pack(){return btoa(unescape(encodeURIComponent(JSON.stringify({v:1,name:S.name,device:S.device,done:S.done,prac:S.prac,chk:S.chk}))))}
function unpack(c){var j=JSON.parse(decodeURIComponent(escape(atob(c.replace(/\s/g,'')))));if(!j||j.v!==1)throw new Error('bad');return j}
W[9]=function(el){
 el.innerHTML='<p>Ihr Lernstand liegt nur auf diesem Handy. Mit dem <b>Sicherungscode</b> können Sie ihn aufbewahren und später wieder einlesen, wie bei Fotos in der Cloud.</p><label for="code">Mein Sicherungscode</label><textarea id="code" rows="4" readonly></textarea><div class="row2"><button class="btn alt" id="cp">Code kopieren</button><button class="btn alt" id="dl">Als Datei speichern</button></div><label for="inp">Code einlesen</label><textarea id="inp" rows="3" placeholder="Code hier einfügen"></textarea><button class="btn" id="rs2">Einlesen</button><p id="bm" class="msg" aria-live="polite"></p>';
 var ta=$('#code',el),bm=$('#bm',el);ta.value=pack();
 $('#cp',el).onclick=function(){ta.value=pack();var ok=function(){bm.className='msg good';bm.textContent='Kopiert.'};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(ta.value).then(ok,function(){ta.select();bm.textContent='Bitte den markierten Code selbst kopieren.'})}else{ta.select();try{document.execCommand('copy');ok()}catch(e){bm.textContent='Bitte den markierten Code selbst kopieren.'}}};
 $('#dl',el).onclick=function(){try{var b=new Blob([pack()],{type:'text/plain'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='handy-coach-sicherung.txt';document.body.appendChild(a);a.click();a.remove()}catch(e){bm.textContent='Speichern als Datei geht hier nicht. Nutzen Sie „Code kopieren“.'}};
 $('#rs2',el).onclick=function(){try{var j=unpack($('#inp',el).value);S.name=j.name||S.name;S.device=j.device||S.device;S.done=j.done||{};S.prac=j.prac||{};S.chk=j.chk||{};save();bm.className='msg good';bm.textContent='Eingelesen. Ihr Lernstand ist wieder da.';updateHeader()}catch(e){bm.className='msg bad';bm.textContent='Der Code passt nicht. Bitte vollständig einfügen.'}};
};
var DP=null;window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();DP=e});
W[10]=function(el){
 var st=(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone,ios=/iPhone|iPad|iPod/.test(navigator.userAgent);
 if(st){el.innerHTML='<div class="bigstat on">Schon installiert</div><p>Sie nutzen die App gerade vom Startbildschirm. So soll es sein.</p>';return}
 el.innerHTML=(DP?'<button class="btn big" id="inst">App installieren</button>':'')+'<p>'+(ios?'<b>iPhone:</b> Tippen Sie unten auf das Teilen-Symbol (Quadrat mit Pfeil nach oben) und dann auf „Zum Home-Bildschirm“.':'<b>Android:</b> Tippen Sie oben rechts auf die drei Punkte und dann auf „App installieren“ oder „Zum Startbildschirm hinzufügen“.')+'</p><p class="small">Danach finden Sie die App wie jede andere mit einem Symbol auf dem Startbildschirm.</p>';
 var b=$('#inst',el);if(b)b.onclick=function(){DP.prompt()};
};
W[11]=function(el){var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 el.innerHTML=(SR?'<button class="btn big" id="sp">Sprechen</button><div id="sr" class="sms" hidden></div>':'<p class="msg bad">Spracherkennung gibt es in diesem Browser nicht. Das Vorlesen funktioniert trotzdem:</p>')+'<label for="tt">Text zum Vorlesen</label><input id="tt" type="text" value="Guten Tag! Ich bin Ihr Handy-Coach."><button class="btn alt" id="rd">Vorlesen</button><p id="sm" class="msg" aria-live="polite"></p>';
 $('#rd',el).onclick=function(){if(!('speechSynthesis' in window)){$('#sm',el).textContent='Vorlesen geht hier nicht.';return}say($('#tt',el).value)};
 if(SR){var r=new SR();r.lang='de-DE';r.interimResults=false;
  $('#sp',el).onclick=function(){try{r.start();$('#sm',el).className='msg';$('#sm',el).textContent='Ich höre zu … sprechen Sie jetzt.'}catch(e){}};
  r.onresult=function(e){var s=$('#sr',el);s.hidden=false;s.textContent='„'+e.results[0][0].transcript+'“';$('#sm',el).textContent='';flowers()};
  r.onerror=function(){$('#sm',el).className='msg bad';$('#sm',el).textContent='Das hat nicht geklappt. Haben Sie das Mikrofon erlaubt?'};
  onClean(function(){try{r.abort()}catch(e){}})}
};
W[12]=function(el){el.innerHTML='<label for="fs">Schriftgröße</label><div class="slr"><span aria-hidden="true">A</span><input id="fs" type="range" min="1" max="1.8" step="0.1" value="'+S.fs+'"><span aria-hidden="true" style="font-size:1.6em">A</span></div><p class="lead">So gut können Sie diesen Text lesen?</p>';$('#fs',el).oninput=function(){S.fs=+this.value;save();prefs()}};
W[13]=function(el){
 if(!navigator.getBattery){el.innerHTML='<p class="msg bad">Dieser Browser zeigt den Akkustand nicht an (z. B. Safari auf dem iPhone). Schauen Sie oben rechts im Handy-Display auf das Akku-Symbol.</p>';return}
 navigator.getBattery().then(function(b){function d(){var p=Math.round(b.level*100);el.innerHTML='<div class="bat"><span style="width:'+p+'%"></span></div><div class="bigstat on">'+p+' %</div><p>'+(b.charging?'Das Gerät lädt gerade.':'Das Gerät lädt nicht.')+(p<20&&!b.charging?' Der Akku ist fast leer: Zeit zum Laden!':'')+'</p>'}d();b.addEventListener('levelchange',d);b.addEventListener('chargingchange',d);onClean(function(){b.removeEventListener('levelchange',d);b.removeEventListener('chargingchange',d)})}).catch(function(){el.innerHTML='<p class="msg bad">Der Akkustand ist hier nicht abrufbar.</p>'});
};
W[14]=function(el){el.innerHTML='<label for="q">Wonach möchten Sie suchen?</label><input id="q" type="search" placeholder="z. B. Wetter morgen"><button class="btn big" id="sb">Suchen</button><p class="small">Das Ergebnis öffnet sich in einem neuen Fenster.</p>';function go(){var q=$('#q',el).value.trim();if(!q)return;window.open('https://duckduckgo.com/?q='+encodeURIComponent(q),'_blank','noopener')}$('#sb',el).onclick=go;$('#q',el).onkeydown=function(e){if(e.key==='Enter')go()}};
W[15]=function(el){
 el.innerHTML='<button class="btn big" id="gb">Wo bin ich?</button><div id="gr"></div><p class="small">Ihr Handy fragt um Erlaubnis. Der Standort bleibt auf Ihrem Handy und wird nicht gespeichert.</p>';
 $('#gb',el).onclick=function(){var gr=$('#gr',el);if(!navigator.geolocation){gr.innerHTML='<p class="msg bad">Standort ist hier nicht verfügbar.</p>';return}gr.innerHTML='<p>Einen Moment …</p>';
  navigator.geolocation.getCurrentPosition(function(p){var a=p.coords.latitude.toFixed(4),o=p.coords.longitude.toFixed(4);gr.innerHTML='<div class="bigstat on">Gefunden</div><p>Ungefähr: '+a+' Nord, '+o+' Ost (Genauigkeit etwa '+Math.round(p.coords.accuracy)+' Meter).</p><a class="btn alt" target="_blank" rel="noopener" href="https://www.openstreetmap.org/?mlat='+a+'&mlon='+o+'#map=17/'+a+'/'+o+'">Auf der Karte ansehen</a>';flowers()},function(e){gr.innerHTML='<p class="msg bad">'+(e&&e.code===1?'Der Standort wurde nicht erlaubt. Tippen Sie beim nächsten Mal auf „Zulassen“.':'Der Standort konnte nicht bestimmt werden.')+'</p>'},{timeout:12000})}
};
W[16]=function(el){
 if(!navigator.mediaDevices||!window.MediaRecorder){el.innerHTML='<p class="msg bad">Aufnehmen ist in diesem Browser nicht möglich.</p>';return}
 el.innerHTML='<button class="btn big" id="rec">Aufnahme starten</button><div id="pl"></div><p id="rm" class="msg" aria-live="polite"></p>';
 var mr=null,chunks=[],on=false;
 $('#rec',el).onclick=function(){var b=this,m=$('#rm',el);
  if(!on){navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){onClean(function(){s.getTracks().forEach(function(t){t.stop()})});chunks=[];mr=new MediaRecorder(s);mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};mr.onstop=function(){var url=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType||'audio/webm'}));$('#pl',el).innerHTML='<audio controls src="'+url+'"></audio>';s.getTracks().forEach(function(t){t.stop()});m.className='msg good';m.textContent='Fertig! Tippen Sie auf Wiedergabe.';flowers()};mr.start();on=true;b.textContent='Aufnahme beenden';m.className='msg';m.textContent='Es wird aufgenommen … sprechen Sie jetzt.'}).catch(function(){m.className='msg bad';m.textContent='Das Mikrofon wurde nicht erlaubt.'})}
  else{mr.stop();on=false;b.textContent='Neue Aufnahme'}};
};
W[17]=function(el){var v='';
 el.innerHTML='<h3>Übung</h3><p>Tippen Sie 1, 1, 2 und dann „Anruf“.</p><div class="dial" id="dl" aria-live="polite">&nbsp;</div><div class="pad">'+KEYS+'<button class="key small" data-d="x">Löschen</button><button class="key" data-d="0">0</button><button class="key green" data-d="call">Anruf</button></div><p id="sm" class="msg" aria-live="polite"></p><hr><h3>Echter Notruf</h3><label class="chk"><input type="checkbox" id="real"><span>Ich habe einen echten Notfall.</span></label><a class="btn danger big" id="sos" role="button" aria-disabled="true" href="#">112 anrufen</a><p class="small">Dann öffnet sich das Telefon mit der 112. Zum Anrufen tippen Sie dort den grünen Hörer. Bitte nur im echten Notfall.</p>';
 var dl=$('#dl',el),sm=$('#sm',el),sos=$('#sos',el);
 el.addEventListener('click',function(e){var b=e.target.closest('.key');if(!b)return;var d=b.getAttribute('data-d');
  if(d==='x')v=v.slice(0,-1);else if(d==='call'){if(v==='112'){sm.className='msg good';sm.textContent='Richtig! Im Ernstfall meldet sich die Leitstelle. Sprechen Sie ruhig: Wer ruft an, wo ist es, was ist passiert.';flowers()}else{sm.className='msg bad';sm.textContent='In diesem Übungsfeld üben wir nur die 112.'}}else if(v.length<6)v+=d;
  dl.textContent=v||'\u00a0'});
 $('#real',el).addEventListener('change',function(){if(this.checked){sos.removeAttribute('aria-disabled');sos.setAttribute('href','tel:112')}else{sos.setAttribute('aria-disabled','true');sos.setAttribute('href','#')}});
 sos.addEventListener('click',function(e){if(sos.getAttribute('aria-disabled')==='true')e.preventDefault()});
};
/* ---------- Router & events ---------- */
function updateHeader(){var b=$('#badge');if(b)b.textContent=doneCount()+'/'+MODULES.length}
function render(){
 cleanup();var parts=location.hash.replace(/^#\/?/,'').split('/'),v=parts[0],out,pg='';CUR=-1;
 if(v==='m')out=mod(parseInt(parts[1],10),parseInt(parts[2],10)||0);
 else if(v==='urkunde')out=cert();else if(v==='einstellungen')out=settings();else if(v==='info')out=info();else out=home();
 $('#app').innerHTML=out;prefs();updateHeader();
 if(v==='m'&&CUR>=0){var p=Math.max(0,Math.min(PAGES.length-1,parseInt(parts[2],10)||0));pg=PAGES[p];
  if(pg==='echt'&&W[CUR])W[CUR]($('#widget'));
  if(S.tts&&/^s\d$/.test(pg))say('Schritt '+p+'. '+MODULES[CUR].steps[p-1])}
 if(v==='einstellungen')W[9]($('#bk'));
 var h=$('#app h1');if(h){h.setAttribute('tabindex','-1');try{h.focus({preventScroll:true})}catch(e){}}
 window.scrollTo(0,0);
}
function hit(){if(CUR<0)return;S.prac[CUR]=true;save();var ok=$('#ok');if(ok)ok.hidden=false;flowers();buzz()}
document.addEventListener('click',function(e){var t=e.target;if(!t.closest)return;
 if(t.closest('.act .ring')){hit();return}
 var sy=t.closest('[data-say]');if(sy){say(sy.getAttribute('data-say'));return}
 var a=t.closest('[data-act]');if(!a)return;var act=a.getAttribute('data-act');
 if(act==='stamp'){if(!(S.chk[CUR]&&S.chk[CUR][0]))return;S.done[CUR]=true;save();flowers();buzz();render()}
 else if(act==='print')window.print();
 else if(act==='reset1'){$('#rs').innerHTML='<p class="msg bad">Wirklich alle Stempel und Eingaben löschen?</p><div class="row2"><button class="btn danger" data-act="reset2">Ja, löschen</button><button class="btn alt" data-act="reset0">Abbrechen</button></div>'}
 else if(act==='reset0'){$('#rs').innerHTML='<button class="btn alt" data-act="reset1">Lernstand löschen …</button>'}
 else if(act==='reset2'){S={name:'',device:'',fs:S.fs,hc:S.hc,tts:S.tts,done:{},prac:{},chk:{}};save();render()}
});
document.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.closest&&e.target.closest('.act .ring')){e.preventDefault();hit()}});
document.addEventListener('change',function(e){var t=e.target;
 if(t.hasAttribute&&t.hasAttribute('data-chk')&&CUR>=0){var c=S.chk[CUR]||[false,false,false];c[+t.getAttribute('data-chk')]=t.checked;S.chk[CUR]=c;save();var b=$('[data-act=stamp]');if(b)b.disabled=!c[0]}
 else if(t.name==='dev'){S.device=t.value;save()}
 else if(t.id==='shc'){S.hc=t.checked;save();prefs()}
 else if(t.id==='stts'){S.tts=t.checked;save()}
});
document.addEventListener('input',function(e){var t=e.target;if(t.id==='nm'){S.name=t.value.trim().slice(0,40);save()}else if(t.id==='sfs'){S.fs=+t.value;save();prefs()}});
window.addEventListener('hashchange',render);
window.__SG={home:home,mod:mod,cert:cert,settings:settings,info:info,W:W,S:function(){return S}};
if('serviceWorker' in navigator&&!window.SG_SINGLE&&!window.AndroidApp&&/^https?:$/.test(location.protocol)){window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}
prefs();render();
})();
