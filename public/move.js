/* Midwicket */


function midwiket(run){
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f7");
    
    if(run < 4 || !run){
      ball.style.animation = "midwiket-ball 4s";
    }
    else{
      ball.style.animation = "midwiket-ball-boundary 4s";
    }
    
    filder.style.animation = "midwiket-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
    
  }
  
  
  /* Extracover */
  
  function deepExtracover(run){
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f8");
    
    if(run < 4 || !run){
      ball.style.animation = "deepExtracover-ball 4s";
    }
    else{
      ball.style.animation = "deepExtracover-ball-boundary 4s";
    }
    
    filder.style.animation = "deepExtracover-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
    
  }
  
  
  /* Thirdman */
  
    function thirdman(run){
    
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f2");
    
    if(run < 4 || !run){
      ball.style.animation = "thirdman-ball 4s";
    }
    else{
      ball.style.animation = "thirdman-ball-boundary 4s";
    }
    
    filder.style.animation = "thirdman-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
      
      
    }
  
  /* squreLeg */
  
    function squreLeg(run){
    
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f1");
    
    if(run < 4 || !run){
      ball.style.animation = "squreLeg-ball 4s";
    }
    else{
      ball.style.animation = "squreLeg-ball-boundary 4s";
    }
    
    filder.style.animation = "squreLeg-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
    }
  
  
  
  /*  point */
  
    function point(run){
    
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f9");
    
    if(run < 4 || !run){
      ball.style.animation = "point-ball 4s";
    }
    else{
      ball.style.animation = "point-ball-boundary 4s";
    }
    
    filder.style.animation = "point-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
    }
  
  /*  midOff */
  
    function midOff(run){
     
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f3");
    
    if(run < 4 || !run){
      ball.style.animation = "midOff-ball 4s";
    }
    else{
      ball.style.animation = "midOff-ball-boundary 4s";
    }
    
    filder.style.animation = "midOff-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
  
    }
  
  /*  midOn */
  
    function midOn(run){
     
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f4");
    
    if(run < 4 || !run){
      ball.style.animation = "midOn-ball 4s";
    }
    else{
      ball.style.animation = "midOn-ball-boundary 4s";
    }
    
    filder.style.animation = "midOn-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
  
    }
  
  
  /* fineLeg */
  
    function fineLeg(run){
     
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f5");
    
    if(run < 4 || !run){
      ball.style.animation = "fineLeg-ball 4s";
    }
    else{
      ball.style.animation = "fineLeg-ball-boundary 4s";
    }
    
    filder.style.animation = "fineLeg-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
  
    }
  
  /* gully */
  
    function gully(run){
     
    const ball = document.getElementById("ball");
    const filder = document.getElementById("f6");
    
    if(run < 4 || !run){
      ball.style.animation = "gully-ball 4s";
    }
    else{
      ball.style.animation = "gully-ball-boundary 4s";
    }
    
    filder.style.animation = "gully-filder 5s";
    
    setTimeout(function() {
      ball.style.animation = "";
    }, 4000);
    setTimeout(function() {
      filder.style.animation = "";
    }, 5000);
  
    }