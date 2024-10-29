import { Camera } from './camera/camera';
import { Mesh } from './mesh';
import { Transform } from './transform';

export class SceneGraphNode {
    private transform: Transform;
    private camera?: Camera;
    private mesh?: Mesh;
    private children: SceneGraphNode[];

    constructor() {
        this.transform = new Transform();
        this.children = [];
    }

    setTransform(transform: Transform) {
        this.transform = transform;
    }
    getTransform(): Transform {
        return this.transform;
    }

    setCamera(camera: Camera) {
        this.camera = camera;
    }
    getCamera(): Camera | undefined {
        return this.camera;
    }
    hasCamera(): boolean {
        return this.camera !== undefined;
    }

    setMesh(mesh: Mesh) {
        this.mesh = mesh;
    }
    getMesh(): Mesh | undefined {
        return this.mesh;
    }
    hasMesh(): boolean {
        return this.mesh !== undefined;
    }

    addChild(node: SceneGraphNode) {
        this.children.push(node);
    }
    getChild(index: number): SceneGraphNode | undefined {
        if (index >= this.children.length) return undefined;
        else return this.children[index];
    }
    getChildren(): SceneGraphNode[] {
        return this.children;
    }
    getNumberOfChildren(): number {
        return this.children.length;
    }
}