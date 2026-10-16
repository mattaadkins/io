/* Tacky pop-up ad: slides side to side; the close box dodges for the first ten seconds. */
(function(){
  var ad=document.querySelector('.ad-pop');
  if(!ad) return;
  var x=ad.querySelector('.ad-x'),body=ad.querySelector('.ad-body'),dodging=true;
  function hop(){
    var w=ad.clientWidth,h=ad.clientHeight,bw=x.offsetWidth,bh=x.offsetHeight;
    var cur={l:x.offsetLeft,t:x.offsetTop},nl,nt,n=0;
    do{nl=Math.random()*(w-bw);nt=Math.random()*(h-bh);n++}
    while(n<20&&Math.abs(nl-cur.l)+Math.abs(nt-cur.t)<Math.min(w,h)*.6);
    x.style.right='auto';x.style.left=nl+'px';x.style.top=nt+'px';
  }
  function tame(){
    dodging=false;
    x.style.left='';x.style.top='';x.style.right='';
  }
  setTimeout(function(){
    ad.hidden=false;
    var v=ad.querySelector('video');
    if(v){v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){})}
    setTimeout(tame,10000);
  },1500);
  document.addEventListener('pointermove',function(e){
    if(!dodging||ad.hidden) return;
    var r=x.getBoundingClientRect();
    if(Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))<70) hop();
  });
  x.addEventListener('touchstart',function(e){if(dodging){e.preventDefault();hop()}},{passive:false});
  x.addEventListener('pointerdown',function(e){if(dodging){e.preventDefault();hop()}});
  x.addEventListener('click',function(e){
    e.preventDefault();
    if(dodging){hop();return}
    ad.remove();
  });
  body.addEventListener('click',function(e){
    e.preventDefault();
    var b=ad.querySelector('.ad-btn');
    b.textContent='OFFER EXPIRED';
  });
})();
