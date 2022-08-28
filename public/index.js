const startingLocation = window.location.pathname.substring(1);
//alert(startingLocation);

var cmnty;
var cmnt;
var dtail;
var bat1img,bat2img,bowlerimg;

function scroll(){
  let elm = document.getElementById("myDIV");
  setTimeout(function() {
    elm.scrollTop = elm.scrollHeight;
  }, 300);
  document.getElementById('usrnme').value = localStorage.getItem("name");
}

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
  function showAD(){
    document.getElementById("adv").style.display = "block";
  }

  
  function hideAD(){
    document.getElementById("adv").style.display = "none";
  }


  function updateScore(sco){

    if(sco.BatName1){
    document.getElementById("Teambat1name").innerHTML = sco.BatName1;  
    document.getElementById("bat1Score").innerHTML = sco.BatRun1;
     let ovr = sco.BatRun1.split(' ');
    ovr = ovr[ovr.length - 1];
    console.log(ovr);
    if (ovr.includes(".")) {
      hideAD();
    }
    else{
      showAD();
    }
    }
 
    
    if(sco.BatName2){
      document.getElementById("Teambat2name").innerHTML = sco.BatName2;  
      document.getElementById("bat2Score").innerHTML = sco.BatRun2; 
      
    }


    
 }
 
 

function updateit(sts){
   document.getElementById("statusbar").innerHTML = sts;  
}
function updatePS(sts){
   document.getElementById("ps").innerHTML = sts;  
}
function updateLW(sts){
   document.getElementById("lw").innerHTML = sts;  
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

function updatelbb(lbb,lb){
   document.getElementById("lbb").innerHTML = lbb;
   document.getElementById("lb").innerHTML = lb;
}



socket.on('img',(st) =>{
  //console.log(st);
  if( st.batsman1img ){
    bat1img = st.batsman1img;
    document.getElementById("bat1img").setAttribute("src",st.batsman1img);
  }
  
  if( st.batsman2img ){
    bat2img = st.batsman1img;
    document.getElementById("bat2img").setAttribute("src",st.batsman2img);
  }

  if( st.bowlerimg ){
    bowlerimg = st.batsman1img;
    document.getElementById("bowlerimg").setAttribute("src",st.bowlerimg);
  }
})

socket.on('match',(status)=> {

  //console.log(status.commentry);
  //console.log(status.pship);
  //console.log(status.lw);
  
  
  
  if (status.commentry != dtail){
      dtail = status.commentry;
      //console.log(status.commentry);
      
 }

  cmnt = cmnty;
  cmnty = status.batTeam;

  updateScore(status.batTeam);
  
   updateit(status.status);
   updatelbb(status.lbb,status.lb);
   updateLW(status.lw);
   updatePS(status.pship);
  // updateTitle(status.title);
  // console.log(status.batTeam);
   updateBat1(status.batsman1name,status.batsman1run);
   updateBat2(status.batsman2name,status.batsman2run);
   updateBowler(status.bowlername,status.bowlerover,status.bowlerwikwt );
   

   let lb = parseInt(status.lb, 10);

   if (status.commentry.includes("point")) {
     point(lb);
   }
   
   else if (status.commentry.includes("mid-on")) {
     midOn(lb);
   }
 
   else if (status.commentry.includes("mid-of")) {
     midOff(lb);
   }
 
   else if (status.commentry.includes("mid-wicket")) {
     midwiket(lb);
   }
   
   else if (status.commentry.includes("square")) {
     squreLeg(lb);
   }
   
   else if (status.commentry.includes("third")) {
     thirdman(lb);
   }
   
   else if (status.commentry.includes("cover")) {
     deepExtracover(lb);
   }
 
   else if (status.commentry.includes("long-on")) {
     midwiket(lb);
   }
   else if (status.commentry.includes("long-of")) {
     deepExtracover(lb);
   }

 
  
});




socket.on('message', (msg) => {

  const el = document.createElement('li');
  el.classList.add('list-group-item');
  el.innerHTML ="<b>" + msg.name + ":</b>" + msg.body;
  document.querySelector('ul').appendChild(el);
  let elm = document.getElementById("myDIV");
  setTimeout(function() {
    elm.scrollTop = elm.scrollHeight;
  }, 300);
  //console.log(msg);

});

// document.querySelector('button').onclick = () => {

//   const text = document.querySelector('input').value;
//   socket.emit('message', text)
  
// }


/*
localStorage.setItem("name", "Smith");
localStorage.getItem("name");
*/

function nameSet(){
  let name = document.getElementById('usrnme').value;
  localStorage.setItem("name", name);
}

function chat(){
  let name;
  if(!localStorage.getItem("name")){
    name =  prompt("Please enter your name", "");
    if (name != null) {
      localStorage.setItem("name", name);
      name = localStorage.getItem("name");
    }
    else{
      name = "Announms";
    }
  }else{
    name = localStorage.getItem("name");
  }
  let body = document.querySelector('#usrmsg').value;
  let elm = document.getElementById("myDIV");
  setTimeout(function() {
    elm.scrollTop = elm.scrollHeight;
  }, 300);

console.log(localStorage.getItem("name"));

  elm.scrollTop = elm.scrollHeight;
  socket.emit('message', {name,body});
  document.querySelector('#usrmsg').value = "";
}

// setInterval( function() {
//   let elm = document.getElementById("myDIV");
//   elm.scrollTop = elm.scrollHeight;
//     console.log('hi');
// },1000);