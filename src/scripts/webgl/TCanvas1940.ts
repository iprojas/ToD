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
    row: 26,
    col: 10,
    gap: 0.15,
    }
    
    public assets: Assets = {
    image1: { path: 'images/1940s/musician/1.webp' },
    image2: { path: 'images/1940s/dancer/1.webp' },
    image3: { path: 'images/1940s/filmmaker/1.webp' },
    image4: { path: 'images/1940s/magician/1.webp' },
    image5: { path: 'images/1940s/factory_worker/1.webp' },
    image6: { path: 'images/1940s/mechanic/1.webp' },
    image7: { path: 'images/1940s/engineer/1.webp' },
    image8: { path: 'images/1940s/chef/1.webp' },
    image9: { path: 'images/1940s/chemist/1.webp' },
    image10: { path: 'images/1940s/architect/1.webp' },
    image11: { path: 'images/1940s/corporate_executive/1.webp' },
    image12: { path: 'images/1940s/president/1.webp' },
    image13: { path: 'images/1940s/religious_leader/1.webp' },
    image14: { path: 'images/1940s/nun/1.webp' },
    image15: { path: 'images/1940s/priest/1.webp' },
    image16: { path: 'images/1940s/nurse/1.webp' },
    image17: { path: 'images/1940s/child/1.webp' },
    image18: { path: 'images/1940s/teenager/1.webp' },
    image19: { path: 'images/1940s/married_couple/1.webp' },
    image20: { path: 'images/1940s/couple_lovers/1.webp' },
    image21: { path: 'images/1940s/grandmother/1.webp' },
    image22: { path: 'images/1940s/grandfather/1.webp' },
    image23: { path: 'images/1940s/secretary/1.webp' },
    image24: { path: 'images/1940s/soldier/1.webp' },
    image25: { path: 'images/1940s/gymnast/1.webp' },
    image26: { path: 'images/1940s/marathoner/1.webp' },
    image27: { path: 'images/1940s/musician/2.webp' },
    image28: { path: 'images/1940s/dancer/2.webp' },
    image29: { path: 'images/1940s/filmmaker/2.webp' },
    image30: { path: 'images/1940s/magician/2.webp' },
    image31: { path: 'images/1940s/factory_worker/2.webp' },
    image32: { path: 'images/1940s/mechanic/2.webp' },
    image33: { path: 'images/1940s/engineer/2.webp' },
    image34: { path: 'images/1940s/chef/2.webp' },
    image35: { path: 'images/1940s/chemist/2.webp' },
    image36: { path: 'images/1940s/architect/2.webp' },
    image37: { path: 'images/1940s/corporate_executive/2.webp' },
    image38: { path: 'images/1940s/president/2.webp' },
    image39: { path: 'images/1940s/religious_leader/2.webp' },
    image40: { path: 'images/1940s/nun/2.webp' },
    image41: { path: 'images/1940s/priest/2.webp' },
    image42: { path: 'images/1940s/nurse/2.webp' },
    image43: { path: 'images/1940s/child/2.webp' },
    image44: { path: 'images/1940s/teenager/2.webp' },
    image45: { path: 'images/1940s/married_couple/2.webp' },
    image46: { path: 'images/1940s/couple_lovers/2.webp' },
    image47: { path: 'images/1940s/grandmother/2.webp' },
    image48: { path: 'images/1940s/grandfather/2.webp' },
    image49: { path: 'images/1940s/secretary/2.webp' },
    image50: { path: 'images/1940s/soldier/2.webp' },
    image51: { path: 'images/1940s/gymnast/2.webp' },
    image52: { path: 'images/1940s/marathoner/2.webp' },
    image53: { path: 'images/1940s/musician/3.webp' },
    image54: { path: 'images/1940s/dancer/3.webp' },
    image55: { path: 'images/1940s/filmmaker/3.webp' },
    image56: { path: 'images/1940s/magician/3.webp' },
    image57: { path: 'images/1940s/factory_worker/3.webp' },
    image58: { path: 'images/1940s/mechanic/3.webp' },
    image59: { path: 'images/1940s/engineer/3.webp' },
    image60: { path: 'images/1940s/chef/3.webp' },
    image61: { path: 'images/1940s/chemist/3.webp' },
    image62: { path: 'images/1940s/architect/3.webp' },
    image63: { path: 'images/1940s/corporate_executive/3.webp' },
    image64: { path: 'images/1940s/president/3.webp' },
    image65: { path: 'images/1940s/religious_leader/3.webp' },
    image66: { path: 'images/1940s/nun/3.webp' },
    image67: { path: 'images/1940s/priest/3.webp' },
    image68: { path: 'images/1940s/nurse/3.webp' },
    image69: { path: 'images/1940s/child/3.webp' },
    image70: { path: 'images/1940s/teenager/3.webp' },
    image71: { path: 'images/1940s/married_couple/3.webp' },
    image72: { path: 'images/1940s/couple_lovers/3.webp' },
    image73: { path: 'images/1940s/grandmother/3.webp' },
    image74: { path: 'images/1940s/grandfather/3.webp' },
    image75: { path: 'images/1940s/secretary/3.webp' },
    image76: { path: 'images/1940s/soldier/3.webp' },
    image77: { path: 'images/1940s/gymnast/3.webp' },
    image78: { path: 'images/1940s/marathoner/3.webp' },
    image79: { path: 'images/1940s/musician/4.webp' },
    image80: { path: 'images/1940s/dancer/4.webp' },
    image81: { path: 'images/1940s/filmmaker/4.webp' },
    image82: { path: 'images/1940s/magician/4.webp' },
    image83: { path: 'images/1940s/factory_worker/4.webp' },
    image84: { path: 'images/1940s/mechanic/4.webp' },
    image85: { path: 'images/1940s/engineer/4.webp' },
    image86: { path: 'images/1940s/chef/4.webp' },
    image87: { path: 'images/1940s/chemist/4.webp' },
    image88: { path: 'images/1940s/architect/4.webp' },
    image89: { path: 'images/1940s/corporate_executive/4.webp' },
    image90: { path: 'images/1940s/president/4.webp' },
    image91: { path: 'images/1940s/religious_leader/4.webp' },
    image92: { path: 'images/1940s/nun/4.webp' },
    image93: { path: 'images/1940s/priest/4.webp' },
    image94: { path: 'images/1940s/nurse/4.webp' },
    image95: { path: 'images/1940s/child/4.webp' },
    image96: { path: 'images/1940s/teenager/4.webp' },
    image97: { path: 'images/1940s/married_couple/4.webp' },
    image98: { path: 'images/1940s/couple_lovers/4.webp' },
    image99: { path: 'images/1940s/grandmother/4.webp' },
    image100: { path: 'images/1940s/grandfather/4.webp' },
    image101: { path: 'images/1940s/secretary/4.webp' },
    image102: { path: 'images/1940s/soldier/4.webp' },
    image103: { path: 'images/1940s/gymnast/4.webp' },
    image104: { path: 'images/1940s/marathoner/4.webp' },
    image105: { path: 'images/1940s/musician/5.webp' },
    image106: { path: 'images/1940s/dancer/5.webp' },
    image107: { path: 'images/1940s/filmmaker/5.webp' },
    image108: { path: 'images/1940s/magician/5.webp' },
    image109: { path: 'images/1940s/factory_worker/5.webp' },
    image110: { path: 'images/1940s/mechanic/5.webp' },
    image111: { path: 'images/1940s/engineer/5.webp' },
    image112: { path: 'images/1940s/chef/5.webp' },
    image113: { path: 'images/1940s/chemist/5.webp' },
    image114: { path: 'images/1940s/architect/5.webp' },
    image115: { path: 'images/1940s/corporate_executive/5.webp' },
    image116: { path: 'images/1940s/president/5.webp' },
    image117: { path: 'images/1940s/religious_leader/5.webp' },
    image118: { path: 'images/1940s/nun/5.webp' },
    image119: { path: 'images/1940s/priest/5.webp' },
    image120: { path: 'images/1940s/nurse/5.webp' },
    image121: { path: 'images/1940s/child/5.webp' },
    image122: { path: 'images/1940s/teenager/5.webp' },
    image123: { path: 'images/1940s/married_couple/5.webp' },
    image124: { path: 'images/1940s/couple_lovers/5.webp' },
    image125: { path: 'images/1940s/grandmother/5.webp' },
    image126: { path: 'images/1940s/grandfather/5.webp' },
    image127: { path: 'images/1940s/secretary/5.webp' },
    image128: { path: 'images/1940s/soldier/5.webp' },
    image129: { path: 'images/1940s/gymnast/5.webp' },
    image130: { path: 'images/1940s/marathoner/5.webp' },
    image131: { path: 'images/1940s/musician/6.webp' },
    image132: { path: 'images/1940s/dancer/6.webp' },
    image133: { path: 'images/1940s/filmmaker/6.webp' },
    image134: { path: 'images/1940s/magician/6.webp' },
    image135: { path: 'images/1940s/factory_worker/6.webp' },
    image136: { path: 'images/1940s/mechanic/6.webp' },
    image137: { path: 'images/1940s/engineer/6.webp' },
    image138: { path: 'images/1940s/chef/6.webp' },
    image139: { path: 'images/1940s/chemist/6.webp' },
    image140: { path: 'images/1940s/architect/6.webp' },
    image141: { path: 'images/1940s/corporate_executive/6.webp' },
    image142: { path: 'images/1940s/president/6.webp' },
    image143: { path: 'images/1940s/religious_leader/6.webp' },
    image144: { path: 'images/1940s/nun/6.webp' },
    image145: { path: 'images/1940s/priest/6.webp' },
    image146: { path: 'images/1940s/nurse/6.webp' },
    image147: { path: 'images/1940s/child/6.webp' },
    image148: { path: 'images/1940s/teenager/6.webp' },
    image149: { path: 'images/1940s/married_couple/6.webp' },
    image150: { path: 'images/1940s/couple_lovers/6.webp' },
    image151: { path: 'images/1940s/grandmother/6.webp' },
    image152: { path: 'images/1940s/grandfather/6.webp' },
    image153: { path: 'images/1940s/secretary/6.webp' },
    image154: { path: 'images/1940s/soldier/6.webp' },
    image155: { path: 'images/1940s/gymnast/6.webp' },
    image156: { path: 'images/1940s/marathoner/6.webp' },
    image157: { path: 'images/1940s/musician/7.webp' },
    image158: { path: 'images/1940s/dancer/7.webp' },
    image159: { path: 'images/1940s/filmmaker/7.webp' },
    image160: { path: 'images/1940s/magician/7.webp' },
    image161: { path: 'images/1940s/factory_worker/7.webp' },
    image162: { path: 'images/1940s/mechanic/7.webp' },
    image163: { path: 'images/1940s/engineer/7.webp' },
    image164: { path: 'images/1940s/chef/7.webp' },
    image165: { path: 'images/1940s/chemist/7.webp' },
    image166: { path: 'images/1940s/architect/7.webp' },
    image167: { path: 'images/1940s/corporate_executive/7.webp' },
    image168: { path: 'images/1940s/president/7.webp' },
    image169: { path: 'images/1940s/religious_leader/7.webp' },
    image170: { path: 'images/1940s/nun/7.webp' },
    image171: { path: 'images/1940s/priest/7.webp' },
    image172: { path: 'images/1940s/nurse/7.webp' },
    image173: { path: 'images/1940s/child/7.webp' },
    image174: { path: 'images/1940s/teenager/7.webp' },
    image175: { path: 'images/1940s/married_couple/7.webp' },
    image176: { path: 'images/1940s/couple_lovers/7.webp' },
    image177: { path: 'images/1940s/grandmother/7.webp' },
    image178: { path: 'images/1940s/grandfather/7.webp' },
    image179: { path: 'images/1940s/secretary/7.webp' },
    image180: { path: 'images/1940s/soldier/7.webp' },
    image181: { path: 'images/1940s/gymnast/7.webp' },
    image182: { path: 'images/1940s/marathoner/7.webp' },
    image183: { path: 'images/1940s/musician/8.webp' },
    image184: { path: 'images/1940s/dancer/8.webp' },
    image185: { path: 'images/1940s/filmmaker/8.webp' },
    image186: { path: 'images/1940s/magician/8.webp' },
    image187: { path: 'images/1940s/factory_worker/8.webp' },
    image188: { path: 'images/1940s/mechanic/8.webp' },
    image189: { path: 'images/1940s/engineer/8.webp' },
    image190: { path: 'images/1940s/chef/8.webp' },
    image191: { path: 'images/1940s/chemist/8.webp' },
    image192: { path: 'images/1940s/architect/8.webp' },
    image193: { path: 'images/1940s/corporate_executive/8.webp' },
    image194: { path: 'images/1940s/president/8.webp' },
    image195: { path: 'images/1940s/religious_leader/8.webp' },
    image196: { path: 'images/1940s/nun/8.webp' },
    image197: { path: 'images/1940s/priest/8.webp' },
    image198: { path: 'images/1940s/nurse/8.webp' },
    image199: { path: 'images/1940s/child/8.webp' },
    image200: { path: 'images/1940s/teenager/8.webp' },
    image201: { path: 'images/1940s/married_couple/8.webp' },
    image202: { path: 'images/1940s/couple_lovers/8.webp' },
    image203: { path: 'images/1940s/grandmother/8.webp' },
    image204: { path: 'images/1940s/grandfather/8.webp' },
    image205: { path: 'images/1940s/secretary/8.webp' },
    image206: { path: 'images/1940s/soldier/8.webp' },
    image207: { path: 'images/1940s/gymnast/8.webp' },
    image208: { path: 'images/1940s/marathoner/8.webp' },
    image209: { path: 'images/1940s/musician/9.webp' },
    image210: { path: 'images/1940s/dancer/9.webp' },
    image211: { path: 'images/1940s/filmmaker/9.webp' },
    image212: { path: 'images/1940s/magician/9.webp' },
    image213: { path: 'images/1940s/factory_worker/9.webp' },
    image214: { path: 'images/1940s/mechanic/9.webp' },
    image215: { path: 'images/1940s/engineer/9.webp' },
    image216: { path: 'images/1940s/chef/9.webp' },
    image217: { path: 'images/1940s/chemist/9.webp' },
    image218: { path: 'images/1940s/architect/9.webp' },
    image219: { path: 'images/1940s/corporate_executive/9.webp' },
    image220: { path: 'images/1940s/president/9.webp' },
    image221: { path: 'images/1940s/religious_leader/9.webp' },
    image222: { path: 'images/1940s/nun/9.webp' },
    image223: { path: 'images/1940s/priest/9.webp' },
    image224: { path: 'images/1940s/nurse/9.webp' },
    image225: { path: 'images/1940s/child/9.webp' },
    image226: { path: 'images/1940s/teenager/9.webp' },
    image227: { path: 'images/1940s/married_couple/9.webp' },
    image228: { path: 'images/1940s/couple_lovers/9.webp' },
    image229: { path: 'images/1940s/grandmother/9.webp' },
    image230: { path: 'images/1940s/grandfather/9.webp' },
    image231: { path: 'images/1940s/secretary/9.webp' },
    image232: { path: 'images/1940s/soldier/9.webp' },
    image233: { path: 'images/1940s/gymnast/9.webp' },
    image234: { path: 'images/1940s/marathoner/9.webp' },
    image235: { path: 'images/1940s/musician/10.webp' },
    image236: { path: 'images/1940s/dancer/10.webp' },
    image237: { path: 'images/1940s/filmmaker/10.webp' },
    image238: { path: 'images/1940s/magician/10.webp' },
    image239: { path: 'images/1940s/factory_worker/10.webp' },
    image240: { path: 'images/1940s/mechanic/10.webp' },
    image241: { path: 'images/1940s/engineer/10.webp' },
    image242: { path: 'images/1940s/chef/10.webp' },
    image243: { path: 'images/1940s/chemist/10.webp' },
    image244: { path: 'images/1940s/architect/10.webp' },
    image245: { path: 'images/1940s/corporate_executive/10.webp' },
    image246: { path: 'images/1940s/president/10.webp' },
    image247: { path: 'images/1940s/religious_leader/10.webp' },
    image248: { path: 'images/1940s/nun/10.webp' },
    image249: { path: 'images/1940s/priest/10.webp' },
    image250: { path: 'images/1940s/nurse/10.webp' },
    image251: { path: 'images/1940s/child/10.webp' },
    image252: { path: 'images/1940s/teenager/10.webp' },
    image253: { path: 'images/1940s/married_couple/10.webp' },
    image254: { path: 'images/1940s/couple_lovers/10.webp' },
    image255: { path: 'images/1940s/grandmother/10.webp' },
    image256: { path: 'images/1940s/grandfather/10.webp' },
    image257: { path: 'images/1940s/secretary/10.webp' },
    image258: { path: 'images/1940s/soldier/10.webp' },
    image259: { path: 'images/1940s/gymnast/10.webp' },
    image260: { path: 'images/1940s/marathoner/10.webp' },
    }

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
    gl.camera.position.z = this.cardParams.height * 2 + this.cardParams.gap * 5
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

  private createObjects() {
    const { width, height, row, col, gap } = this.cardParams

    const geometry = new THREE.PlaneGeometry(width, height, 50, 50)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tImage: { value: null },
        uUvScale: { value: new THREE.Vector2() },
        uSpeed: { value: new THREE.Vector2() },
        uAspect: { value: width / height },
      },
      vertexShader,
      fragmentShader,
    })

    const textures = Object.values(this.assets).map((val) => {
      const texture = val.data as THREE.Texture
      texture.wrapS = THREE.MirroredRepeatWrapping
      texture.wrapT = THREE.MirroredRepeatWrapping
      return texture
    })

    const centerX = ((width + gap) * (col - 1)) / 2
    const centerY = ((height + gap) * (row - 1)) / 2
    let i = 0

    for (let x = 0; x < col; x++) {
      for (let y = 0; y < row; y++) {
        const mat = material.clone()
        mat.uniforms.tImage.value = textures[i++]
        calcCoveredTextureScale(mat.uniforms.tImage.value, width / height, mat.uniforms.uUvScale.value)

        const mesh = new THREE.Mesh(geometry, mat)
        mesh.position.set(width * x + gap * x - centerX, height * y + gap * y - centerY, 0)

        this.cards.add(mesh)
      }
    }

    this.cards.userData.target = {
      position: { x: 0, y: 0, z: 0 },
    }

    gl.scene.add(this.cards)
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
