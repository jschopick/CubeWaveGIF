import React, { Component } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';

class App extends Component {
  sketch (prop) {
    let angle = 0;
    let w = 38;
    let ma; // Magic angle for rotation
    let maxD; // Max distance for offset
  
    prop.setup = function () {
      prop.createCanvas(600, 600, prop.WEBGL);
      ma = prop.atan(1 / prop.sqrt(2));
      maxD = prop.dist(0, 0, 200, 200);
    };
  
    prop.draw = function () {
      prop.background(249);
      prop.ortho(-500, 500, -500, 500, 0, 1000);
      
      // Change the angle to create a square diamond
      prop.rotateX(-ma);
      prop.rotateY(prop.QUARTER_PI);

      for(let z = 0; z < prop.height; z += w) {
        for(let x = 0; x < prop.width; x += w) {
          prop.push();
          let d = prop.dist(x, z, prop.width / 2, prop.height / 2);
          let offset = prop.map(prop.pow(d, 2) / 2, 0, prop.pow(maxD, 2), -prop.PI, prop.PI);
          let a = angle + offset;
          // Sets height range for the cube.
          let h = prop.floor(prop.map(prop.sin(a), -1, 1, 125, 500));
          prop.normalMaterial();
          // Top RGB code: R: 126 G: 180 B: 180
          prop.ambientLight(61, 84, 160, 0, prop.height + prop.PI, 0);
          // Right RGB Code: R: 232 G: 224 B: 175
          prop.pointLight(126, 180, 180, prop.width * 3 / 4, 0, prop.width * 3 / 4);
          // Left RGB code:	R: 61 G: 84 B: 134
          prop.translate(x - prop.width / 2, 0, z - prop.height / 2);
          prop.box(w, h, w);
          prop.pop();
        }
      }
      // Adjust the speed of oscillation
      angle -= prop.PI / 38;
    };
  }

  render() {
    return (
      <div className="App">
        <div className="Text">
          <h1>What should I be called?</h1>
        </div> 
        <P5Wrapper sketch={this.sketch} />
      </div>
    );
  }
}

export default App;