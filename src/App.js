import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

class App extends Component {
  sketch (prop) {
    let angle = 0;
    let w = 24;
    let ma; // Magic angle for rotation
    let maxD; // Max distance for offset
  
    prop.setup = function () {
      prop.createCanvas(400, 400, prop.WEBGL);
      ma = prop.atan(1 / prop.sqrt(2));
      maxD = prop.dist(0, 0, 200, 200);
    };
  
    prop.draw = function () {
      prop.background(175);
      prop.ortho(-400, 400, -400, 400, 0, 1000);
      prop.directionalLight(255, 255, 255, 1, 0, 0);
      
      // Change the angle to create a square diamond
      prop.rotateX(-ma);
      prop.rotateY(prop.QUARTER_PI);

      for(let z = 0; z < prop.height; z += w) {
        for(let x = 0; x < prop.width; x += w) {
          prop.push();
          let d = prop.dist(x, z, prop.width / 2, prop.height / 2);
          let offset = prop.map(d, 0, maxD, -prop.PI, prop.PI);
          let a = angle + offset;
          // Sets height range for the cube.
          let h = prop.floor(prop.map(prop.sin(a), -1, 1, 100, 400));
          prop.normalMaterial();
          // prop.rect(x - prop.width / 2 + w / 2, 0, w - 2, h);
          prop.translate(x - prop.width / 2, 0, z - prop.height / 2);
          prop.box(w, h, w);
          prop.pop();
        }
      }
      // Adjust the speed of oscillation
      angle -= prop.PI / 64;
    };
  }

  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={this.sketch} />
      </div>
    );
  }
}

export default App;