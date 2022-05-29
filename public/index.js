const startingLocation = window.location.pathname.substring(1);
//alert(startingLocation);

var cmnty;
var cmnt;
var dtail;


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

  hit('midwiket');
  
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

  function updateScore(sco){

    if(sco.BatName1){
      
    document.getElementById("Teambat1name").innerHTML = sco.BatName1;  
    document.getElementById("bat1Score").innerHTML = sco.BatRun1;
    }
 
    
    if(sco.BatName2){
      document.getElementById("Teambat2name").innerHTML = sco.BatName2;  
      document.getElementById("bat2Score").innerHTML = sco.BatRun2; 
      
    }


    
 }
 
 

function updateit(sts){
   document.getElementById("statusbar").innerHTML = sts;  
}

// function updateTitle(tit){
//    document.getElementById("vs").innerHTML = tit;  
// }


function updateBat1(name,run){
   document.getElementById("bat1name").innerHTML = name;  
   document.getElementById("bat1run").innerHTML = run;  
}

function updateBat2(name,run){
  document.getElementById("bat2name").innerHTML = name;  
  document.getElementById("bat2run").innerHTML = run;  
}


function updateBowler(name,over,wiket){
   document.getElementById("bowlerName").innerHTML = name;
   document.getElementById("bowlerOW").innerHTML = over + "-" + wiket;  
}

function updatelbb(lbb){
   document.getElementById("lbb").innerHTML = lbb;
   let lb = lbb.split(' ');
   lb = lb[lb.length - 1];
   document.getElementById("lb").innerHTML = lb;
   console.log(lb);
}

socket.on('img',(st) =>{
  console.log(st);
})

socket.on('message',(status)=> {

  console.log(status);
  //console.log(status.commentry);

    if (status.commentry.includes("point")) {
    point();
  }
  
  else if (status.commentry.includes("mid-on")) {
    midOn();
  }

  else if (status.commentry.includes("mid-of")) {
    midOff();
  }

  else if (status.commentry.includes("mid-wicket")) {
    midwiket();
  }
  
  else if (status.commentry.includes("square")) {
    squreLeg();
  }
  
  else if (status.commentry.includes("third")) {
    thirdman();
  }
  
  else if (status.commentry.includes("cover")) {
    deepExtracover();
  }

  else if (status.commentry.includes("long-on")) {
    midwiket();
  }
  else if (status.commentry.includes("long-of")) {
    deepExtracover();
  }
  
  
  
  if (status.commentry != dtail){
      dtail = status.commentry;
      //console.log(status.commentry);
      
 }

  cmnt = cmnty;
  cmnty = status.batTeam;

  updateScore(status.batTeam);
  
   updateit(status.status);
   updatelbb(status.lbb);
  // updateTitle(status.title);
  // console.log(status.batTeam);
   updateBat1(status.batsman1name,status.batsman1run);
   updateBat2(status.batsman2name,status.batsman2run);
   updateBowler(status.bowlername,status.bowlerover,status.bowlerwikwt );

  if (status.commentry.includes("point")) {
    point();
  }
  
  else if (status.commentry.includes("mid-on")) {
    midOn();
  }

  else if (status.commentry.includes("mid-of")) {
    midOff();
  }

  else if (status.commentry.includes("mid-wicket")) {
    midwiket();
  }
  
  else if (status.commentry.includes("square")) {
    squreLeg();
  }
  
  else if (status.commentry.includes("third")) {
    thirdman();
  }
  
  else if (status.commentry.includes("cover")) {
    deepExtracover();
  }

  else if (status.commentry.includes("long-on")) {
    midwiket();
  }
  else if (status.commentry.includes("long-of")) {
    deepExtracover();
  }
  
});

function hit(pos){
  socket.emit('message',pos);
}