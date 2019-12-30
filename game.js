var galacticMap=document.getElementById("galacticmap");
var galacticMapCtx=galacticMap.getContext('2d');
galacticMap.width=window.innerWidth;
galacticMap.height=window.innerHeight;
var w=galacticMap.width/100;
var h=galacticMap.height/100;
var midw=galacticMap.width/2;
var midh=galacticMap.height/2;
galacticMapCtx.font="10px Arial";
galacticMapCtx.fillStyle="green";
galacticMapCtx.strokeStyle="white";


var systemMap=document.getElementById("systemmap");
var systemMapCtx=systemMap.getContext('2d');
systemMap.width=window.innerWidth;
systemMap.height=window.innerHeight;

systemMapCtx.beginPath();
systemMapCtx.arc(75, 75, 10, 0, Math.PI*2, true);
systemMapCtx.closePath();
systemMapCtx.fill();












//Draw Galaxy
//var zoom=12;
//var offsetX=290;
//var offsetY=250;

var zoom=0;
var offsetX=0;
var offsetY=0;
setInterval(function(x){
  if(zoom<15){
    zoom+=0.04;
  }
  if(offsetX<280){
    offsetX+=1.0;
  }
  if(offsetY<250){
    offsetY+=1.2;
  }
  renderGalacticMap();
},50);

function renderGalacticMap(){
  galacticMapCtx.fillStyle="black";
  galacticMapCtx.fillRect(0,0,midw*2,midh*2);

  for(var i=0;i<universe.systems.length;i++){
    var x=universe.systems[i].position.x*(zoom*midw/widthUniverse);
    var y=universe.systems[i].position.y*(zoom*midh/widthUniverse);
    for(var j=0;j<universe.systems[i].connections.length;j++){
      let x2=universe.systems[i].connections[j].position.x*(zoom*midw/widthUniverse);
      let y2=universe.systems[i].connections[j].position.y*(zoom*midh/widthUniverse);
      galacticMapCtx.strokeStyle="white";
      galacticMapCtx.beginPath();
      galacticMapCtx.moveTo(midw+x-(offsetX*(zoom*midw/widthUniverse)),midh+y+(offsetY*(zoom*midh/widthUniverse)));
      galacticMapCtx.lineTo(midw+x2-(offsetX*(zoom*midw/widthUniverse)),midh+y2+(offsetY*(zoom*midh/widthUniverse)));
      galacticMapCtx.stroke();
    }
    galacticMapCtx.font="20px Arial";
    switch(universe.systems[i].faction){
    case "Terran":
      galacticMapCtx.fillStyle="blue";
    break;
    case "Asgard":
      galacticMapCtx.fillStyle="purple";
    break;
    case "Bugs":
      galacticMapCtx.fillStyle="green";
    break;
    case "Empire":
      galacticMapCtx.fillStyle="red";
    break;
    case "Pirates":
      galacticMapCtx.fillStyle="orange";
    break;
    case "Unclaimed":
      galacticMapCtx.fillStyle="grey";
    break;
    default:
      galacticMapCtx.fillStyle="white";
    }
    if(zoom>5){
      galacticMapCtx.strokeStyle="white";
      galacticMapCtx.strokeText(universe.systems[i].name,midw+x-(offsetX*(zoom*midw/widthUniverse)),midh+y+(offsetY*(zoom*midh/widthUniverse)));
      galacticMapCtx.fillText(universe.systems[i].name,midw+x-(offsetX*(zoom*midw/widthUniverse)),midh+y+(offsetY*(zoom*midh/widthUniverse)));
    }else{
      galacticMapCtx.font="30px Arial";
      galacticMapCtx.fillText("•",midw+x-(offsetX*(zoom*midw/widthUniverse)),midh+y+(offsetY*(zoom*midh/widthUniverse)));
    }

  }
}
