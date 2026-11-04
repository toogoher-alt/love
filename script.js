// ===== غيّري التاريخ ده لتاريخ بداية قصتكم =====
const START = new Date("2025-08-01T00:00:00");
// ===== الجملة الرئيسية =====
const TITLE = "حبيبتي، أنتِ نبض قلبي ❤️";

// كتابة تلقائية
let i = 0; const t = document.getElementById("typed");
(function type(){ if(i <= TITLE.length){ t.textContent = TITLE.slice(0,i++); setTimeout(type,90); } })();

// عدّاد وقت الحب
function tick(){
  let diff = Math.floor((Date.now() - START) / 1000);
  const d = Math.floor(diff/86400), h = Math.floor(diff%86400/3600), m = Math.floor(diff%3600/60), s = diff%60;
  document.getElementById("d").textContent = d;
  document.getElementById("h").textContent = h;
  document.getElementById("m").textContent = m;
  document.getElementById("s").textContent = s;
}
tick(); setInterval(tick,1000);

// قلوب متحركة
const cv = document.getElementById("hearts"), ctx = cv.getContext("2d");
let W, H, hearts = [];
function resize(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
resize(); addEventListener("resize", resize);
const icons = ["❤️","💖","💕","💗","🌹"];
function spawn(x, y){
  hearts.push({x: x ?? Math.random()*W, y: y ?? H+30, s: 14+Math.random()*26,
    v: 0.6+Math.random()*1.6, sw: Math.random()*2, a: Math.random()*6, o: .4+Math.random()*.6,
    e: icons[Math.floor(Math.random()*icons.length)]});
}
for(let k=0;k<25;k++) spawn(Math.random()*W, Math.random()*H);
(function loop(){
  ctx.clearRect(0,0,W,H);
  if(Math.random()<.08) spawn();
  hearts = hearts.filter(h => h.y > -40);
  hearts.forEach(h => {
    h.y -= h.v; h.a += .03; h.x += Math.sin(h.a)*h.sw;
    ctx.globalAlpha = h.o; ctx.font = h.s + "px serif"; ctx.fillText(h.e, h.x, h.y);
  });
  requestAnimationFrame(loop);
})();

// الضغط على الشاشة = قلوب
addEventListener("pointerdown", e => { for(let k=0;k<6;k++) spawn(e.clientX+(Math.random()*40-20), e.clientY); });

// نافذة الحب + انفجار قلوب
const pop = document.getElementById("pop");
document.getElementById("love").onclick = () => { pop.classList.add("show"); for(let k=0;k<40;k++) spawn(Math.random()*W, H); };
document.getElementById("close").onclick = () => pop.classList.remove("show");

// كتابة الرسالة عند الظهور
const msg = document.getElementById("msg"), full = msg.textContent; msg.textContent = "";
new IntersectionObserver((en, ob) => { if(en[0].isIntersecting){ ob.disconnect(); let j=0; (function w(){ msg.textContent = full.slice(0,j++); if(j<=full.length) setTimeout(w,45); })(); } }).observe(msg);