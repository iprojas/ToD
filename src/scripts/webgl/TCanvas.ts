import * as THREE from 'three'
import { gl } from './core/WebGL'
import VirtualScroll from 'virtual-scroll'
import { Assets, loadAssets } from './utils/assetLoader'
import vertexShader from './shader/vs.glsl'
import fragmentShader from './shader/fs.glsl'
import { calcCoveredTextureScale } from './utils/coveredTexture'

export class TCanvas {
  private centerTarget = new THREE.Vector3()
  private edgeTarget = new THREE.Vector3()
  private frustum = new THREE.Frustum()

  private cards = new THREE.Group()
  public cardParams = {
    width: 1,
    height: 1,
    row: 4,
    col: 12,
    gap: 0.15,
  }

  public assets: Assets = {
    image1: { path: 'images/1 (1).webp' },
    image2: { path: 'images/2 (1).webp' },
    image3: { path: 'images/3 (1).webp' },
    image4: { path: 'images/4 (1).webp' },
    image5: { path: 'images/1 (2).webp' },
    image6: { path: 'images/2 (2).webp' },
    image7: { path: 'images/3 (2).webp' },
    image8: { path: 'images/4 (2).webp' },
    image9: { path: 'images/1 (3).webp' },
    image10: { path: 'images/2 (3).webp' },
    image11: { path: 'images/3 (3).webp' },
    image12: { path: 'images/4 (3).webp' },
    image13: { path: 'images/1 (4).webp' },
    image14: { path: 'images/2 (4).webp' },
    image15: { path: 'images/3 (4).webp' },
    image16: { path: 'images/4 (4).webp' },
    image17: { path: 'images/1 (5).webp' },
    image18: { path: 'images/2 (5).webp' },
    image19: { path: 'images/3 (5).webp' },
    image20: { path: 'images/4 (5).webp' },
    image21: { path: 'images/1 (6).webp' },
    image22: { path: 'images/2 (6).webp' },
    image23: { path: 'images/3 (6).webp' },
    image24: { path: 'images/4 (6).webp' },
    image25: { path: 'images/1 (7).webp' },
    image26: { path: 'images/2 (7).webp' },
    image27: { path: 'images/3 (7).webp' },
    image28: { path: 'images/4 (7).webp' },
    image29: { path: 'images/1 (8).webp' },
    image30: { path: 'images/2 (8).webp' },
    image31: { path: 'images/3 (8).webp' },
    image32: { path: 'images/4 (8).webp' },
    image33: { path: 'images/1 (9).webp' },
    image34: { path: 'images/2 (9).webp' },
    image35: { path: 'images/3 (9).webp' },
    image36: { path: 'images/4 (9).webp' },
    image37: { path: 'images/1 (10).webp' },
    image38: { path: 'images/2 (10).webp' },
    image39: { path: 'images/3 (10).webp' },
    image40: { path: 'images/4 (10).webp' },
    image41: { path: 'images/1 (11).webp' },
    image42: { path: 'images/2 (11).webp' },
    image43: { path: 'images/3 (11).webp' },
    image44: { path: 'images/4 (11).webp' },
    image45: { path: 'images/1 (12).webp' },
    image46: { path: 'images/2 (12).webp' },
    image47: { path: 'images/3 (12).webp' },
    image48: { path: 'images/4 (12).webp' }
  }

  private imageLable: string[] = [
   ' image1:',
   ' image2:',
   ' image3:',
   ' image4:',
   ' image5:',
   ' image6:',
   ' image7:',
   ' image8:',
   ' image9:',
    'image10:',
    'image11:',
    'image12:',
    'image13:',
    'image14:',
    'image15:',
    'image16:',
    'image17:',
    'image18:',
    'image19:',
    'image20:',
    'image21:',
    'image22:',
    'image23:',
    'image24:',
    'image25:',
    'image26:',
    'image27:',
    'image28:',
    'image29:',
    'image30:',
    'image31:',
    'image32:',
    'image33:',
    'image34:',
    'image35:',
    'image36:',
    'image37:p',
    'image38:p',
    'image39:p',
    'image40',
    'image41',
    'image42',
    'image43',
    'image44',
    'image45',
    'image46',
    'image47',
    'image48'
  ];

  constructor(private container: HTMLElement) {
    loadAssets(this.assets).then(() => {
      this.init()
      this.createObjects()
      this.addEvents()
      gl.requestAnimationFrame(this.anime)
    })
  }

  private init() {
    gl.setup(this.container)
    gl.scene.background = new THREE.Color('#000')
    gl.camera.position.z = this.cardParams.height * 2 + this.cardParams.gap * 8
    gl.setResizeCallback(this.resize)
    this.resize()

    // gl.scene.add(new THREE.AxesHelper())
  }

  private isMouseDowon = false
  private prevMousePosition = { x: 0, y: 0 }

  private addEvents() {
    const scroller = new VirtualScroll()
    scroller.on((event) => {
      this.cards.userData.target.position.y -= event.deltaY * 0.003
    })

    window.addEventListener('mousedown', (e) => {
      this.isMouseDowon = true
      this.prevMousePosition = { x: e.clientX, y: e.clientY }
    })

    window.addEventListener('mousemove', (e) => {
      if (this.isMouseDowon) {
        this.cards.userData.target.position.x += (e.clientX - this.prevMousePosition.x) * 0.004
        this.cards.userData.target.position.y -= (e.clientY - this.prevMousePosition.y) * 0.004
        this.prevMousePosition = { x: e.clientX, y: e.clientY }
      }
    })

    window.addEventListener('mouseup', () => {
      this.isMouseDowon = false
    })

    window.addEventListener('mouseleave', () => {
      this.isMouseDowon = false
    })

     // zoom function

     const zoomButton = document.getElementById('zoom');
     let zoomIn = true;
 
     if (zoomButton) {
       zoomButton.addEventListener('click', () => {
         if (zoomIn) {
           gl.camera.position.z *= 1.6;
         } else {
           gl.camera.position.z /= 1.6;
         }
         zoomIn = !zoomIn;
       });
     }
 
     window.addEventListener('keypress', (event) => {
       if (event.key === 'z') {
         gl.camera.position.z *= 1.1;
       }
       if (event.key === 'x') {
         gl.camera.position.z /= 1.1;
       }
     });

    // Add touch event listeners
window.addEventListener('touchstart', (e) => {
  this.isMouseDowon = true;
  const touch = e.touches[0];
  this.prevMousePosition = { x: touch.clientX, y: touch.clientY };
})

window.addEventListener('touchmove', (e) => {
  if (this.isMouseDowon) {
    const touch = e.touches[0];
    this.cards.userData.target.position.x += (touch.clientX - this.prevMousePosition.x) * 0.004;
    this.cards.userData.target.position.y -= (touch.clientY - this.prevMousePosition.y) * 0.004;
    this.prevMousePosition = { x: touch.clientX, y: touch.clientY };
  }
})

window.addEventListener('touchend', () => {
  this.isMouseDowon = false;
})
  }

  private createLabelTexture(text: string): THREE.Texture {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = 256
    const height = 128

    canvas.width = width
    canvas.height = height
    context.font = '24px monospace'
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillText(text, width / 2, height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  private createLabelMesh(text: string): THREE.Mesh {
    const labelGeometry = new THREE.PlaneGeometry(1, 0.5) // Adjust size as needed
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: this.createLabelTexture(text),
      transparent: true,
    })
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial)
    labelMesh.position.set(0, -0.4, 0.21) // Set the Z-position to be slightly above the card
    return labelMesh
  }

  private createObjects() {
    const { width, height, row, col, gap } = this.cardParams;

    const geometry = new THREE.PlaneGeometry(width, height, 50, 50);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tImage: { value: null },
        uUvScale: { value: new THREE.Vector2() },
        uSpeed: { value: new THREE.Vector2() },
        uAspect: { value: width / height },
      },
      vertexShader,
      fragmentShader,
    });

    const textures = Object.values(this.assets).map((val) => {
      const texture = val.data as THREE.Texture;
      texture.wrapS = THREE.MirroredRepeatWrapping;
      texture.wrapT = THREE.MirroredRepeatWrapping;
      return texture;
    });

    const centerX = ((width + gap) * (col - 1)) / 2;
    const centerY = ((height + gap) * (row - 1)) / 2;
    let i = 0;

    for (let x = 0; x < col; x++) {
      for (let y = 0; y < row; y++) {
        const mat = material.clone();
        mat.uniforms.tImage.value = textures[i++];
        calcCoveredTextureScale(mat.uniforms.tImage.value, width / height, mat.uniforms.uUvScale.value);

        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(width * x + gap * x - centerX, height * y + gap * y - centerY, 0);

        // Create and add label mesh to the card mesh with custom name
        const customName = this.imageLable[i - 1] || `Image ${i}`;
        const labelMesh = this.createLabelMesh(customName);
        mesh.add(labelMesh);

        this.cards.add(mesh);
      }
    }

    this.cards.userData.target = {
      position: { x: 0, y: 0, z: 0 },
    };

    gl.scene.add(this.cards);
  }

  private resize = () => {
    let scale = THREE.MathUtils.smoothstep(gl.size.aspect, 1.969, 3)
    scale = scale * (1.5 - 1) + 1
    gl.scene.scale.set(scale, scale, scale)
  }

  private updateCardPosition() {
    gl.camera.updateMatrix()
    gl.camera.updateMatrixWorld()
    const matrix = new THREE.Matrix4().multiplyMatrices(gl.camera.projectionMatrix, gl.camera.matrixWorldInverse)
    this.frustum.setFromProjectionMatrix(matrix)

    const { width, height, row, col, gap } = this.cardParams
    const screenHeight = (height + gap) * (row - 1)
    const screenWidth = (width + gap) * (col - 1)

    for (let i = 0; i < this.cards.children.length; i++) {
      const card = this.cards.children[i] as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
      card.getWorldPosition(this.centerTarget)

      if (this.centerTarget.y < 0) {
        this.edgeTarget.copy(this.centerTarget).y += height / 2 + gap
        this.edgeTarget.x = 0
        if (!this.frustum.containsPoint(this.edgeTarget)) {
          card.position.y += screenHeight + height + gap
        }
      } else {
        this.edgeTarget.copy(this.centerTarget).y -= height / 2 + gap
        this.edgeTarget.x = 0
        if (!this.frustum.containsPoint(this.edgeTarget)) {
          card.position.y -= screenHeight + height + gap
        }
      }

      if (this.centerTarget.x < 0) {
        this.edgeTarget.copy(this.centerTarget).x += width / 2 + gap
        this.edgeTarget.y = 0
        if (!this.frustum.containsPoint(this.edgeTarget)) {
          card.position.x += screenWidth + width + gap
        }
      } else {
        this.edgeTarget.copy(this.centerTarget).x -= width / 2 + gap
        this.edgeTarget.y = 0
        if (!this.frustum.containsPoint(this.edgeTarget)) {
          card.position.x -= screenWidth + width + gap
        }
      }
    }
  }

  // ----------------------------------
  // animation
  private anime = () => {
    this.updateCardPosition()
    this.cards.position.x = THREE.MathUtils.lerp(this.cards.position.x, this.cards.userData.target.position.x, 0.1)
    this.cards.position.y = THREE.MathUtils.lerp(this.cards.position.y, this.cards.userData.target.position.y, 0.1)

    const speedX = this.cards.userData.target.position.x - this.cards.position.x
    const speedY = this.cards.userData.target.position.y - this.cards.position.y

    this.cards.children.forEach((child) => {
      const card = child as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
      card.material.uniforms.uSpeed.value.x = THREE.MathUtils.lerp(card.material.uniforms.uSpeed.value.x, speedX, 0.1)
      card.material.uniforms.uSpeed.value.y = THREE.MathUtils.lerp(card.material.uniforms.uSpeed.value.y, speedY, 0.1)
    })

    gl.render()
  }

  // ----------------------------------
  // dispose
  dispose() {
    gl.dispose()
  }
}
