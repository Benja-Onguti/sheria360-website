(function(){
  var isMobile=function(){return window.innerWidth<768;};
  var open=false;
  var btn=document.createElement('button');
  btn.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';
  function posBtn(){btn.style.cssText='position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;background:#058af0;color:white;border:none;cursor:pointer;z-index:10000;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.2)';}
  posBtn();
  var frame=document.createElement('iframe');
  frame.src='https://chatngage.com/widget/11';
  frame.allow='microphone';
  frame.style.outline='none';
  function applyPos(){
    if(isMobile()){
      frame.style.cssText='position:fixed;bottom:0;left:0;right:0;width:100%;height:90vh;border:none;outline:none;border-radius:16px 16px 0 0;box-shadow:0 -8px 32px rgba(0,0,0,.18);z-index:9999;display:block;';
    } else {
      frame.style.cssText='position:fixed;bottom:88px;left:auto;right:20px;width:400px;height:600px;border:none;outline:none;border-radius:16px;box-shadow:0 25px 50px rgba(0,0,0,.15);z-index:9999;display:block;';
    }
  }
  frame.style.display='none';
  function setOpen(val){
    open=val;
    if(open){applyPos();sessionStorage.setItem('chatngage_opened_11','1');}else{frame.style.display='none';}
    btn.style.display=open&&isMobile()?'none':'flex';
  }
  btn.onclick=function(){setOpen(!open);};
  window.addEventListener('resize',function(){if(open)applyPos();posBtn();if(open)btn.style.display=open&&isMobile()?'none':'flex';});
  window.addEventListener('message',function(e){
    if(!e.data||!e.data.type)return;
    if(e.data.type==='chatngage:close')setOpen(false);
    if(e.data.type==='chatngage:minimize')setOpen(false);
    if(e.data.type==='chatngage:restore')setOpen(true);
    if(e.data.type==='chatngage:expand'){frame.style.width='100vw';frame.style.height='100vh';frame.style.bottom='0';frame.style.right='0';frame.style.borderRadius='0';}
  });
  document.body.appendChild(frame);
  document.body.appendChild(btn);
  if(!sessionStorage.getItem('chatngage_opened_11')){fetch('https://chatngage.com/api/chat/info/11').then(function(r){return r.json();}).then(function(info){if(info.proactiveTriggerEnabled){var d=(info.proactiveTriggerDelaySeconds||5)*1000;setTimeout(function(){if(!sessionStorage.getItem('chatngage_opened_11')){setOpen(true);frame.contentWindow.postMessage({type:'chatngage:proactive-open'},'*');}},d);}}).catch(function(){});}
})();