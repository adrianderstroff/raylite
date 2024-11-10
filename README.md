<p align="center"> <img src="https://raw.githubusercontent.com/adrianderstroff/raylite/main/logo.png"/></p>

An educational web-based rendering framework used for my projects.

So far the framework only supports WebGL. I might extend it to support WebGPU in the future. 

In addition I plan to implement different rendering framework architectures that might coexist or be replaced. 
Please be aware that the code is unstable and might break even with minor releases.

## Roadmap 
### 0.1.0
- [ ] Add abstraction layer over WebGL and WebGPU
  - [ ] Add WebGPU support 
  - [ ] Design interfaces for the abstraction layer
  - [ ] Implement abstraction layer for WebGL and WebGPU
- [ ] Add scene graph renderer
  - [ ] Add scene graph
  - [ ] Write simple gltf parser that creates a scene graph 

### 0.2.0
- [ ] Add Compute support
  - [ ] Implement compute pipeline in WebGPU
  - [ ] Design compute emulation in WebGL

### 0.3.0
- [ ] Add shader abstraction
  - [ ] Decide on/design abstracted language
  - [ ] Write a parser for this language
  - [ ] Write a generator for GLSL
  - [ ] Write a generator for WGSL 

## Acknowledgement
Thanks to Baris Balli for his [article](https://javascript.plainenglish.io/how-to-create-a-typescript-npm-library-for-dummies-6633f2506a17) on how to set up a TS NPM library. 