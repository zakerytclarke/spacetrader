var seed=42;
var usedNames=[""];
var usedPositions=[{x:0,y:0}];
//var widthUniverse=93000000000;
var widthUniverse=1000;
var minStarDistance=4;
var maxStarDistance=100;







var solSystem={
  name:"Sol System",
  stars:[{name:"Sol",type:"G"}],
  position:generateSysPosition(),
  connections:[],
  planets:[
            {name:"Mercury",
              type:"Terrestrial",
              mass:3.301*10^23,
              atmosphere:"Thin",
              surface:"Rock",
              distance:0.4667,
              radius:2440,
              orbitalPeriod:87.96926,
              rotationalPeriod:1407.51,
              tilt:0.01,
              moons:[

              ]
            },
            {name:"Venus",
              type:"Terrestrial",
              mass:4.867*10^24,
              atmosphere:"Thick",
              surface:"Rock",
              distance:0.7265,
              radius:6050,
              orbitalPeriod:224.7008,
              rotationalPeriod:5832.43,
              tilt:177.36,
              moons:[

              ]
            },
            {name:"Earth",
              type:"Terrestrial",
              mass:5.972*10^24,
              atmosphere:"Thick",
              surface:"Earth",
              distance:1,//AU
              radius:6371.009,
              orbitalPeriod:365,
              rotationalPeriod:24,
              tilt:23.45,
              moons:[
                {
                  name:"Moon",
                  distance:0.00257003846,
                  radius:1737.4,
                  orbitalPeriod:27.322,
                  rotationalPeriod:655.73,
                  tilt:1.5424,
                  surface:"Rock"
                }
              ]
            },
            {name:"Mars",
              type:"Terrestrial",
              mass:6.417*10^23,
              atmosphere:"Thin",
              surface:"Rock",
              distance:1.592,
              radius:3389.5,
              orbitalPeriod:686.97959,
              rotationalPeriod:24.622,
              tilt:25.19,
              moons:[
                {
                  name:"Phobos",
                  distance:0.53003206059,
                  radius:11.08,
                  orbitalPeriod:.319,
                  rotationalPeriod:7.66,
                  tilt:0.046,
                  surface:"Asteroid"
                },
                {
                  name:"Deimos",
                  distance:0.52003206059,
                  radius:6.2,
                  orbitalPeriod:1.262,
                  rotationalPeriod:30.29,
                  tilt:0.897,
                  surface:"Asteroid"
                },
              ]
            },
            /*
            {name:"Jupiter",
              type:"",
              mass:,
              atmosphere:"",
              surface:"",
              distance:,
              radius:,
              orbitalPeriod:,
              rotationalPeriod:,
              tilt:,
              moons:[

              ]
            },
            {name:"Saturn",
              type:"",
              mass:,
              atmosphere:"",
              surface:"",
              distance:,
              radius:,
              orbitalPeriod:,
              rotationalPeriod:,
              tilt:,
              moons:[

              ]
            },
            {name:"Uranus",
              type:"",
              mass:,
              atmosphere:"",
              surface:"",
              distance:,
              radius:,
              orbitalPeriod:,
              rotationalPeriod:,
              tilt:,
              moons:[

              ]
            },
            {name:"Neptune",
              type:"",
              mass:,
              atmosphere:"",
              surface:"",
              distance:,
              radius:,
              orbitalPeriod:,
              rotationalPeriod:,
              tilt:,
              moons:[

              ]
            },
            */
          ]
};







var universe=new Galaxy;
//print(universe);

var visited=[];
var cAvg=0;
test(universe.systems[0]);


//console.log(visited.length);
//console.log(cAvg/300);

function test(system){
  visited.push(system.name);
  cAvg+=system.connections.length;
  for(var i=0;i<system.connections.length;i++){
    if(visited.indexOf(system.connections[i].name)==-1){
      test(system.connections[i]);
    }
  }
}


//console.log(JSON.stringify(universe));






function Galaxy(){
  this.systems=[];
  var num=299;//Number of Stars
  this.systems.push(solSystem);
  for(var i=0;i<num;i++){
    this.systems.push(new SolarSystem);
  }

  //Form Connections
  for(var i=0;i<this.systems.length;i++){
    for(var j=0;j<this.systems.length;j++){
      if(i!=j){
        if(distance(this.systems[i].position,this.systems[j].position)<maxStarDistance){
          this.systems[i].connections.push(this.systems[j]);
        }
      }
    }
  }


  //Setup Factions
  /*
  spreadFaction("Terran",random(70,true),this.systems[random(this.systems.length-1,true)]);
  spreadFaction("Asgard",random(70,true),this.systems[random(this.systems.length-1,true)]);
  spreadFaction("Bugs",random(70,true),this.systems[random(this.systems.length-1,true)]);
  spreadFaction("Empire",random(70,true),this.systems[random(this.systems.length-1,true)]);
  spreadFaction("Pirates",random(10,true),this.systems[random(this.systems.length-1,true)]);
  spreadFaction("Pirates",random(10,true),this.systems[random(this.systems.length-1,true)]);
  spreadFaction("Pirates",random(10,true),this.systems[random(this.systems.length-1,true)]);
*/
}


function SolarSystem(){
  this.name=NameGenerator()+" System";
  this.stars=[];
  this.planets=[];

  this.position=generateSysPosition();
  this.connections=[];

  for(var i=0;i<Math.round(random(1.8));i++){
    this.stars.push(new Star);
  }
  this.planets.push(new Planet);
  this.planets[0].distance=0.3+random(3);
  for(var i=0;i<Math.round(random(15));i++){
    this.planets.push(new Planet);
    this.planets[this.planets.length-1].distance=0.5+random(10)+this.planets[this.planets.length-2].distance;
  }
  this.faction="Unclaimed";

  var factions=["Terran","Asgard","Bugs","Empire","Pirates","Unclaimed"];
  this.faction=factions[random(5,true)];

}


function Star(){
  var starTypes=["M","K","G","F","A","B","O"];

  this.name=NameGenerator();
  this.type=starTypes[Math.round(random(starTypes.length-1))];
  this.radius=(100000+random(700000)).toFixed(2);//Km



}

function Planet(){
  var types=["Terrestrial","Gas Giant"];
  var atmospheres=["None","Thin","Thick"];
  var surfaces=["Ice","Rock","Ocean","Forest","Desert","Magma","Swamp","Tundra"];
  this.name=NameGenerator();
  this.moons=[];

  this.type=types[random(types.length-1,true)];
  this.atmosphere;
  this.surface;

  this.mass;//Kg
  if(this.type=="Terrestrial"){
    this.atmosphere=atmospheres[random(atmospheres.length-1,true)];
    this.surface=surfaces[random(surfaces.length-1,true)];
    this.mass=100000000000000000000000+random(10000000000000000000000000);
  }else{//Gas Giants are larger
    this.atmosphere="Thick";
    this.surface="None";
    this.mass=10000000000000000000000000+random(1000000000000000000000000000);
  }
  this.radius=(2000+random(100000)).toFixed(2);//Km
  this.orbitalPeriod=(5+random(1000)).toFixed(2);//Days
  this.rotationalPeriod=(5+random(1000)).toFixed(2);//Hours
  this.tilt=random(180);






  this.moons.push(new Moon);
  this.moons[0].distance=random(0.001);
  var num=random(10,true);
  for(var i=0;i<num;i++){
    this.moons.push(new Moon);
    this.moons[this.moons.length-1].distance=0.001+random(0.05)+this.moons[this.moons.length-2].distance;
  }





}


function Moon(){

  var surfaces=["Ice","Rock","Ocean","Forest","Desert","Magma","Asteroid"];

  this.name=NameGenerator();
  this.distance=0;
  this.radius=(1000+random(2000)).toFixed(2);//Km
  this.orbitalPeriod=(5+random(1000)).toFixed(2);//Days
  this.rotationalPeriod=(5+random(1000)).toFixed(2);//Hours
  this.tilt=random(180);
  this.surface=surfaces[random(surfaces.length-1,true)];


}






function random(y,int) {
  if(y==null){
    y=1;
  }
  var x=Math.sin(seed++)*10000;

  if(int){
    return Math.round(y*(x-Math.floor(x)));
  }else{
    return y*(x-Math.floor(x));
  }
}

function randomGaussian(y,int){
  if(y==null){
    y=1;
  }
  var x=random_bm();
  if(int){
    return Math.round(y*(x-Math.floor(x)));
  }else{
    return y*(x-Math.floor(x));
  }



  function random_bm() {
      var u = 0, v = 0;
      while(u === 0) u = random(); //Converting [0,1) to (0,1)
      while(v === 0) v = random();
      let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
      num = num / 10.0 + 0.5; // Translate to 0 -> 1
      if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
      return num+0.5;
  }
}





function NameGenerator(){
  var prefixes=["Sa","Ut","Ur","Er","Co","Ti","Te","Di","Hy","Me","Po","Te","At","Th","Ub","Nim","Ep","Pa","Anth","Tar","Al","Cra","Ja","Ma","Ri","Su","Ya"];
  var midfixes=["","yro","ta","th","mas","uu","ua","dav","ge","das","aal","po","ba","en","ar","ana","im","ce","cel","arth","ku","s","la","ban"];
  var postfixes=["","a","ar","er","an","os","en","es","is","iin","oth","nt","on","do","adus","eras","enas","o","gan","ora","ir","pa","ino"];
  var secondNames=["","","","","","","","","","","Prime","Carpo",""]
  var name="";
  while(usedNames.indexOf(name)!=-1){
    name=prefixes[random(prefixes.length-1,true)]+midfixes[random(midfixes.length-1,true)]+postfixes[random(postfixes.length-1,true)];
  }
  usedNames.push(name);
  return name;
}

function generateSysPosition(){
  var x=0;
  var y=0;
  var bool=false;
  while(!bool){
    bool=true;
    x=random(widthUniverse)-(widthUniverse/2);
    y=random(widthUniverse)-(widthUniverse/2);
    for(var i=0;i<usedPositions.length;i++){
      if(distance({x:x,y:y},usedPositions[i])<20){//Don't put systems too close
        bool=false;
      }
    }
  }
  usedPositions.push({x:x,y:y});
  return {x:x,y:y};

}

function distance(c1,c2){
  return Math.sqrt(Math.pow(c2.x-c1.x,2)+Math.pow(c2.y-c1.y,2));
}


function spreadFaction(name,amount,system){
  if(amount>0){
    system.faction=name;
    for(var i=0;i<system.connections.length;i++){
      spreadFaction(name,amount-1,system.connections[i]);
    }
  }
}


function print(galaxy){
  console.log("Welcome to the Galaxy");
  console.log("============================");
  for(var i=0;i<galaxy.systems.length;i++){
    console.log(galaxy.systems[i].name+"    X: "+galaxy.systems[i].position.x+"    Y: "+galaxy.systems[i].position.y);
    console.log(" Connections:");
    for(var j=0;j<galaxy.systems[i].connections.length;j++){
      console.log("  "+galaxy.systems[i].connections[j].name);
    }
    console.log(" Planets:")
    for(var j=0;j<galaxy.systems[i].stars.length;j++){
      console.log("  "+galaxy.systems[i].stars[j].name+"    Type: "+galaxy.systems[i].stars[j].type);
    }
    for(var j=0;j<galaxy.systems[i].planets.length;j++){
      console.log("    "+galaxy.systems[i].planets[j].name+"    Biome: "+galaxy.systems[i].planets[j].biome+"    Distance: "+galaxy.systems[i].planets[j].distance.toFixed(4)+" AU"+"    Orbital Period: "+galaxy.systems[i].planets[j].orbitalPeriod+" Days"+"    Rotational Period: "+galaxy.systems[i].planets[j].rotationalPeriod);
      for(var k=0;k<galaxy.systems[i].planets[j].moons.length;k++){
        console.log("        "+galaxy.systems[i].planets[j].moons[k].name+"    Distance: "+galaxy.systems[i].planets[j].moons[k].distance.toFixed(4)+" AU");

      }
    }
  }



}
