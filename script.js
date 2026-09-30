
(function(){
  "use strict";

  /* ===== navegación ===== */
  var slides = document.querySelectorAll(".slide");
  var total = slides.length;
  var current = 0;
  var dotsBox = document.getElementById("dots");
  var bar = document.getElementById("progressBar");
  var runMark = document.getElementById("runMark");
  var counter = document.getElementById("counter");
  var arFx = document.getElementById("arenaFx");

  for (var i = 0; i < total; i++){
    var d = document.createElement("div");
    d.className = "dot";
    d.dataset.i = i;
    d.addEventListener("click", function(){ goTo(parseInt(this.dataset.i,10)); });
    dotsBox.appendChild(d);
  }
  var dots = dotsBox.querySelectorAll(".dot");

  function pad(n){ return (n<10?"0":"")+n; }
  function doArena(){
    arFx.classList.remove("go");
    void arFx.offsetWidth;
    arFx.classList.add("go");
  }
  function goTo(n, silent){
    if (n < 0 || n >= total) return;
    if (!silent && n !== current) doArena();
    slides[current].classList.remove("active");
    current = n;
    slides[current].classList.add("active");
    var pct = ((current)/(total-1))*100;
    bar.style.width = pct + "%";
    runMark.style.left = pct + "%";
    counter.innerHTML = "<b>"+pad(current+1)+"</b> / "+pad(total);
    for (var k = 0; k < total; k++){
      dots[k].classList.toggle("active", k === current);
      dots[k].classList.toggle("done", k < current);
    }
  }
  document.getElementById("prev").addEventListener("click", function(){ goTo(current-1); });
  document.getElementById("next").addEventListener("click", function(){ goTo(current+1); });
  document.addEventListener("keydown", function(e){
    if (e.target && e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") goTo(current+1);
    if (e.key === "ArrowLeft") goTo(current-1);
  });
  document.querySelectorAll("[data-go]").forEach(function(b){
    b.addEventListener("click", function(){ goTo(parseInt(this.dataset.go,10)); });
  });

  /* ===== retratos de galletas ===== */
  function galletaSVG(pelo, pc, ropa, extra){
    var masa = "#d9a05b";
    var back = "";
    var front = "";
    if (pelo === "largo"){
      back = "<path d='M26,42 C17,70 19,100 25,110 L37,104 C32,84 32,62 36,48 Z' fill='"+pc+"'/>" +
             "<path d='M74,42 C83,70 81,100 75,110 L63,104 C68,84 68,62 64,48 Z' fill='"+pc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+pc+"'/>";
    } else if (pelo === "coleta"){
      back = "<path d='M72,46 C90,58 90,88 78,104 C74,84 72,64 64,54 Z' fill='"+pc+"'/>";
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+pc+"'/>";
    } else if (pelo === "punta"){
      front = "<path d='M26,54 Q22,24 50,22 Q78,24 74,54 L69,41 L63,52 L57,39 L50,51 L43,39 L37,52 L31,41 Z' fill='"+pc+"'/>";
    } else if (pelo === "onda"){
      back = "<path d='M24,44 C14,72 18,104 26,112 L40,104 C32,84 32,60 36,48 Z' fill='"+pc+"'/>" +
             "<path d='M76,44 C86,72 82,104 74,112 L60,104 C68,84 68,60 64,48 Z' fill='"+pc+"'/>";
      front = "<path d='M25,54 Q24,24 50,22 Q76,24 75,54 Q68,38 58,42 Q50,34 42,42 Q32,38 25,54 Z' fill='"+pc+"'/>";
    } else {
      front = "<path d='M27,52 Q25,25 50,23 Q75,25 73,52 Q66,37 50,36 Q34,37 27,52 Z' fill='"+pc+"'/>";
    }
    var ex = "";
    if (extra === "coronaSol"){
      ex = "<path d='M28,26 L34,10 L42,20 L50,6 L58,20 L66,10 L72,26 Z' fill='#f5d76e' stroke='#c99320' stroke-width='1.5'/>" +
           "<circle cx='50' cy='8' r='3' fill='#2fae94'/>" +
           "<g stroke='#f5d76e' stroke-width='2.5' stroke-linecap='round'><path d='M14,42 L4,38'/><path d='M86,42 L96,38'/></g>";
    } else if (extra === "quesoViejo"){
      ex = "<path d='M28,32 q22,-14 44,0 q-6,-18 -22,-18 q-16,0 -22,18 Z' fill='#e8c04a'/>" +
           "<circle cx='40' cy='26' r='3' fill='#c99320'/><circle cx='58' cy='24' r='2.6' fill='#c99320'/>" +
           "<path d='M36,72 q14,6 28,0' stroke='#8a6a3a' stroke-width='1.6' fill='none'/>";
    } else if (extra === "arcoViento"){
      ex = "<g transform='translate(84,64)'><path d='M0,-26 q18,26 0,52' fill='none' stroke='#2fae94' stroke-width='4'/>" +
           "<path d='M0,-26 L0,26' stroke='#e8f6f2' stroke-width='1.6'/>" +
           "<path d='M-16,0 L10,0' stroke='#8a6a3a' stroke-width='2.5'/><path d='M-16,0 l6,-4 l0,8 Z' fill='#cfe8e0'/></g>" +
           "<path d='M18,34 q10,-8 20,-2 M62,30 q10,-8 20,-2' stroke='#8fd9c9' stroke-width='2.5' fill='none' stroke-linecap='round'/>";
    } else if (extra === "llama"){
      ex = "<path d='M50,6 q14,16 8,28 q-4,-8 -10,-8 q4,10 -6,14 q-10,-6 -6,-18 q6,-10 14,-16 Z' fill='#e8642a'/>" +
           "<path d='M20,46 q-10,10 -2,18 M80,46 q10,10 2,18' stroke='#f5a04a' stroke-width='3' fill='none' stroke-linecap='round'/>";
    } else if (extra === "hojasArbol"){
      ex = "<circle cx='34' cy='24' r='13' fill='#4a9e6b'/><circle cx='56' cy='18' r='15' fill='#3a8e5b'/><circle cx='70' cy='30' r='11' fill='#4a9e6b'/>" +
           "<circle cx='40' cy='16' r='3' fill='#f5d76e'/><circle cx='64' cy='22' r='2.6' fill='#f5d76e'/>";
    } else if (extra === "lunaMoon"){
      ex = "<path d='M62,10 a14,14 0 1,0 12,20 a11,11 0 1,1 -12,-20 Z' fill='#e8e0f8'/>" +
           "<g fill='#cfc0f0'><circle cx='24' cy='22' r='2.6'/><circle cx='36' cy='12' r='2'/></g>" +
           "<path d='M20,46 q10,-8 20,-2' stroke='#b8a8e8' stroke-width='2.5' fill='none' stroke-linecap='round'/>";
    } else if (extra === "colasZorro"){
      ex = "<path d='M76,80 q22,-6 24,-26 q-14,4 -22,14 Z' fill='#e8a04a'/>" +
           "<path d='M78,92 q24,0 30,-18 q-16,0 -26,10 Z' fill='#f0b46a'/>" +
           "<polygon points='30,30 26,10 44,24' fill='"+pc+"'/><polygon points='70,30 74,10 56,24' fill='"+pc+"'/>" +
           "<polygon points='32,28 30,16 40,25' fill='#f0c8d8'/><polygon points='68,28 70,16 60,25' fill='#f0c8d8'/>";
    } else if (extra === "loboUva"){
      ex = "<path d='M30,28 q-8,-14 0,-20 q8,4 10,16 Z' fill='"+pc+"'/><path d='M70,28 q8,-14 0,-20 q-8,4 -10,16 Z' fill='"+pc+"'/>" +
           "<g transform='translate(84,86)'><ellipse cx='0' cy='0' rx='13' ry='9' fill='#4a3a5a'/><circle cx='-8' cy='-6' r='6' fill='#4a3a5a'/><circle cx='-10' cy='-7' r='1.6' fill='#f5d76e'/><polygon points='-12,-11 -14,-18 -6,-13' fill='#4a3a5a'/></g>";
    }
    return "<svg viewBox='0 0 100 118' xmlns='http://www.w3.org/2000/svg'>" +
      back +
      "<path d='M27,118 C29,92 39,85 50,85 C61,85 71,92 73,118 Z' fill='"+ropa+"'/>" +
      "<path d='M42,87 L50,96 L58,87' fill='none' stroke='#fffbf0' stroke-width='2'/>" +
      "<circle cx='50' cy='52' r='23' fill='"+masa+"' stroke='#b5822a' stroke-width='2'/>" +
      "<circle cx='34' cy='44' r='2.6' fill='#8a5a2a'/><circle cx='66' cy='60' r='2.4' fill='#8a5a2a'/><circle cx='38' cy='68' r='2.2' fill='#8a5a2a'/>" +
      "<circle cx='40' cy='62' r='3.4' fill='#e0466a' opacity='.4'/><circle cx='60' cy='62' r='3.4' fill='#e0466a' opacity='.4'/>" +
      "<ellipse cx='42' cy='54' rx='3' ry='4.2' fill='#3a2010'/><ellipse cx='58' cy='54' rx='3' ry='4.2' fill='#3a2010'/>" +
      "<circle cx='43.2' cy='52.4' r='1.2' fill='#fff'/><circle cx='59.2' cy='52.4' r='1.2' fill='#fff'/>" +
      "<path d='M45,65 Q50,69 55,65' stroke='#8a5a3a' stroke-width='1.8' fill='none' stroke-linecap='round'/>" +
      front + ex +
    "</svg>";
  }

  var roster = [
    { nm:"Golden Cheese", cc:"#e0a63a", wp:"👑 reina de la ciudad de oro", fr:"Perdió sus recuerdos. Algún día <b>recordará</b> quién era.", pelo:"largo", pc:"#f5d76e", ropa:"#c99320", extra:"coronaSol", file:"goldencheese.png" },
    { nm:"Burnt Cheese", cc:"#c9a24a", wp:"🧀 el guardián que esperó", fr:"Dice que la profecía <b>se cumplirá</b>… ¡y él lo verá!", pelo:"corto", pc:"#d8b06a", ropa:"#a8862a", extra:"quesoViejo", file:"burntcheese.png" },
    { nm:"Wind Archer", cc:"#2fae94", wp:"🏹 arquero del viento", fr:"Espera desde hace mil años. <b>Nos ayudará</b> con su arco.", pelo:"largo", pc:"#8fd9c9", ropa:"#2fae94", extra:"arcoViento", file:"windarcher.png" },
    { nm:"Fire Spirit", cc:"#e8642a", wp:"🔥 espíritu de fuego", fr:"Es libre y salvaje: nadie sabe qué <b>hará</b> mañana.", pelo:"punta", pc:"#f5a04a", ropa:"#c94a1a", extra:"llama", file:"firespirit.png" },
    { nm:"Millennial Tree", cc:"#3a8e5b", wp:"🌳 árbol milenario", fr:"Vio nacer el reino y <b>verá</b> su futuro. Habla muy despacio.", pelo:"corto", pc:"#8a6a3a", ropa:"#3a8e5b", extra:"hojasArbol", file:"millennialtree.png" },
    { nm:"Moonlight", cc:"#8a7ac8", wp:"🌙 galleta de la luna", fr:"Trae sueños. Esta noche te <b>contará</b> uno bonito.", pelo:"onda", pc:"#cfc0f0", ropa:"#8a7ac8", extra:"lunaMoon", file:"moonlight.png" },
    { nm:"Kumiho", cc:"#e8a04a", wp:"🦊 zorra de nueve colas", fr:"Cambia de forma. ¿<b>Podrás</b> reconocerla entre la multitud?", pelo:"largo", pc:"#c98a3a", ropa:"#e8a04a", extra:"colasZorro", file:"kumiho.png" },
    { nm:"Black Raisin", cc:"#4a3a5a", wp:"🐺 cazadora con su lobo", fr:"Nunca habla mucho, pero siempre <b>llegará</b> a tiempo.", pelo:"coleta", pc:"#2a1a3a", ropa:"#4a3a5a", extra:"loboUva", file:"blackraisin.png" }
  ];
  var rBox = document.getElementById("roster");
  roster.forEach(function(c){
    var el = document.createElement("div");
    el.className = "chara";
    el.style.setProperty("--cc", c.cc);
    el.innerHTML =
      "<div class=\"av\">" + galletaSVG(c.pelo, c.pc, c.ropa, c.extra) + "</div>" +
      "<div class=\"nm\">"+c.nm+"</div>" +
      "<div class=\"wp\">"+c.wp+"</div>" +
      "<div class=\"frase\"><span>"+c.fr+"</span></div>";
    var ph = document.createElement("img");
    ph.className = "photo";
    ph.alt = c.nm;
    ph.src = "personajes/" + c.file;
    ph.addEventListener("load", function(){ el.classList.add("hasPhoto"); });
    el.insertBefore(ph, el.firstChild);
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rBox.appendChild(el);
  });

  /* ===== vocabulario ===== */
  var vocab = [
    { emo:"🏜️", es:"la arena", kr:"모래", ej:"La arena cubrió la ciudad.", qc:"var(--arena)" },
    { emo:"🥇", es:"el oro", kr:"금", ej:"Las torres son de oro.", qc:"var(--oro)" },
    { emo:"🗿", es:"la estatua", kr:"조각상", ej:"Las estatuas abren los ojos.", qc:"var(--muted)" },
    { emo:"🔮", es:"la profecía", kr:"예언", ej:"La profecía dice que volverá.", qc:"var(--uva)" },
    { emo:"🔔", es:"la campana", kr:"종", ej:"La campana suena en el desierto.", qc:"var(--jade)" },
    { emo:"🎁", es:"el regalo", kr:"선물", ej:"Le traemos un regalo a la reina.", qc:"var(--vino)" },
    { emo:"🤲", es:"dar", kr:"주다", ej:"Le doy la campana antigua.", qc:"var(--oro)" },
    { emo:"🗣️", es:"contar", kr:"이야기하다", ej:"Te cuento toda la historia.", qc:"var(--cielo)" }
  ];
  var cardsBox = document.getElementById("vocabCards");
  vocab.forEach(function(v){
    var c = document.createElement("div");
    c.className = "fcard";
    c.innerHTML =
      "<div class=\"in\">" +
        "<div class=\"face\" style=\"--qc:"+v.qc+"\"><div class=\"gem\"></div><div class=\"emo\">"+v.emo+"</div><div class=\"es\">"+v.es+"</div><div class=\"hint\">toca ✦ 터치</div></div>" +
        "<div class=\"face back\"><div class=\"kr\">"+v.kr+"</div><div class=\"ej\">"+v.ej+"</div></div>" +
      "</div>";
    c.addEventListener("click", function(){ c.classList.toggle("flipped"); });
    cardsBox.appendChild(c);
  });

  /* ===== intruso ===== */
  var intrusoRounds = [
    { words:["mañana","el año próximo","algún día","la arena"], bad:3, theme:"Las otras tres hablan del FUTURO 🔮" },
    { words:["dar","contar","regalar","la estatua"], bad:3, theme:"Las otras tres son verbos de MENSAJERO 📬" },
    { words:["el desierto","la arena","el sol","el regalo"], bad:3, theme:"Las otras tres son del DESIERTO 🏜️" }
  ];
  var intrusoIdx = 0;
  var iWords = document.getElementById("intrusoWords");
  var iFb = document.getElementById("intrusoFb");
  var iRound = document.getElementById("intrusoRound");
  function renderIntruso(){
    var r = intrusoRounds[intrusoIdx];
    iRound.textContent = "Ronda " + (intrusoIdx+1) + " / 3";
    iFb.textContent = "";
    iFb.className = "feedback";
    iWords.innerHTML = "";
    r.words.forEach(function(w, idx){
      var b = document.createElement("div");
      b.className = "word-btn";
      b.textContent = w;
      b.addEventListener("click", function(){
        if (idx === r.bad){
          b.classList.add("right");
          iFb.textContent = "🕵️ ¡Intruso capturado! " + r.theme;
          iFb.classList.add("good");
          setTimeout(function(){
            intrusoIdx++;
            if (intrusoIdx < intrusoRounds.length){ renderIntruso(); }
            else {
              iRound.textContent = "Completado";
              iWords.innerHTML = "";
              iFb.textContent = "⭐ ¡Las tres rondas completas! Pasa a la siguiente diapositiva ›";
            }
          }, 1600);
        } else {
          b.classList.add("wrong");
          iFb.textContent = "Mmm… esa palabra sí es del grupo. ¡Piensa en el tema!";
          iFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      iWords.appendChild(b);
    });
  }
  renderIntruso();

  /* ===== tablilla de la profecía (futuro) ===== */
  var pro = [
    { s:"☀️ Un día el sol se ＿＿ sobre la ciudad. (apagar)", opts:["apagaba","apagará","apaga"], ok:1, line:"p1", why:"futuro: apagar + á → apagará." },
    { s:"🏜️ La arena ＿＿ las torres. (cubrir)", opts:["cubrirá","cubría","cubre"], ok:0, line:"p2", why:"cubrir + á → cubrirá. ¡El verbo entero!" },
    { s:"🍪 Pero una galleta valiente ＿＿ del este. (venir · ¡pierde letra!)", opts:["venirá","vendrá","viene"], ok:1, line:"p3", why:"venir es especial: VENDRÁ." },
    { s:"🔔 ＿＿ una campana y todos la escucharán. (traer, ella)", opts:["Traerá","Traía","Trae"], ok:0, line:"p4", why:"traer + á → traerá." },
    { s:"👑 Entonces la reina ＿＿ su nombre. (recordar)", opts:["recuerda","recordaba","recordará"], ok:2, line:"p5", why:"recordar + á → recordará." },
    { s:"✨ Y ＿＿ luz otra vez en el reino. (hay · ¡especial!)", opts:["habrá","haberá","había"], ok:0, line:"p6", why:"hay en futuro es HABRÁ." }
  ];
  var proIdx = 0;
  var proSent = document.getElementById("proSentence");
  var proOpts = document.getElementById("proOpts");
  var proFb = document.getElementById("proFb");
  var proCount = document.getElementById("proCount");
  function renderPro(){
    var r = pro[proIdx];
    proCount.textContent = "Línea " + (proIdx+1) + " / 6";
    proFb.textContent = "";
    proFb.className = "feedback";
    proSent.textContent = r.s;
    proOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          var ln = document.getElementById(r.line);
          if (ln) ln.classList.add("on");
          proFb.textContent = "📜 ¡La línea brilla! " + r.why;
          proFb.classList.add("good");
          setTimeout(function(){
            proIdx++;
            if (proIdx < pro.length){ renderPro(); }
            else {
              proCount.textContent = "Profecía completa";
              proSent.textContent = "🔮 ¡Ya puedes leer toda la profecía dorada!";
              proOpts.innerHTML = "";
              proFb.textContent = "Ahora lee el capítulo siete ›";
            }
          }, 2400);
        } else {
          b.classList.add("wrong");
          proFb.textContent = "El futuro pega la terminación al verbo ENTERO: -é, -ás, -á, -emos, -án.";
          proFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      proOpts.appendChild(b);
    });
  }
  renderPro();

  /* ===== detective ===== */
  var det = [
    { q:"¿Por qué las torres están medio enterradas?",
      opts:["Porque las construyeron así","Porque la arena las cubrió con el tiempo","Porque son pequeñas"], ok:1,
      exp:"La profecía lo dice: <b>la arena cubrirá las torres</b>. El desierto se comió la ciudad." },
    { q:"Según la profecía, ¿quién es «la galleta valiente que vendrá»?",
      opts:["GingerBrave y su equipo","La reina","Una estatua"], ok:0,
      exp:"El texto no lo dice directo, pero ellos <b>acaban de llegar</b> con una campana. ¡La profecía habla de ellos!" },
    { q:"¿Las estatuas están rotas o vivas?",
      opts:["Están rotas","Son solo decoración","Están vivas: abren los ojos"], ok:2,
      exp:"<b>Abren los ojos</b>: son guardianes de la ciudad y todavía no confían en nadie." },
    { q:"¿Cómo sabemos que el equipo viene en paz?",
      opts:["Porque quieren ayudar y contar la verdad","Porque quieren el oro","No se sabe"], ok:0,
      exp:"GingerBrave dice: <b>la ayudaremos</b> y <b>le contaremos toda la verdad</b>. Vienen a ayudar." }
  ];
  var detIdx = 0;
  var dQ = document.getElementById("detQ");
  var dOpts = document.getElementById("detOpts");
  var dExp = document.getElementById("detExp");
  var dRound = document.getElementById("detRound");
  function renderDet(){
    var r = det[detIdx];
    dRound.textContent = "Pregunta " + (detIdx+1) + " / 4";
    dQ.textContent = r.q;
    dExp.innerHTML = "";
    dOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          dExp.innerHTML = "✅ " + r.exp;
          setTimeout(function(){
            detIdx++;
            if (detIdx < det.length){ renderDet(); }
            else {
              dRound.textContent = "Caso cerrado";
              dQ.textContent = "🕵️ ¡Excelente, detective! Resolviste las cuatro preguntas.";
              dOpts.innerHTML = "";
              dExp.textContent = "Ahora, el mensajero ›";
            }
          }, 2600);
        } else {
          b.classList.add("wrong");
          dExp.innerHTML = "Busca las pistas en el texto otra vez…";
        }
      });
      dOpts.appendChild(b);
    });
  }
  renderDet();

  /* ===== ave mensajera (OI) ===== */
  var destX = [70, 190, 310, 420, 530];
  var ave = [
    { s:"🔔 Financier ＿＿ da la campana a la reina.", opts:["me","le","les"], ok:1, d:2, why:"a la reina (una persona, él/ella) → LE." },
    { s:"🎁 Yo ＿＿ traigo un regalo a ti.", opts:["te","le","nos"], ok:0, d:1, why:"a ti → TE." },
    { s:"📖 El guardián ＿＿ cuenta la historia a nosotros.", opts:["les","nos","me"], ok:1, d:3, why:"a nosotros → NOS." },
    { s:"🍪 GingerBrave ＿＿ da gelatinas a sus amigos.", opts:["les","le","te"], ok:0, d:4, why:"a sus amigos (varias personas) → LES." },
    { s:"✉️ ¿Tú ＿＿ escribes una carta a mí?", opts:["te","le","me"], ok:2, d:0, why:"a mí → ME." },
    { s:"👑 Nosotros vamos a decir＿＿ la verdad a la reina.", opts:["le","les","me"], ok:0, d:2, why:"a la reina → LE (pegado al infinitivo: decirle)." }
  ];
  var aveIdx = 0;
  var aveSent = document.getElementById("aveSentence");
  var aveOpts = document.getElementById("aveOpts");
  var aveFb = document.getElementById("aveFb");
  var aveCount = document.getElementById("aveCount");
  var aveEl = document.getElementById("ave");
  function volar(d){
    var dx = destX[d] - destX[0];
    aveEl.setAttribute("transform", "translate(" + dx + ",0)");
    for (var k = 0; k < 5; k++){
      var t = document.getElementById("d" + k);
      if (t) t.classList.toggle("glow", k === d);
    }
  }
  function renderAve(){
    var r = ave[aveIdx];
    aveCount.textContent = "Mensaje " + (aveIdx+1) + " / 6";
    aveFb.textContent = "";
    aveFb.className = "feedback";
    aveSent.textContent = r.s;
    aveOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("button");
      b.className = "end-btn";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          volar(r.d);
          aveFb.textContent = "🐦 ¡Mensaje entregado! " + r.why;
          aveFb.classList.add("good");
          setTimeout(function(){
            aveIdx++;
            if (aveIdx < ave.length){ renderAve(); }
            else {
              aveCount.textContent = "Correo completo";
              aveSent.textContent = "📬 ¡Todos los mensajes llegaron! Dominas el mensajero.";
              aveOpts.innerHTML = "";
              aveFb.textContent = "Sigue el capítulo ocho ›";
            }
          }, 2400);
        } else {
          b.classList.add("wrong");
          aveFb.textContent = "Pregúntate: ¿A QUIÉN llega la cosa? ¿a mí, a ti, a él, a nosotros o a ellos?";
          aveFb.className = "feedback oops";
          setTimeout(function(){ b.classList.remove("wrong"); }, 400);
        }
      });
      aveOpts.appendChild(b);
    });
  }
  renderAve();

  /* ===== ordena la historia ===== */
  var events = [
    "El equipo entra en el salón del trono.",
    "La reina pregunta quiénes son y qué le quieren quitar.",
    "Financier le da la campana antigua.",
    "Le cuentan la historia de su reino y de su gente.",
    "La reina toca la campana y sus ojos brillan."
  ];
  var shuffled = [3,0,4,1,2];
  var expected = 0;
  var oList = document.getElementById("orderList");
  var oFb = document.getElementById("orderFb");
  shuffled.forEach(function(evIdx){
    var el = document.createElement("div");
    el.className = "ev";
    el.innerHTML = "<span class=\"num\">?</span><span>" + events[evIdx] + "</span>";
    el.addEventListener("click", function(){
      if (el.classList.contains("locked")) return;
      if (evIdx === expected){
        el.classList.add("locked");
        el.querySelector(".num").textContent = expected + 1;
        expected++;
        if (expected === events.length){
          oFb.textContent = "🔔 ¡Historia perfecta! Un recuerdo volvió con el sonido.";
          oFb.className = "feedback good";
        } else {
          oFb.textContent = "✅ ¡Sí! ¿Y qué pasa después?";
          oFb.className = "feedback good";
        }
      } else {
        el.classList.add("wrong");
        oFb.textContent = "Todavía no… recuerda la escena del trono.";
        oFb.className = "feedback oops";
        setTimeout(function(){ el.classList.remove("wrong"); }, 450);
      }
    });
    oList.appendChild(el);
  });

  /* ===== confeti ===== */
  var confChars = ["✦","🔔","🐦","🥇","🍪","🔮"];
  function confettiBurst(){
    for (var c = 0; c < 34; c++){
      var f = document.createElement("div");
      f.className = "confetti";
      f.textContent = confChars[c % confChars.length];
      f.style.left = (Math.random()*100) + "vw";
      f.style.animationDuration = (1.6 + Math.random()*2.4) + "s";
      f.style.animationDelay = (Math.random()*0.6) + "s";
      document.body.appendChild(f);
      (function(node){ setTimeout(function(){ node.remove(); }, 5200); })(f);
    }
  }
  var cutin = document.getElementById("cutin");

  /* ===== combate 1: Coloso Dorado ===== */
  var boss = [
    { q:"Mañana nosotros ＿＿ al desierto. (viajar)", opts:["viajamos","viajaremos","viajábamos"], ok:1 },
    { q:"Algún día la reina ＿＿ su nombre. (recordar)", opts:["recordará","recordaba","recuerda"], ok:0 },
    { q:"Yo ＿＿ mucho cuidado. (tener · ¡especial!)", opts:["teneré","tendré","tenía"], ok:1 },
    { q:"¿Tú ＿＿ ayudarnos? (poder · ¡especial!)", opts:["poderás","podrás","podías"], ok:1 },
    { q:"En la fiesta ＿＿ música y comida. (hay)", opts:["habrá","haberá","había"], ok:0 },
    { q:"¿Cuál NO es palabra del futuro?", opts:["el año próximo","algún día","hace años"], ok:2 }
  ];
  var bossIdx = 0;
  var hp = boss.length;
  var bQ = document.getElementById("bossQ");
  var bOpts = document.getElementById("bossOpts");
  var bHp = document.getElementById("bossHp");
  var bSprite = document.getElementById("bossSprite");
  var bGame = document.getElementById("bossGame");
  var bWin = document.getElementById("bossWin");
  var field = document.getElementById("battlefield");
  var mini = document.getElementById("miniSlash");
  function spawnDamage(f){
    var d = document.createElement("div");
    d.className = "dmg";
    d.textContent = String(800 + Math.floor(Math.random()*2200));
    d.style.left = (42 + Math.random()*16) + "%";
    d.style.top = "22%";
    f.appendChild(d);
    setTimeout(function(){ d.remove(); }, 950);
  }
  function oroHit(){
    mini.classList.remove("go");
    void mini.offsetWidth;
    mini.classList.add("go");
    bSprite.classList.add("hit");
    spawnDamage(field);
    setTimeout(function(){ bSprite.classList.remove("hit"); }, 520);
  }
  function renderBoss(){
    var r = boss[bossIdx];
    bQ.textContent = "🗿 Ataque " + (bossIdx+1) + ": " + r.q;
    bOpts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp--;
          bHp.style.width = (hp/boss.length)*100 + "%";
          var isLast = (bossIdx === boss.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡LA CIUDAD DESPIERTA!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(oroHit, 700);
            setTimeout(function(){
              bSprite.textContent = "🏛️";
              bGame.classList.add("hidden");
              bWin.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            oroHit();
            setTimeout(function(){
              bossIdx++;
              renderBoss();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      bOpts.appendChild(b);
    });
  }
  renderBoss();

  /* ============ ACTO II ============ */

  /* ===== memoria ===== */
  var memoPairs = [
    { es:"la arena", m:"🏜️ 모래" },
    { es:"el oro", m:"🥇 금" },
    { es:"la estatua", m:"🗿 조각상" },
    { es:"la profecía", m:"🔮 예언" },
    { es:"la campana", m:"🔔 종" },
    { es:"el regalo", m:"🎁 선물" }
  ];
  var memoCards = [];
  memoPairs.forEach(function(p, i){
    memoCards.push({ pid:i, label:p.es });
    memoCards.push({ pid:i, label:p.m });
  });
  for (var m = memoCards.length - 1; m > 0; m--){
    var j = Math.floor(Math.random() * (m + 1));
    var tmp = memoCards[m]; memoCards[m] = memoCards[j]; memoCards[j] = tmp;
  }
  var memoGrid = document.getElementById("memoGrid");
  var memoStats = document.getElementById("memoStats");
  var memoFb = document.getElementById("memoFb");
  var memoOpen = [];
  var memoFound = 0;
  var memoTries = 0;
  function memoUpdate(){
    memoStats.textContent = "Parejas: " + memoFound + " / 6 · Intentos: " + memoTries;
  }
  memoCards.forEach(function(c){
    var el = document.createElement("div");
    el.className = "mcard";
    el.textContent = "✦";
    el.addEventListener("click", function(){
      if (el.classList.contains("lock") || el.classList.contains("up") || memoOpen.length === 2) return;
      el.classList.add("up");
      el.textContent = c.label;
      memoOpen.push({ el:el, pid:c.pid });
      if (memoOpen.length === 2){
        memoTries++;
        if (memoOpen[0].pid === memoOpen[1].pid){
          memoOpen[0].el.classList.add("lock");
          memoOpen[1].el.classList.add("lock");
          memoOpen = [];
          memoFound++;
          memoFb.textContent = "✦ ¡Pareja! Dila en voz alta.";
          memoFb.className = "feedback good";
          if (memoFound === 6){
            memoFb.textContent = "⭐ ¡Memoria completa! Tesoro dorado recuperado.";
          }
        } else {
          memoFb.textContent = "No son pareja… ¡memoria de exploradora!";
          memoFb.className = "feedback oops";
          var a = memoOpen[0].el, bEl = memoOpen[1].el;
          memoOpen = [];
          setTimeout(function(){
            a.classList.remove("up"); a.textContent = "✦";
            bEl.classList.remove("up"); bEl.textContent = "✦";
          }, 1000);
        }
        memoUpdate();
      }
    });
    memoGrid.appendChild(el);
  });
  memoUpdate();

  /* ===== rol + Burnt Cheese ===== */
  var rolItems = [
    { t:"📅 Tu mañana", m:"Mañana ____ (haré / iré / estudiaré) ____ ." },
    { t:"✈️ Tu viaje soñado", m:"Algún día viajaré a ____ y allí ____ ." },
    { t:"🔮 Tu profecía", m:"Dentro de diez años seré ____ y tendré ____ ." },
    { t:"🎁 Tu regalo", m:"A mi ____ le regalaré ____ ." },
    { t:"📬 Tu mensaje", m:"A mis amigos les diré que ____ ." }
  ];
  var rolList = document.getElementById("rolList");
  rolItems.forEach(function(r){
    var el = document.createElement("div");
    el.className = "rline";
    el.innerHTML = r.t + "<span class=\"tap\">toca ✦</span><div class=\"model\">🗣️ " + r.m + "</div>";
    el.addEventListener("click", function(){ el.classList.toggle("open"); });
    rolList.appendChild(el);
  });

  var ivQs = [
    { q:"¿Qué harás mañana después de la clase?", h:"Mañana..." },
    { q:"¿Dónde vivirás dentro de diez años?", h:"Viviré en..." },
    { q:"¿Qué le regalarás a tu mamá en su cumpleaños?", h:"Le regalaré..." },
    { q:"¿Qué me contarás de tu país?", h:"Te contaré que..." },
    { q:"¿Tendrás una mascota algún día? ¿Cuál?", h:"Sí, tendré... / No, no tendré..." },
    { q:"¿Habrá una fiesta pronto en tu casa?", h:"Sí, habrá... / No, no habrá..." },
    { q:"¿A quién le escribirás una carta?", h:"Le escribiré a..." },
    { q:"¿Qué idiomas hablarás en el futuro?", h:"Hablaré..." },
    { q:"¿Qué les dirás a tus amigos sobre el español?", h:"Les diré que..." },
    { q:"¿Cómo será tu casa ideal?", h:"Mi casa será..." }
  ];
  var ivPool = [];
  var ivQ = document.getElementById("ivQ");
  var ivHint = document.getElementById("ivHint");
  document.getElementById("ivBtn").addEventListener("click", function(){
    if (ivPool.length === 0){ ivPool = ivQs.slice(); }
    var pick = Math.floor(Math.random() * ivPool.length);
    var q = ivPool.splice(pick, 1)[0];
    ivQ.textContent = "🧀 " + q.q;
    ivHint.textContent = "Pista: " + q.h;
  });

  /* ===== ¿y tú? ===== */
  var compItems = [
    { s:"La reina despertará y recordará su nombre.", si:"¡Yo también recordaré este día siempre!", no:"Yo no sé qué pasará mañana. ¡Es un misterio!" },
    { s:"El equipo viajará a otros reinos muy lejos.", si:"¡Yo también viajaré lejos algún día! Iré a...", no:"Yo no viajaré lejos. Me quedaré cerca de mi familia." },
    { s:"Habrá una gran fiesta en la ciudad de oro.", si:"¡En mi casa también habrá una fiesta pronto!", no:"En mi casa no habrá fiestas. Estaremos tranquilos." },
    { s:"Burnt Cheese le contará la historia a todo el mundo.", si:"¡Yo también les contaré esta historia a mis amigos!", no:"Yo no. Será mi secreto." },
    { s:"Las galletas construirán un reino todavía más grande.", si:"¡Yo también construiré algo grande: seré...!", no:"Yo prefiero algo pequeño y tranquilo." }
  ];
  var compIdx = 0;
  var compSent = document.getElementById("compSent");
  var compModel = document.getElementById("compModel");
  var compRound = document.getElementById("compRound");
  function renderComp(){
    var r = compItems[compIdx];
    compRound.textContent = "Frase " + (compIdx+1) + " / 5";
    compSent.textContent = r.s;
    compModel.innerHTML = "";
  }
  function compAnswer(kind){
    if (compIdx >= compItems.length) return;
    var r = compItems[compIdx];
    var txt = (kind === "si") ? r.si : r.no;
    compModel.innerHTML = "🗣️ " + txt + "<span class=\"say\">Dilo en voz alta y completa la frase.</span>";
    setTimeout(function(){
      compIdx++;
      if (compIdx < compItems.length){ renderComp(); }
      else {
        compRound.textContent = "Completado";
        compSent.textContent = "⭐ ¡Ya escribes tu propia profecía!";
        compModel.innerHTML = "Siguiente misión: el dictado ›";
      }
    }, 3400);
  }
  document.getElementById("compSi").addEventListener("click", function(){ compAnswer("si"); });
  document.getElementById("compNo").addEventListener("click", function(){ compAnswer("no"); });
  renderComp();

  /* ===== dictado ===== */
  var dictItems = [
    "Mañana viajaremos al reino de oro.",
    "Un día la reina recordará todo.",
    "Le doy la campana a Financier.",
    "¿Me cuentas la profecía otra vez?",
    "Les daremos el tesoro a las galletas."
  ];
  var dictIdx = 0;
  var dictIn = document.getElementById("dictIn");
  var dictFb = document.getElementById("dictFb");
  var dictRound = document.getElementById("dictRound");
  var dictSecret = document.getElementById("dictSecret");
  function dictNorm(s){
    return s.toLowerCase().replace(/[.,;:!?¡¿"«»]/g, "").replace(/\s+/g, " ").trim();
  }
  function dictDeacc(s){
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function speak(text, rate){
    if (!window.speechSynthesis){ dictFb.textContent = "Este navegador no tiene voz: la profe lee el mensaje 👩‍🏫"; dictFb.className = "feedback oops"; return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = rate;
    var vs = window.speechSynthesis.getVoices();
    for (var v = 0; v < vs.length; v++){
      if (vs[v].lang && vs[v].lang.indexOf("es") === 0){ u.voice = vs[v]; break; }
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
  function renderDict(){
    dictRound.textContent = "Mensaje " + (dictIdx+1) + " / 5";
    dictIn.value = "";
    dictFb.textContent = "";
    dictFb.className = "feedback";
    dictSecret.textContent = dictItems[dictIdx];
  }
  document.getElementById("dictPlay").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.82); });
  document.getElementById("dictSlow").addEventListener("click", function(){ speak(dictItems[dictIdx], 0.55); });
  document.getElementById("dictCheck").addEventListener("click", function(){
    var ans = dictNorm(dictIn.value);
    var target = dictNorm(dictItems[dictIdx]);
    if (ans === target){
      dictFb.textContent = "📜 ¡La tablilla brilla! Mensaje perfecto.";
      dictFb.className = "feedback good";
    } else if (ans !== "" && dictDeacc(ans) === dictDeacc(target)){
      dictFb.textContent = "¡Casi perfecto! Revisa las tildes: " + dictItems[dictIdx];
      dictFb.className = "feedback oops";
    } else {
      dictFb.textContent = "Escucha otra vez… pista: la frase tiene " + dictItems[dictIdx].split(" ").length + " palabras.";
      dictFb.className = "feedback oops";
    }
  });
  document.getElementById("dictNext").addEventListener("click", function(){
    dictIdx++;
    if (dictIdx < dictItems.length){ renderDict(); }
    else {
      dictIdx = dictItems.length - 1;
      dictRound.textContent = "Dictado completado";
      dictFb.textContent = "⭐ ¡Cinco líneas descifradas! La reina te espera ›";
      dictFb.className = "feedback good";
    }
  });
  renderDict();

  /* ===== jefe final: Golden Cheese ===== */
  var boss2 = [
    { q:"🔮 Nosotros ＿＿ la verdad. (decir · ¡especial!)", opts:["deciremos","diremos","decíamos"], ok:1 },
    { q:"🔔 Financier ＿＿ da la campana a la reina.", opts:["le","les","te"], ok:0 },
    { q:"🎁 Yo ＿＿ traigo un regalo a ustedes.", opts:["le","me","les"], ok:2 },
    { q:"👑 Algún día usted ＿＿ todo. (recordar)", opts:["recordará","recordaba","recuerda"], ok:0 },
    { q:"⚠️ 🎞️ Antes usted ＿＿ a su gente. (proteger)", opts:["protegerá","protegía","protege"], ok:1 },
    { q:"⚠️ 🔁 — ¿Conoces este sonido? — Sí, ＿＿ conozco.", opts:["le","lo","les"], ok:1 },
    { q:"✨ Mañana ＿＿ luz otra vez en la ciudad. (hay)", opts:["habrá","había","hay"], ok:0 },
    { q:"📬 Vamos a contar＿＿ la historia a la reina.", opts:["le","lo","la"], ok:0 }
  ];
  var boss2Idx = 0;
  var hp2 = boss2.length;
  var b2Q = document.getElementById("boss2Q");
  var b2Opts = document.getElementById("boss2Opts");
  var b2Hp = document.getElementById("boss2Hp");
  var b2Sprite = document.getElementById("boss2Sprite");
  var b2Game = document.getElementById("boss2Game");
  var b2Win = document.getElementById("boss2Win");
  var field2 = document.getElementById("battlefield2");
  var mini2 = document.getElementById("miniSlash2");
  function oroHit2(){
    mini2.classList.remove("go");
    void mini2.offsetWidth;
    mini2.classList.add("go");
    b2Sprite.classList.add("hit");
    spawnDamage(field2);
    setTimeout(function(){ b2Sprite.classList.remove("hit"); }, 520);
  }
  function renderBoss2(){
    var r = boss2[boss2Idx];
    b2Q.textContent = "👑 Ataque " + (boss2Idx+1) + ": " + r.q;
    b2Opts.innerHTML = "";
    r.opts.forEach(function(op, idx){
      var b = document.createElement("div");
      b.className = "opt";
      b.style.textAlign = "center";
      b.textContent = op;
      b.addEventListener("click", function(){
        if (idx === r.ok){
          b.classList.add("right");
          hp2--;
          b2Hp.style.width = (hp2/boss2.length)*100 + "%";
          var isLast = (boss2Idx === boss2.length - 1);
          if (isLast){
            document.getElementById("cutinTxt").textContent = "¡SUENA LA CAMPANA DORADA!";
            cutin.classList.remove("go");
            void cutin.offsetWidth;
            cutin.classList.add("go");
            setTimeout(oroHit2, 700);
            setTimeout(function(){
              b2Sprite.textContent = "🕊️";
              b2Game.classList.add("hidden");
              b2Win.classList.remove("hidden");
              confettiBurst();
            }, 2100);
          } else {
            oroHit2();
            setTimeout(function(){
              boss2Idx++;
              renderBoss2();
            }, 950);
          }
        } else {
          b.classList.add("wrong");
        }
      });
      b2Opts.appendChild(b);
    });
  }
  renderBoss2();

  /* init */
  goTo(0, true);
})();
