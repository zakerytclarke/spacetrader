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

var zoom=1;
var maxZoom=10000000;
var offsetX=0;
var offsetY=0;
setInterval(function(x){
  /*
  if(zoom<100){
    zoom+=0.04;
  }
  if(zoom>15){
    zoom+=1;
  }
  if(offsetX<220){//285
    offsetX+=1.0;
  }
  if(offsetY<247){
    offsetY+=1.0;
  }
  */
  renderGalacticMap();
},50);


//Register Key Presses
window.onkeydown = function(e) {
  //console.log(zoom);
   var key = e.keyCode ? e.keyCode : e.which;
   switch(key){
     case 37:
        offsetX-=20*(maxZoom/zoom)/maxZoom;
       break;
       case 38:
        offsetY+=20*(maxZoom/zoom)/maxZoom;
       break;
       case 39:
        offsetX+=20*(maxZoom/zoom)/maxZoom;
       break;
       case 40:
        offsetY-=20*(maxZoom/zoom)/maxZoom;
       break;
       /*
       case 32:
       if(zoom<maxZoom){
         //zoom+=200*(zoom/maxZoom);
         zoom+=20;
       }
       break;
       case 17:
       if(zoom<maxZoom){
         //zoom+=200*(zoom/maxZoom);
         zoom-=20;
       }
       break;
       */
   }

}

/*
window.addEventListener("mousedown",function(event){
  var x=event.clientX-midw;
  var y=event.clientY-midh;
  console.log(x,offsetX);
  offsetX=x;

});
*/

window.addEventListener("wheel",function(event){
  var x=event.clientX-midw;
  var y=event.clientY-midh;
  //offsetX+=x/1000;
  //offsetY+=y/1000;
  if(event.deltaY>0){
    if(zoom<maxZoom){
      zoom+=(event.deltaY/100)*zoom/100;
    }
  }else{
    if(zoom>0){
      zoom+=(event.deltaY/100)*zoom/100;
    }
  }

});


function renderGalacticMap(){
  var time=Date.now();
  galacticMapCtx.fillStyle="black";
  galacticMapCtx.fillRect(0,0,midw*2,midh*2);

  var zoomScaleFactor=Infinity;
  var distanceScale=10;//Should be 63421
  var sizeScale=149600000//Should be 149600000*63421
  for(var i=0;i<universe.systems.length;i++){
    var x=universe.systems[i].position.x*(zoom*midw/widthUniverse);
    var y=universe.systems[i].position.y*(zoom*midh/widthUniverse);
    if(midw+x-(offsetX*(zoom*midw/widthUniverse))>-zoomScaleFactor*midw&&(midw+x-(offsetX*(zoom*midw/widthUniverse))<zoomScaleFactor*midw)) {//Only render things in frame
      if(midh+y+(offsetY*(zoom*midh/widthUniverse))>-zoomScaleFactor*midh&&midh+y+(offsetY*(zoom*midh/widthUniverse)<zoomScaleFactor*midh)) {
        //Draw Star
        var tempSystem=universe.systems[i];

        for(var j=0;j<tempSystem.stars.length;j++){//TODO Fix to render Binary Star Systems
          var starScale=zoom*tempSystem.stars[j].radius/sizeScale;
          switch(tempSystem.stars[j].type){
            case "M":
              galacticMapCtx.fillStyle="#DE794D";
            break;
            case "K":
              galacticMapCtx.fillStyle="#FDC07F";
            break;
            case "G":
              galacticMapCtx.fillStyle="#FFF59C";
            break;
            case "F":
              galacticMapCtx.fillStyle="#FFFFDA";
            break;
            case "A":
              galacticMapCtx.fillStyle="#F4FEFF";
            break;
            case "B":
              galacticMapCtx.fillStyle="#E6F0FF";
            break;
            case "O":
              galacticMapCtx.fillStyle="#9AA2FF";
            break;
            default:
              galacticMapCtx.fillStyle="white";
            break;
          }
          galacticMapCtx.beginPath();
          galacticMapCtx.arc(midw+x-(offsetX*(zoom*midw/widthUniverse)),midh+y+(offsetY*(zoom*midh/widthUniverse)),starScale,0,2*Math.PI);
          galacticMapCtx.fill();
        }




        if(zoom>7){//Close enought to see system scale
          galacticMapCtx.strokeStyle="white";


          for(var j=0;j<tempSystem.planets.length;j++){//Draw Planets
            var planetScale=zoom*tempSystem.planets[j].distance/distanceScale;
            var objectScale=zoom*tempSystem.planets[j].radius/sizeScale;

            var velocity=2*Math.PI/tempSystem.planets[j].orbitalPeriod;
            var degreeOffset=(tempSystem.planets[j].orbitalOffset+(time/86400000));
            //var degreeOffset=(tempSystem.planets[j].orbitalOffset+(time/10000));

            var upX=planetScale*Math.cos(velocity*degreeOffset);
            var upY=planetScale*Math.sin(velocity*degreeOffset);


            //Draw Planet
            switch(tempSystem.planets[j].surface){
              case "Ice":
                galacticMapCtx.fillStyle="#00ffff";
              break;
              case "Rock":
                galacticMapCtx.fillStyle="grey";
              break;
              case "Ocean":
                galacticMapCtx.fillStyle="blue";
              break;
              case "Forest":
                galacticMapCtx.fillStyle="green";
              break;
              case "Desert":
                galacticMapCtx.fillStyle="#ffdd99";
              break;
              case "Magma":
                galacticMapCtx.fillStyle="red";
              break;
              case "Swamp":
                galacticMapCtx.fillStyle="#339966";
              break;
              case "Tundra":
                galacticMapCtx.fillStyle="#eeeeee";
              break;
              case "Asteroid":
                galacticMapCtx.fillStyle="#DBBB88";
              break;
              default:
                galacticMapCtx.fillStyle="white";
              break;
            }
            galacticMapCtx.beginPath();
            galacticMapCtx.arc(midw+x-(offsetX*(zoom*midw/widthUniverse))+upX,midh+y+(offsetY*(zoom*midh/widthUniverse))+upY,objectScale,0,2*Math.PI);
            galacticMapCtx.fill();

            //Draw Orbits
            galacticMapCtx.beginPath();
            galacticMapCtx.arc(midw+x-(offsetX*(zoom*midw/widthUniverse)),midh+y+(offsetY*(zoom*midh/widthUniverse)),planetScale,0,2*Math.PI);
            galacticMapCtx.stroke();

            if(zoom>20){
              for(var k=0;k<tempSystem.planets[j].moons.length;k++){//Draw Moons
                //63421AU=1LY

                galacticMapCtx.beginPath();
                galacticMapCtx.arc(midw+x-(offsetX*(zoom*midw/widthUniverse))+upX,midh+y+(offsetY*(zoom*midh/widthUniverse))+upY,zoom*tempSystem.planets[j].moons[k].distance/10,0,2*Math.PI);
                galacticMapCtx.stroke();



                //Draw Moons

                var moonScale=zoom*tempSystem.planets[j].moons[k].distance/distanceScale;
                var moonobjectScale=zoom*tempSystem.planets[j].moons[k].radius/sizeScale;

                var moonvelocity=2*Math.PI/tempSystem.planets[j].moons[k].orbitalPeriod;
                var moondegreeOffset=(tempSystem.planets[j].moons[k].orbitalOffset+(time/86400000));
                //var degreeOffset=(tempSystem.planets[j].orbitalOffset+(time/10000));

                var moonupX=moonScale*Math.cos(moonvelocity*moondegreeOffset);
                var moonupY=moonScale*Math.sin(moonvelocity*moondegreeOffset);
                //Draw Moon
                switch(tempSystem.planets[j].moons[k].surface){
                  case "Ice":
                    galacticMapCtx.fillStyle="#00ffff";
                  break;
                  case "Rock":
                    galacticMapCtx.fillStyle="grey";
                  break;
                  case "Ocean":
                    galacticMapCtx.fillStyle="blue";
                  break;
                  case "Forest":
                    galacticMapCtx.fillStyle="green";
                  break;
                  case "Desert":
                    galacticMapCtx.fillStyle="#ffdd99";
                  break;
                  case "Magma":
                    galacticMapCtx.fillStyle="red";
                  break;
                  case "Swamp":
                    galacticMapCtx.fillStyle="#339966";
                  break;
                  case "Tundra":
                    galacticMapCtx.fillStyle="#eeeeee";
                  break;
                  case "Asteroid":
                    galacticMapCtx.fillStyle="#DBBB88";
                  break;
                  default:
                    galacticMapCtx.fillStyle="white";
                  break;
                }
                galacticMapCtx.beginPath();
                galacticMapCtx.arc(midw+x-(offsetX*(zoom*midw/widthUniverse))+upX+moonupX,midh+y+(offsetY*(zoom*midh/widthUniverse))+upY+moonupY,moonobjectScale,0,2*Math.PI);
                galacticMapCtx.fill();


              }
            }




          }



        }
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



  }
}
