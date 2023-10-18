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
    width: 1.777,
    height: 1,
    row: 25,
    col: 20,
    gap: 0.15,
    }
    
    public assets: Assets = {
    image1: { path: 'images/grid1/0.webp'},
    image2: { path: 'images/grid1/1.webp'},
    image3: { path: 'images/grid1/2.webp'},
    image4: { path: 'images/grid1/3.webp'},
    image5: { path: 'images/grid1/4.webp'},
    image6: { path: 'images/grid1/5.webp'},
    image7: { path: 'images/grid1/6.webp'},
    image8: { path: 'images/grid1/7.webp'},
    image9: { path: 'images/grid1/8.webp'},
    image10: { path: 'images/grid1/9.webp'},
    image11: { path: 'images/grid1/10.webp'},
    image12: { path: 'images/grid1/11.webp'},
    image13: { path: 'images/grid1/12.webp'},
    image14: { path: 'images/grid1/13.webp'},
    image15: { path: 'images/grid1/14.webp'},
    image16: { path: 'images/grid1/15.webp'},
    image17: { path: 'images/grid1/16.webp'},
    image18: { path: 'images/grid1/17.webp'},
    image19: { path: 'images/grid1/18.webp'},
    image20: { path: 'images/grid1/19.webp'},
    image21: { path: 'images/grid1/20.webp'},
    image22: { path: 'images/grid1/21.webp'},
    image23: { path: 'images/grid1/22.webp'},
    image24: { path: 'images/grid1/23.webp'},
    image25: { path: 'images/grid1/24.webp'},
    image26: { path: 'images/grid1/25.webp'},
    image27: { path: 'images/grid1/26.webp'},
    image28: { path: 'images/grid1/27.webp'},
    image29: { path: 'images/grid1/28.webp'},
    image30: { path: 'images/grid1/29.webp'},
    image31: { path: 'images/grid1/30.webp'},
    image32: { path: 'images/grid1/31.webp'},
    image33: { path: 'images/grid1/32.webp'},
    image34: { path: 'images/grid1/33.webp'},
    image35: { path: 'images/grid1/34.webp'},
    image36: { path: 'images/grid1/35.webp'},
    image37: { path: 'images/grid1/36.webp'},
    image38: { path: 'images/grid1/37.webp'},
    image39: { path: 'images/grid1/38.webp'},
    image40: { path: 'images/grid1/39.webp'},
    image41: { path: 'images/grid1/40.webp'},
    image42: { path: 'images/grid1/41.webp'},
    image43: { path: 'images/grid1/42.webp'},
    image44: { path: 'images/grid1/43.webp'},
    image45: { path: 'images/grid1/44.webp'},
    image46: { path: 'images/grid1/45.webp'},
    image47: { path: 'images/grid1/46.webp'},
    image48: { path: 'images/grid1/47.webp'},
    image49: { path: 'images/grid1/48.webp'},
    image50: { path: 'images/grid1/49.webp'},
    image51: { path: 'images/grid1/50.webp'},
    image52: { path: 'images/grid1/51.webp'},
    image53: { path: 'images/grid1/52.webp'},
    image54: { path: 'images/grid1/53.webp'},
    image55: { path: 'images/grid1/54.webp'},
    image56: { path: 'images/grid1/55.webp'},
    image57: { path: 'images/grid1/56.webp'},
    image58: { path: 'images/grid1/57.webp'},
    image59: { path: 'images/grid1/58.webp'},
    image60: { path: 'images/grid1/59.webp'},
    image61: { path: 'images/grid1/60.webp'},
    image62: { path: 'images/grid1/61.webp'},
    image63: { path: 'images/grid1/62.webp'},
    image64: { path: 'images/grid1/63.webp'},
    image65: { path: 'images/grid1/64.webp'},
    image66: { path: 'images/grid1/65.webp'},
    image67: { path: 'images/grid1/66.webp'},
    image68: { path: 'images/grid1/67.webp'},
    image69: { path: 'images/grid1/68.webp'},
    image70: { path: 'images/grid1/69.webp'},
    image71: { path: 'images/grid1/70.webp'},
    image72: { path: 'images/grid1/71.webp'},
    image73: { path: 'images/grid1/72.webp'},
    image74: { path: 'images/grid1/73.webp'},
    image75: { path: 'images/grid1/74.webp'},
    image76: { path: 'images/grid1/75.webp'},
    image77: { path: 'images/grid1/76.webp'},
    image78: { path: 'images/grid1/77.webp'},
    image79: { path: 'images/grid1/78.webp'},
    image80: { path: 'images/grid1/79.webp'},
    image81: { path: 'images/grid1/80.webp'},
    image82: { path: 'images/grid1/81.webp'},
    image83: { path: 'images/grid1/82.webp'},
    image84: { path: 'images/grid1/83.webp'},
    image85: { path: 'images/grid1/84.webp'},
    image86: { path: 'images/grid1/85.webp'},
    image87: { path: 'images/grid1/86.webp'},
    image88: { path: 'images/grid1/87.webp'},
    image89: { path: 'images/grid1/88.webp'},
    image90: { path: 'images/grid1/89.webp'},
    image91: { path: 'images/grid1/90.webp'},
    image92: { path: 'images/grid1/91.webp'},
    image93: { path: 'images/grid1/92.webp'},
    image94: { path: 'images/grid1/93.webp'},
    image95: { path: 'images/grid1/94.webp'},
    image96: { path: 'images/grid1/95.webp'},
    image97: { path: 'images/grid1/96.webp'},
    image98: { path: 'images/grid1/97.webp'},
    image99: { path: 'images/grid1/98.webp'},
    image100: { path: 'images/grid1/99.webp'},
    image101: { path: 'images/grid1/100.webp'},
    image102: { path: 'images/grid1/101.webp'},
    image103: { path: 'images/grid1/102.webp'},
    image104: { path: 'images/grid1/103.webp'},
    image105: { path: 'images/grid1/104.webp'},
    image106: { path: 'images/grid1/105.webp'},
    image107: { path: 'images/grid1/106.webp'},
    image108: { path: 'images/grid1/107.webp'},
    image109: { path: 'images/grid1/108.webp'},
    image110: { path: 'images/grid1/109.webp'},
    image111: { path: 'images/grid1/110.webp'},
    image112: { path: 'images/grid1/111.webp'},
    image113: { path: 'images/grid1/112.webp'},
    image114: { path: 'images/grid1/113.webp'},
    image115: { path: 'images/grid1/114.webp'},
    image116: { path: 'images/grid1/115.webp'},
    image117: { path: 'images/grid1/116.webp'},
    image118: { path: 'images/grid1/117.webp'},
    image119: { path: 'images/grid1/118.webp'},
    image120: { path: 'images/grid1/119.webp'},
    image121: { path: 'images/grid1/120.webp'},
    image122: { path: 'images/grid1/121.webp'},
    image123: { path: 'images/grid1/122.webp'},
    image124: { path: 'images/grid1/123.webp'},
    image125: { path: 'images/grid1/124.webp'},
    image126: { path: 'images/grid1/125.webp'},
    image127: { path: 'images/grid1/126.webp'},
    image128: { path: 'images/grid1/127.webp'},
    image129: { path: 'images/grid1/128.webp'},
    image130: { path: 'images/grid1/129.webp'},
    image131: { path: 'images/grid1/130.webp'},
    image132: { path: 'images/grid1/131.webp'},
    image133: { path: 'images/grid1/132.webp'},
    image134: { path: 'images/grid1/133.webp'},
    image135: { path: 'images/grid1/134.webp'},
    image136: { path: 'images/grid1/135.webp'},
    image137: { path: 'images/grid1/136.webp'},
    image138: { path: 'images/grid1/137.webp'},
    image139: { path: 'images/grid1/138.webp'},
    image140: { path: 'images/grid1/139.webp'},
    image141: { path: 'images/grid1/140.webp'},
    image142: { path: 'images/grid1/141.webp'},
    image143: { path: 'images/grid1/142.webp'},
    image144: { path: 'images/grid1/143.webp'},
    image145: { path: 'images/grid1/144.webp'},
    image146: { path: 'images/grid1/145.webp'},
    image147: { path: 'images/grid1/146.webp'},
    image148: { path: 'images/grid1/147.webp'},
    image149: { path: 'images/grid1/148.webp'},
    image150: { path: 'images/grid1/149.webp'},
    image151: { path: 'images/grid1/150.webp'},
    image152: { path: 'images/grid1/151.webp'},
    image153: { path: 'images/grid1/152.webp'},
    image154: { path: 'images/grid1/153.webp'},
    image155: { path: 'images/grid1/154.webp'},
    image156: { path: 'images/grid1/155.webp'},
    image157: { path: 'images/grid1/156.webp'},
    image158: { path: 'images/grid1/157.webp'},
    image159: { path: 'images/grid1/158.webp'},
    image160: { path: 'images/grid1/159.webp'},
    image161: { path: 'images/grid1/160.webp'},
    image162: { path: 'images/grid1/161.webp'},
    image163: { path: 'images/grid1/162.webp'},
    image164: { path: 'images/grid1/163.webp'},
    image165: { path: 'images/grid1/164.webp'},
    image166: { path: 'images/grid1/165.webp'},
    image167: { path: 'images/grid1/166.webp'},
    image168: { path: 'images/grid1/167.webp'},
    image169: { path: 'images/grid1/168.webp'},
    image170: { path: 'images/grid1/169.webp'},
    image171: { path: 'images/grid1/170.webp'},
    image172: { path: 'images/grid1/171.webp'},
    image173: { path: 'images/grid1/172.webp'},
    image174: { path: 'images/grid1/173.webp'},
    image175: { path: 'images/grid1/174.webp'},
    image176: { path: 'images/grid1/175.webp'},
    image177: { path: 'images/grid1/176.webp'},
    image178: { path: 'images/grid1/177.webp'},
    image179: { path: 'images/grid1/178.webp'},
    image180: { path: 'images/grid1/179.webp'},
    image181: { path: 'images/grid1/180.webp'},
    image182: { path: 'images/grid1/181.webp'},
    image183: { path: 'images/grid1/182.webp'},
    image184: { path: 'images/grid1/183.webp'},
    image185: { path: 'images/grid1/184.webp'},
    image186: { path: 'images/grid1/185.webp'},
    image187: { path: 'images/grid1/186.webp'},
    image188: { path: 'images/grid1/187.webp'},
    image189: { path: 'images/grid1/188.webp'},
    image190: { path: 'images/grid1/189.webp'},
    image191: { path: 'images/grid1/190.webp'},
    image192: { path: 'images/grid1/191.webp'},
    image193: { path: 'images/grid1/192.webp'},
    image194: { path: 'images/grid1/193.webp'},
    image195: { path: 'images/grid1/194.webp'},
    image196: { path: 'images/grid1/195.webp'},
    image197: { path: 'images/grid1/196.webp'},
    image198: { path: 'images/grid1/197.webp'},
    image199: { path: 'images/grid1/198.webp'},
    image200: { path: 'images/grid1/199.webp'},
    image201: { path: 'images/grid1/200.webp'},
    image202: { path: 'images/grid1/201.webp'},
    image203: { path: 'images/grid1/202.webp'},
    image204: { path: 'images/grid1/203.webp'},
    image205: { path: 'images/grid1/204.webp'},
    image206: { path: 'images/grid1/205.webp'},
    image207: { path: 'images/grid1/206.webp'},
    image208: { path: 'images/grid1/207.webp'},
    image209: { path: 'images/grid1/208.webp'},
    image210: { path: 'images/grid1/209.webp'},
    image211: { path: 'images/grid1/210.webp'},
    image212: { path: 'images/grid1/211.webp'},
    image213: { path: 'images/grid1/212.webp'},
    image214: { path: 'images/grid1/213.webp'},
    image215: { path: 'images/grid1/214.webp'},
    image216: { path: 'images/grid1/215.webp'},
    image217: { path: 'images/grid1/216.webp'},
    image218: { path: 'images/grid1/217.webp'},
    image219: { path: 'images/grid1/218.webp'},
    image220: { path: 'images/grid1/219.webp'},
    image221: { path: 'images/grid1/220.webp'},
    image222: { path: 'images/grid1/221.webp'},
    image223: { path: 'images/grid1/222.webp'},
    image224: { path: 'images/grid1/223.webp'},
    image225: { path: 'images/grid1/224.webp'},
    image226: { path: 'images/grid1/225.webp'},
    image227: { path: 'images/grid1/226.webp'},
    image228: { path: 'images/grid1/227.webp'},
    image229: { path: 'images/grid1/228.webp'},
    image230: { path: 'images/grid1/229.webp'},
    image231: { path: 'images/grid1/230.webp'},
    image232: { path: 'images/grid1/231.webp'},
    image233: { path: 'images/grid1/232.webp'},
    image234: { path: 'images/grid1/233.webp'},
    image235: { path: 'images/grid1/234.webp'},
    image236: { path: 'images/grid1/235.webp'},
    image237: { path: 'images/grid1/236.webp'},
    image238: { path: 'images/grid1/237.webp'},
    image239: { path: 'images/grid1/238.webp'},
    image240: { path: 'images/grid1/239.webp'},
    image241: { path: 'images/grid1/240.webp'},
    image242: { path: 'images/grid1/241.webp'},
    image243: { path: 'images/grid1/242.webp'},
    image244: { path: 'images/grid1/243.webp'},
    image245: { path: 'images/grid1/244.webp'},
    image246: { path: 'images/grid1/245.webp'},
    image247: { path: 'images/grid1/246.webp'},
    image248: { path: 'images/grid1/247.webp'},
    image249: { path: 'images/grid1/248.webp'},
    image250: { path: 'images/grid1/249.webp'},
    image251: { path: 'images/grid1/250.webp'},
    image252: { path: 'images/grid1/251.webp'},
    image253: { path: 'images/grid1/252.webp'},
    image254: { path: 'images/grid1/253.webp'},
    image255: { path: 'images/grid1/254.webp'},
    image256: { path: 'images/grid1/255.webp'},
    image257: { path: 'images/grid1/256.webp'},
    image258: { path: 'images/grid1/257.webp'},
    image259: { path: 'images/grid1/258.webp'},
    image260: { path: 'images/grid1/259.webp'},
    image261: { path: 'images/grid1/260.webp'},
    image262: { path: 'images/grid1/261.webp'},
    image263: { path: 'images/grid1/262.webp'},
    image264: { path: 'images/grid1/263.webp'},
    image265: { path: 'images/grid1/264.webp'},
    image266: { path: 'images/grid1/265.webp'},
    image267: { path: 'images/grid1/266.webp'},
    image268: { path: 'images/grid1/267.webp'},
    image269: { path: 'images/grid1/268.webp'},
    image270: { path: 'images/grid1/269.webp'},
    image271: { path: 'images/grid1/270.webp'},
    image272: { path: 'images/grid1/271.webp'},
    image273: { path: 'images/grid1/272.webp'},
    image274: { path: 'images/grid1/273.webp'},
    image275: { path: 'images/grid1/274.webp'},
    image276: { path: 'images/grid1/275.webp'},
    image277: { path: 'images/grid1/276.webp'},
    image278: { path: 'images/grid1/277.webp'},
    image279: { path: 'images/grid1/278.webp'},
    image280: { path: 'images/grid1/279.webp'},
    image281: { path: 'images/grid1/280.webp'},
    image282: { path: 'images/grid1/281.webp'},
    image283: { path: 'images/grid1/282.webp'},
    image284: { path: 'images/grid1/283.webp'},
    image285: { path: 'images/grid1/284.webp'},
    image286: { path: 'images/grid1/285.webp'},
    image287: { path: 'images/grid1/286.webp'},
    image288: { path: 'images/grid1/287.webp'},
    image289: { path: 'images/grid1/288.webp'},
    image290: { path: 'images/grid1/289.webp'},
    image291: { path: 'images/grid1/290.webp'},
    image292: { path: 'images/grid1/291.webp'},
    image293: { path: 'images/grid1/292.webp'},
    image294: { path: 'images/grid1/293.webp'},
    image295: { path: 'images/grid1/294.webp'},
    image296: { path: 'images/grid1/295.webp'},
    image297: { path: 'images/grid1/296.webp'},
    image298: { path: 'images/grid1/297.webp'},
    image299: { path: 'images/grid1/298.webp'},
    image300: { path: 'images/grid1/299.webp'},
    image301: { path: 'images/grid1/300.webp'},
    image302: { path: 'images/grid1/301.webp'},
    image303: { path: 'images/grid1/302.webp'},
    image304: { path: 'images/grid1/303.webp'},
    image305: { path: 'images/grid1/304.webp'},
    image306: { path: 'images/grid1/305.webp'},
    image307: { path: 'images/grid1/306.webp'},
    image308: { path: 'images/grid1/307.webp'},
    image309: { path: 'images/grid1/308.webp'},
    image310: { path: 'images/grid1/309.webp'},
    image311: { path: 'images/grid1/310.webp'},
    image312: { path: 'images/grid1/311.webp'},
    image313: { path: 'images/grid1/312.webp'},
    image314: { path: 'images/grid1/313.webp'},
    image315: { path: 'images/grid1/314.webp'},
    image316: { path: 'images/grid1/315.webp'},
    image317: { path: 'images/grid1/316.webp'},
    image318: { path: 'images/grid1/317.webp'},
    image319: { path: 'images/grid1/318.webp'},
    image320: { path: 'images/grid1/319.webp'},
    image321: { path: 'images/grid1/320.webp'},
    image322: { path: 'images/grid1/321.webp'},
    image323: { path: 'images/grid1/322.webp'},
    image324: { path: 'images/grid1/323.webp'},
    image325: { path: 'images/grid1/324.webp'},
    image326: { path: 'images/grid1/325.webp'},
    image327: { path: 'images/grid1/326.webp'},
    image328: { path: 'images/grid1/327.webp'},
    image329: { path: 'images/grid1/328.webp'},
    image330: { path: 'images/grid1/329.webp'},
    image331: { path: 'images/grid1/330.webp'},
    image332: { path: 'images/grid1/331.webp'},
    image333: { path: 'images/grid1/332.webp'},
    image334: { path: 'images/grid1/333.webp'},
    image335: { path: 'images/grid1/334.webp'},
    image336: { path: 'images/grid1/335.webp'},
    image337: { path: 'images/grid1/336.webp'},
    image338: { path: 'images/grid1/337.webp'},
    image339: { path: 'images/grid1/338.webp'},
    image340: { path: 'images/grid1/339.webp'},
    image341: { path: 'images/grid1/340.webp'},
    image342: { path: 'images/grid1/341.webp'},
    image343: { path: 'images/grid1/342.webp'},
    image344: { path: 'images/grid1/343.webp'},
    image345: { path: 'images/grid1/344.webp'},
    image346: { path: 'images/grid1/345.webp'},
    image347: { path: 'images/grid1/346.webp'},
    image348: { path: 'images/grid1/347.webp'},
    image349: { path: 'images/grid1/348.webp'},
    image350: { path: 'images/grid1/349.webp'},
    image351: { path: 'images/grid1/350.webp'},
    image352: { path: 'images/grid1/351.webp'},
    image353: { path: 'images/grid1/352.webp'},
    image354: { path: 'images/grid1/353.webp'},
    image355: { path: 'images/grid1/354.webp'},
    image356: { path: 'images/grid1/355.webp'},
    image357: { path: 'images/grid1/356.webp'},
    image358: { path: 'images/grid1/357.webp'},
    image359: { path: 'images/grid1/358.webp'},
    image360: { path: 'images/grid1/359.webp'},
    image361: { path: 'images/grid1/360.webp'},
    image362: { path: 'images/grid1/361.webp'},
    image363: { path: 'images/grid1/362.webp'},
    image364: { path: 'images/grid1/363.webp'},
    image365: { path: 'images/grid1/364.webp'},
    image366: { path: 'images/grid1/365.webp'},
    image367: { path: 'images/grid1/366.webp'},
    image368: { path: 'images/grid1/367.webp'},
    image369: { path: 'images/grid1/368.webp'},
    image370: { path: 'images/grid1/369.webp'},
    image371: { path: 'images/grid1/370.webp'},
    image372: { path: 'images/grid1/371.webp'},
    image373: { path: 'images/grid1/372.webp'},
    image374: { path: 'images/grid1/373.webp'},
    image375: { path: 'images/grid1/374.webp'},
    image376: { path: 'images/grid1/375.webp'},
    image377: { path: 'images/grid1/376.webp'},
    image378: { path: 'images/grid1/377.webp'},
    image379: { path: 'images/grid1/378.webp'},
    image380: { path: 'images/grid1/379.webp'},
    image381: { path: 'images/grid1/380.webp'},
    image382: { path: 'images/grid1/381.webp'},
    image383: { path: 'images/grid1/382.webp'},
    image384: { path: 'images/grid1/383.webp'},
    image385: { path: 'images/grid1/384.webp'},
    image386: { path: 'images/grid1/385.webp'},
    image387: { path: 'images/grid1/386.webp'},
    image388: { path: 'images/grid1/387.webp'},
    image389: { path: 'images/grid1/388.webp'},
    image390: { path: 'images/grid1/389.webp'},
    image391: { path: 'images/grid1/390.webp'},
    image392: { path: 'images/grid1/391.webp'},
    image393: { path: 'images/grid1/392.webp'},
    image394: { path: 'images/grid1/393.webp'},
    image395: { path: 'images/grid1/394.webp'},
    image396: { path: 'images/grid1/395.webp'},
    image397: { path: 'images/grid1/396.webp'},
    image398: { path: 'images/grid1/397.webp'},
    image399: { path: 'images/grid1/398.webp'},
    image400: { path: 'images/grid1/399.webp'},
    image401: { path: 'images/grid1/400.webp'},
    image402: { path: 'images/grid1/401.webp'},
    image403: { path: 'images/grid1/402.webp'},
    image404: { path: 'images/grid1/403.webp'},
    image405: { path: 'images/grid1/404.webp'},
    image406: { path: 'images/grid1/405.webp'},
    image407: { path: 'images/grid1/406.webp'},
    image408: { path: 'images/grid1/407.webp'},
    image409: { path: 'images/grid1/408.webp'},
    image410: { path: 'images/grid1/409.webp'},
    image411: { path: 'images/grid1/410.webp'},
    image412: { path: 'images/grid1/411.webp'},
    image413: { path: 'images/grid1/412.webp'},
    image414: { path: 'images/grid1/413.webp'},
    image415: { path: 'images/grid1/414.webp'},
    image416: { path: 'images/grid1/415.webp'},
    image417: { path: 'images/grid1/416.webp'},
    image418: { path: 'images/grid1/417.webp'},
    image419: { path: 'images/grid1/418.webp'},
    image420: { path: 'images/grid1/419.webp'},
    image421: { path: 'images/grid1/420.webp'},
    image422: { path: 'images/grid1/421.webp'},
    image423: { path: 'images/grid1/422.webp'},
    image424: { path: 'images/grid1/423.webp'},
    image425: { path: 'images/grid1/424.webp'},
    image426: { path: 'images/grid1/425.webp'},
    image427: { path: 'images/grid1/426.webp'},
    image428: { path: 'images/grid1/427.webp'},
    image429: { path: 'images/grid1/428.webp'},
    image430: { path: 'images/grid1/429.webp'},
    image431: { path: 'images/grid1/430.webp'},
    image432: { path: 'images/grid1/431.webp'},
    image433: { path: 'images/grid1/432.webp'},
    image434: { path: 'images/grid1/433.webp'},
    image435: { path: 'images/grid1/434.webp'},
    image436: { path: 'images/grid1/435.webp'},
    image437: { path: 'images/grid1/436.webp'},
    image438: { path: 'images/grid1/437.webp'},
    image439: { path: 'images/grid1/438.webp'},
    image440: { path: 'images/grid1/439.webp'},
    image441: { path: 'images/grid1/440.webp'},
    image442: { path: 'images/grid1/441.webp'},
    image443: { path: 'images/grid1/442.webp'},
    image444: { path: 'images/grid1/443.webp'},
    image445: { path: 'images/grid1/444.webp'},
    image446: { path: 'images/grid1/445.webp'},
    image447: { path: 'images/grid1/446.webp'},
    image448: { path: 'images/grid1/447.webp'},
    image449: { path: 'images/grid1/448.webp'},
    image450: { path: 'images/grid1/449.webp'},
    image451: { path: 'images/grid1/450.webp'},
    image452: { path: 'images/grid1/451.webp'},
    image453: { path: 'images/grid1/452.webp'},
    image454: { path: 'images/grid1/453.webp'},
    image455: { path: 'images/grid1/454.webp'},
    image456: { path: 'images/grid1/455.webp'},
    image457: { path: 'images/grid1/456.webp'},
    image458: { path: 'images/grid1/457.webp'},
    image459: { path: 'images/grid1/458.webp'},
    image460: { path: 'images/grid1/459.webp'},
    image461: { path: 'images/grid1/460.webp'},
    image462: { path: 'images/grid1/461.webp'},
    image463: { path: 'images/grid1/462.webp'},
    image464: { path: 'images/grid1/463.webp'},
    image465: { path: 'images/grid1/464.webp'},
    image466: { path: 'images/grid1/465.webp'},
    image467: { path: 'images/grid1/466.webp'},
    image468: { path: 'images/grid1/467.webp'},
    image469: { path: 'images/grid1/468.webp'},
    image470: { path: 'images/grid1/469.webp'},
    image471: { path: 'images/grid1/470.webp'},
    image472: { path: 'images/grid1/471.webp'},
    image473: { path: 'images/grid1/472.webp'},
    image474: { path: 'images/grid1/473.webp'},
    image475: { path: 'images/grid1/474.webp'},
    image476: { path: 'images/grid1/475.webp'},
    image477: { path: 'images/grid1/476.webp'},
    image478: { path: 'images/grid1/477.webp'},
    image479: { path: 'images/grid1/478.webp'},
    image480: { path: 'images/grid1/479.webp'},
    image481: { path: 'images/grid1/480.webp'},
    image482: { path: 'images/grid1/481.webp'},
    image483: { path: 'images/grid1/482.webp'},
    image484: { path: 'images/grid1/483.webp'},
    image485: { path: 'images/grid1/484.webp'},
    image486: { path: 'images/grid1/485.webp'},
    image487: { path: 'images/grid1/486.webp'},
    image488: { path: 'images/grid1/487.webp'},
    image489: { path: 'images/grid1/488.webp'},
    image490: { path: 'images/grid1/489.webp'},
    image491: { path: 'images/grid1/490.webp'},
    image492: { path: 'images/grid1/491.webp'},
    image493: { path: 'images/grid1/492.webp'},
    image494: { path: 'images/grid1/493.webp'},
    image495: { path: 'images/grid1/494.webp'},
    image496: { path: 'images/grid1/495.webp'},
    image497: { path: 'images/grid1/496.webp'},
    image498: { path: 'images/grid1/497.webp'},
    image499: { path: 'images/grid1/498.webp'},
    image500: { path: 'images/grid1/499.webp'},
    }
    
     private imageLable: string[] = [
    '1940s - First Love Confession',
    '1950s - First Love Confession',
    '1960s - First Love Confession',
    '1970s - First Love Confession',
    '1980s - First Love Confession',
    '1940s - Heartfelt Reunion After Years Apart',
    '1950s - Heartfelt Reunion After Years Apart',
    '1960s - Heartfelt Reunion After Years Apart',
    '1970s - Heartfelt Reunion After Years Apart',
    '1980s - Heartfelt Reunion After Years Apart',
    '1940s - Unrequited Love',
    '1950s - Unrequited Love',
    '1960s - Unrequited Love',
    '1970s - Unrequited Love',
    '1980s - Unrequited Love',
    '1940s - Wedding Proposal',
    '1950s - Wedding Proposal',
    '1960s - Wedding Proposal',
    '1970s - Wedding Proposal',
    '1980s - Wedding Proposal',
    '1940s - Heartbreak and Tears',
    '1950s - Heartbreak and Tears',
    '1960s - Heartbreak and Tears',
    '1970s - Heartbreak and Tears',
    '1980s - Heartbreak and Tears',
    '1940s - Forbidden Love',
    '1950s - Forbidden Love',
    '1960s - Forbidden Love',
    '1970s - Forbidden Love',
    '1980s - Forbidden Love',
    '1940s - Painful Breakup',
    '1950s - Painful Breakup',
    '1960s - Painful Breakup',
    '1970s - Painful Breakup',
    '1980s - Painful Breakup',
    '1940s - Love Triangle',
    '1950s - Love Triangle',
    '1960s - Love Triangle',
    '1970s - Love Triangle',
    '1980s - Love Triangle',
    '1940s - Long-Distance Love',
    '1950s - Long-Distance Love',
    '1960s - Long-Distance Love',
    '1970s - Long-Distance Love',
    '1980s - Long-Distance Love',
    '1940s - Passionate Kiss in the Rain',
    '1950s - Passionate Kiss in the Rain',
    '1960s - Passionate Kiss in the Rain',
    '1970s - Passionate Kiss in the Rain',
    '1980s - Passionate Kiss in the Rain',
    '1940s - Jealousy and Betrayal',
    '1950s - Jealousy and Betrayal',
    '1960s - Jealousy and Betrayal',
    '1970s - Jealousy and Betrayal',
    '1980s - Jealousy and Betrayal',
    '1940s - Supporting Each Other Through Hard Times',
    '1950s - Supporting Each Other Through Hard Times',
    '1960s - Supporting Each Other Through Hard Times',
    '1970s - Supporting Each Other Through Hard Times',
    '1980s - Supporting Each Other Through Hard Times',
    '1940s - Love Across Different Cultures',
    '1950s - Love Across Different Cultures',
    '1960s - Love Across Different Cultures',
    '1970s - Love Across Different Cultures',
    '1980s - Love Across Different Cultures',
    '1940s - Childhood Sweethearts Reuniting',
    '1950s - Childhood Sweethearts Reuniting',
    '1960s - Childhood Sweethearts Reuniting',
    '1970s - Childhood Sweethearts Reuniting',
    '1980s - Childhood Sweethearts Reuniting',
    '1940s - Enduring Love in Old Age',
    '1950s - Enduring Love in Old Age',
    '1960s - Enduring Love in Old Age',
    '1970s - Enduring Love in Old Age',
    '1980s - Enduring Love in Old Age',
    '1940s - Finding Love Again After Loss',
    '1950s - Finding Love Again After Loss',
    '1960s - Finding Love Again After Loss',
    '1970s - Finding Love Again After Loss',
    '1980s - Finding Love Again After Loss',
    '1940s - Secret Admirer Revealed',
    '1950s - Secret Admirer Revealed',
    '1960s - Secret Admirer Revealed',
    '1970s - Secret Admirer Revealed',
    '1980s - Secret Admirer Revealed',
    '1940s - Falling in Love at First Sight',
    '1950s - Falling in Love at First Sight',
    '1960s - Falling in Love at First Sight',
    '1970s - Falling in Love at First Sight',
    '1980s - Falling in Love at First Sight',
    '1940s - Love Tested by Time and Circumstances',
    '1950s - Love Tested by Time and Circumstances',
    '1960s - Love Tested by Time and Circumstances',
    '1970s - Love Tested by Time and Circumstances',
    '1980s - Love Tested by Time and Circumstances',
    '1940s - Unconditional Love',
    '1950s - Unconditional Love',
    '1960s - Unconditional Love',
    '1970s - Unconditional Love',
    '1980s - Unconditional Love',
    '1940s - Fatal Illness',
    '1950s - Fatal Illness',
    '1960s - Fatal Illness',
    '1970s - Fatal Illness',
    '1980s - Fatal Illness',
    '1940s - Unrequited Love',
    '1950s - Unrequited Love',
    '1960s - Unrequited Love',
    '1970s - Unrequited Love',
    '1980s - Unrequited Love',
    '1940s - Betrayal by a Close Friend',
    '1950s - Betrayal by a Close Friend',
    '1960s - Betrayal by a Close Friend',
    '1970s - Betrayal by a Close Friend',
    '1980s - Betrayal by a Close Friend',
    '1940s - Unexpected Death of a Loved One',
    '1950s - Unexpected Death of a Loved One',
    '1960s - Unexpected Death of a Loved One',
    '1970s - Unexpected Death of a Loved One',
    '1980s - Unexpected Death of a Loved One',
    '1940s - Tragic Accident',
    '1950s - Tragic Accident',
    '1960s - Tragic Accident',
    '1970s - Tragic Accident',
    '1980s - Tragic Accident',
    '1940s - Forced Separation from Loved Ones',
    '1950s - Forced Separation from Loved Ones',
    '1960s - Forced Separation from Loved Ones',
    '1970s - Forced Separation from Loved Ones',
    '1980s - Forced Separation from Loved Ones',
    '1940s - Unfulfilled Ambitions',
    '1950s - Unfulfilled Ambitions',
    '1960s - Unfulfilled Ambitions',
    '1970s - Unfulfilled Ambitions',
    '1980s - Unfulfilled Ambitions',
    '1940s - Self-Destruction due to Guilt',
    '1950s - Self-Destruction due to Guilt',
    '1960s - Self-Destruction due to Guilt',
    '1970s - Self-Destruction due to Guilt',
    '1980s - Self-Destruction due to Guilt',
    '1940s - Loss of Innocence',
    '1950s - Loss of Innocence',
    '1960s - Loss of Innocence',
    '1970s - Loss of Innocence',
    '1980s - Loss of Innocence',
    '1940s - Cruelty and Injustice',
    '1950s - Cruelty and Injustice',
    '1960s - Cruelty and Injustice',
    '1970s - Cruelty and Injustice',
    '1980s - Cruelty and Injustice',
    '1940s - Blindness to Truth',
    '1950s - Blindness to Truth',
    '1960s - Blindness to Truth',
    '1970s - Blindness to Truth',
    '1980s - Blindness to Truth',
    '1940s - Fateful Flaw Leading to Downfall',
    '1950s - Fateful Flaw Leading to Downfall',
    '1960s - Fateful Flaw Leading to Downfall',
    '1970s - Fateful Flaw Leading to Downfall',
    '1980s - Fateful Flaw Leading to Downfall',
    '1940s - Mistaken Identity',
    '1950s - Mistaken Identity',
    '1960s - Mistaken Identity',
    '1970s - Mistaken Identity',
    '1980s - Mistaken Identity',
    '1940s - Ruin Due to Jealousy',
    '1950s - Ruin Due to Jealousy',
    '1960s - Ruin Due to Jealousy',
    '1970s - Ruin Due to Jealousy',
    '1980s - Ruin Due to Jealousy',
    '1940s - Sacrifice for Others',
    '1950s - Sacrifice for Others',
    '1960s - Sacrifice for Others',
    '1970s - Sacrifice for Others',
    '1980s - Sacrifice for Others',
    '1940s - Fatal Misunderstanding',
    '1950s - Fatal Misunderstanding',
    '1960s - Fatal Misunderstanding',
    '1970s - Fatal Misunderstanding',
    '1980s - Fatal Misunderstanding',
    '1940s - Insurmountable External Forces',
    '1950s - Insurmountable External Forces',
    '1960s - Insurmountable External Forces',
    '1970s - Insurmountable External Forces',
    '1980s - Insurmountable External Forces',
    '1940s - Loss of Faith or Hope',
    '1950s - Loss of Faith or Hope',
    '1960s - Loss of Faith or Hope',
    '1970s - Loss of Faith or Hope',
    '1980s - Loss of Faith or Hope',
    '1940s - Doomed Rebellion',
    '1950s - Doomed Rebellion',
    '1960s - Doomed Rebellion',
    '1970s - Doomed Rebellion',
    '1980s - Doomed Rebellion',
    '1940s - Inescapable Destiny',
    '1950s - Inescapable Destiny',
    '1960s - Inescapable Destiny',
    '1970s - Inescapable Destiny',
    '1980s - Inescapable Destiny',
    '1940s - Hostage Situation',
    '1950s - Hostage Situation',
    '1960s - Hostage Situation',
    '1970s - Hostage Situation',
    '1980s - Hostage Situation',
    '1940s - Stalker Pursuit',
    '1950s - Stalker Pursuit',
    '1960s - Stalker Pursuit',
    '1970s - Stalker Pursuit',
    '1980s - Stalker Pursuit',
    '1940s - Kidnapping',
    '1950s - Kidnapping',
    '1960s - Kidnapping',
    '1970s - Kidnapping',
    '1980s - Kidnapping',
    '1940s - Bomb Threat',
    '1950s - Bomb Threat',
    '1960s - Bomb Threat',
    '1970s - Bomb Threat',
    '1980s - Bomb Threat',
    '1940s - Serial Killer on the Loose',
    '1950s - Serial Killer on the Loose',
    '1960s - Serial Killer on the Loose',
    '1970s - Serial Killer on the Loose',
    '1980s - Serial Killer on the Loose',
    '1940s - Disappearance of a Loved One',
    '1950s - Disappearance of a Loved One',
    '1960s - Disappearance of a Loved One',
    '1970s - Disappearance of a Loved One',
    '1980s - Disappearance of a Loved One',
    '1940s - Blackmail',
    '1950s - Blackmail',
    '1960s - Blackmail',
    '1970s - Blackmail',
    '1980s - Blackmail',
    '1940s - Race Against Time',
    '1950s - Race Against Time',
    '1960s - Race Against Time',
    '1970s - Race Against Time',
    '1980s - Race Against Time',
    '1940s - Unseen Threat in Isolation',
    '1950s - Unseen Threat in Isolation',
    '1960s - Unseen Threat in Isolation',
    '1970s - Unseen Threat in Isolation',
    '1980s - Unseen Threat in Isolation',
    '1940s - Home Invasion',
    '1950s - Home Invasion',
    '1960s - Home Invasion',
    '1970s - Home Invasion',
    '1980s - Home Invasion',
    '1940s - Identity Theft',
    '1950s - Identity Theft',
    '1960s - Identity Theft',
    '1970s - Identity Theft',
    '1980s - Identity Theft',
    '1940s - Deadly Pursuit',
    '1950s - Deadly Pursuit',
    '1960s - Deadly Pursuit',
    '1970s - Deadly Pursuit',
    '1980s - Deadly Pursuit',
    '1940s - Trapped in a Confined Space',
    '1950s - Trapped in a Confined Space',
    '1960s - Trapped in a Confined Space',
    '1970s - Trapped in a Confined Space',
    '1980s - Trapped in a Confined Space',
    '1940s - Haunted House',
    '1950s - Haunted House',
    '1960s - Haunted House',
    '1970s - Haunted House',
    '1980s - Haunted House',
    '1940s - Framed for a Crime',
    '1950s - Framed for a Crime',
    '1960s - Framed for a Crime',
    '1970s - Framed for a Crime',
    '1980s - Framed for a Crime',
    '1940s - Espionage and Spycraft',
    '1950s - Espionage and Spycraft',
    '1960s - Espionage and Spycraft',
    '1970s - Espionage and Spycraft',
    '1980s - Espionage and Spycraft',
    '1940s - Unsolved Murder Mystery',
    '1950s - Unsolved Murder Mystery',
    '1960s - Unsolved Murder Mystery',
    '1970s - Unsolved Murder Mystery',
    '1980s - Unsolved Murder Mystery',
    '1940s - Sabotage',
    '1950s - Sabotage',
    '1960s - Sabotage',
    '1970s - Sabotage',
    '1980s - Sabotage',
    '1940s - Cult Infiltration',
    '1950s - Cult Infiltration',
    '1960s - Cult Infiltration',
    '1970s - Cult Infiltration',
    '1980s - Cult Infiltration',
    '1940s - Accused of a Crime',
    '1950s - Accused of a Crime',
    '1960s - Accused of a Crime',
    '1970s - Accused of a Crime',
    '1980s - Accused of a Crime',
    '1940s - Haunted House',
    '1950s - Haunted House',
    '1960s - Haunted House',
    '1970s - Haunted House',
    '1980s - Haunted House',
    '1940s - Creepy Forest',
    '1950s - Creepy Forest',
    '1960s - Creepy Forest',
    '1970s - Creepy Forest',
    '1980s - Creepy Forest',
    '1940s - Abandoned Asylum',
    '1950s - Abandoned Asylum',
    '1960s - Abandoned Asylum',
    '1970s - Abandoned Asylum',
    '1980s - Abandoned Asylum',
    '1940s - Ghost Ship',
    '1950s - Ghost Ship',
    '1960s - Ghost Ship',
    '1970s - Ghost Ship',
    '1980s - Ghost Ship',
    '1940s - Possession',
    '1950s - Possession',
    '1960s - Possession',
    '1970s - Possession',
    '1980s - Possession',
    '1940s - Cursed Doll',
    '1950s - Cursed Doll',
    '1960s - Cursed Doll',
    '1970s - Cursed Doll',
    '1980s - Cursed Doll',
    '1940s - Vampire Attack',
    '1950s - Vampire Attack',
    '1960s - Vampire Attack',
    '1970s - Vampire Attack',
    '1980s - Vampire Attack',
    '1940s - Werewolf Hunt',
    '1950s - Werewolf Hunt',
    '1960s - Werewolf Hunt',
    '1970s - Werewolf Hunt',
    '1980s - Werewolf Hunt',
    '1940s - Zombie Apocalypse',
    '1950s - Zombie Apocalypse',
    '1960s - Zombie Apocalypse',
    '1970s - Zombie Apocalypse',
    '1980s - Zombie Apocalypse',
    '1940s - Alien Invasion',
    '1950s - Alien Invasion',
    '1960s - Alien Invasion',
    '1970s - Alien Invasion',
    '1980s - Alien Invasion',
    '1940s - Serial Killer Stalking',
    '1950s - Serial Killer Stalking',
    '1960s - Serial Killer Stalking',
    '1970s - Serial Killer Stalking',
    '1980s - Serial Killer Stalking',
    '1940s - Sinister Carnival',
    '1950s - Sinister Carnival',
    '1960s - Sinister Carnival',
    '1970s - Sinister Carnival',
    '1980s - Sinister Carnival',
    '1940s - Poltergeist Activity',
    '1950s - Poltergeist Activity',
    '1960s - Poltergeist Activity',
    '1970s - Poltergeist Activity',
    '1980s - Poltergeist Activity',
    '1940s - Mysterious Disappearances',
    '1950s - Mysterious Disappearances',
    '1960s - Mysterious Disappearances',
    '1970s - Mysterious Disappearances',
    '1980s - Mysterious Disappearances',
    '1940s - Haunted Mirror',
    '1950s - Haunted Mirror',
    '1960s - Haunted Mirror',
    '1970s - Haunted Mirror',
    '1980s - Haunted Mirror',
    '1940s - Ritual Sacrifice',
    '1950s - Ritual Sacrifice',
    '1960s - Ritual Sacrifice',
    '1970s - Ritual Sacrifice',
    '1980s - Ritual Sacrifice',
    '1940s - Demonic Possession',
    '1950s - Demonic Possession',
    '1960s - Demonic Possession',
    '1970s - Demonic Possession',
    '1980s - Demonic Possession',
    '1940s - Creepy Children',
    '1950s - Creepy Children',
    '1960s - Creepy Children',
    '1970s - Creepy Children',
    '1980s - Creepy Children',
    '1940s - Shadowy Figures',
    '1950s - Shadowy Figures',
    '1960s - Shadowy Figures',
    '1970s - Shadowy Figures',
    '1980s - Shadowy Figures',
    '1940s - Vengeful Spirit',
    '1950s - Vengeful Spirit',
    '1960s - Vengeful Spirit',
    '1970s - Vengeful Spirit',
    '1980s - Vengeful Spirit',
    '1940s - Rescue Mission',
    '1950s - Rescue Mission',
    '1960s - Rescue Mission',
    '1970s - Rescue Mission',
    '1980s - Rescue Mission',
    '1940s - Treasure Hunt',
    '1950s - Treasure Hunt',
    '1960s - Treasure Hunt',
    '1970s - Treasure Hunt',
    '1980s - Treasure Hunt',
    '1940s - Monster Encounter',
    '1950s - Monster Encounter',
    '1960s - Monster Encounter',
    '1970s - Monster Encounter',
    '1980s - Monster Encounter',
    '1940s - Epic Battle',
    '1950s - Epic Battle',
    '1960s - Epic Battle',
    '1970s - Epic Battle',
    '1980s - Epic Battle',
    '1940s - Journey to a Distant Land',
    '1950s - Journey to a Distant Land',
    '1960s - Journey to a Distant Land',
    '1970s - Journey to a Distant Land',
    '1980s - Journey to a Distant Land',
    '1940s - Escape from Captivity',
    '1950s - Escape from Captivity',
    '1960s - Escape from Captivity',
    '1970s - Escape from Captivity',
    '1980s - Escape from Captivity',
    '1940s - Quest for a Magical Artifact',
    '1950s - Quest for a Magical Artifact',
    '1960s - Quest for a Magical Artifact',
    '1970s - Quest for a Magical Artifact',
    '1980s - Quest for a Magical Artifact',
    '1940s - Mysterious Island Exploration',
    '1950s - Mysterious Island Exploration',
    '1960s - Mysterious Island Exploration',
    '1970s - Mysterious Island Exploration',
    '1980s - Mysterious Island Exploration',
    '1940s - Infiltration Mission',
    '1950s - Infiltration Mission',
    '1960s - Infiltration Mission',
    '1970s - Infiltration Mission',
    '1980s - Infiltration Mission',
    '1940s - Time Travel Adventure',
    '1950s - Time Travel Adventure',
    '1960s - Time Travel Adventure',
    '1970s - Time Travel Adventure',
    '1980s - Time Travel Adventure',
    '1940s - Chase Across the City',
    '1950s - Chase Across the City',
    '1960s - Chase Across the City',
    '1970s - Chase Across the City',
    '1980s - Chase Across the City',
    '1940s - Solving a Mythical Riddle',
    '1950s - Solving a Mythical Riddle',
    '1960s - Solving a Mythical Riddle',
    '1970s - Solving a Mythical Riddle',
    '1980s - Solving a Mythical Riddle',
    '1940s - Defending the Kingdom',
    '1950s - Defending the Kingdom',
    '1960s - Defending the Kingdom',
    '1970s - Defending the Kingdom',
    '1980s - Defending the Kingdom',
    '1940s - Exploring an Abandoned Castle',
    '1950s - Exploring an Abandoned Castle',
    '1960s - Exploring an Abandoned Castle',
    '1970s - Exploring an Abandoned Castle',
    '1980s - Exploring an Abandoned Castle',
    '1940s - Discovery of a Hidden Civilization',
    '1950s - Discovery of a Hidden Civilization',
    '1960s - Discovery of a Hidden Civilization',
    '1970s - Discovery of a Hidden Civilization',
    '1980s - Discovery of a Hidden Civilization',
    '1940s - Search for a Lost City',
    '1950s - Search for a Lost City',
    '1960s - Search for a Lost City',
    '1970s - Search for a Lost City',
    '1980s - Search for a Lost City',
    '1940s - Befriending a Legendary Creature',
    '1950s - Befriending a Legendary Creature',
    '1960s - Befriending a Legendary Creature',
    '1970s - Befriending a Legendary Creature',
    '1980s - Befriending a Legendary Creature',
    '1940s - Navigating a Labyrinth',
    '1950s - Navigating a Labyrinth',
    '1960s - Navigating a Labyrinth',
    '1970s - Navigating a Labyrinth',
    '1980s - Navigating a Labyrinth',
    '1940s - Battle Against an Evil Sorcerer',
    '1950s - Battle Against an Evil Sorcerer',
    '1960s - Battle Against an Evil Sorcerer',
    '1970s - Battle Against an Evil Sorcerer',
    '1980s - Battle Against an Evil Sorcerer',
    '1940s - Flight from a Natural Disaster',
    '1950s - Flight from a Natural Disaster',
    '1960s - Flight from a Natural Disaster',
    '1970s - Flight from a Natural Disaster',
    '1980s - Flight from a Natural Disaster',
    ]

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
    gl.camera.position.z = this.cardParams.height * 2 + this.cardParams.gap * 16;
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
           gl.camera.position.z /= 1.6;
         } else {
           gl.camera.position.z *= 1.6;
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
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = 330;
    const height = 128;

    canvas.width = width;
    canvas.height = height;

    context.font = '20px arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Add text shadow
    context.shadowColor = 'rgba(0, 0, 0, 1)'; // Shadow color with transparency
    context.shadowBlur = 7; // Shadow blur radius
    context.shadowOffsetX = 2; // Horizontal shadow offset
    context.shadowOffsetY = 2; // Vertical shadow offset

    context.fillText(text, width / 2, height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
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