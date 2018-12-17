const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'
const MTCNN = 'mtcnn'


let selectedFaceDetector = SSD_MOBILENETV1

// ssd_mobilenetv1 options
let minConfidence = 0.4

// tiny_face_detector options
let inputSize = 512
let scoreThreshold = 0.5

//mtcnn options
let minFaceSize = 20

/**
   * Selecting a 1 of 3 face detector. 
   * Credits to justadudewhohacks' face-api.js on github.
   */
function getFaceDetectorOptions() {
  return selectedFaceDetector === SSD_MOBILENETV1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : (
      selectedFaceDetector === TINY_FACE_DETECTOR
        ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
        : new faceapi.MtcnnOptions({ minFaceSize })
    )
}

function onInputSizeChanged(e) {
  changeInputSize(e.target.value)
  updateResults()
}

/**
   * Call 1 of 3 face detection. 
   * Credits to justadudewhohacks' face-api.js on github.
   */
function getCurrentFaceDetectionNet() {
  if (selectedFaceDetector === SSD_MOBILENETV1) {
    return faceapi.nets.ssdMobilenetv1
  }
  if (selectedFaceDetector === TINY_FACE_DETECTOR) {
    return faceapi.nets.tinyFaceDetector
  }
  if (selectedFaceDetector === MTCNN) {
    return faceapi.nets.mtcnn
  }
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

/**
   * Change 1 of 3 face detection. 
   * Credits to justadudewhohacks' face-api.js on github.
   */
async function changeFaceDetector(detector) {
  ['#ssd_mobilenetv1_controls', '#tiny_face_detector_controls', '#mtcnn_controls']
    .forEach(id => $(id).hide())

  selectedFaceDetector = detector
  const faceDetectorSelect = $('#selectFaceDetector')
  faceDetectorSelect.val(detector)
  faceDetectorSelect.material_select()

  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().load('/')
  }
}

/**
   * Update face detector on selection. 
   * Credits to justadudewhohacks' face-api.js on github.
   */
async function onSelectedFaceDetectorChanged(e) {
  selectedFaceDetector = e.target.value

  await changeFaceDetector(e.target.value)
  updateResults()
}

/**
   * Change face detector value. 
   * Credits to justadudewhohacks' face-api.js on github.
   */
function initFaceDetectionControls() {
  const faceDetectorSelect = $('#selectFaceDetector')
  faceDetectorSelect.val(selectedFaceDetector)
  faceDetectorSelect.on('change', onSelectedFaceDetectorChanged)
  faceDetectorSelect.material_select()

  const inputSizeSelect = $('#inputSize')
  inputSizeSelect.val(inputSize)
  inputSizeSelect.on('change', onInputSizeChanged)
  inputSizeSelect.material_select()
}