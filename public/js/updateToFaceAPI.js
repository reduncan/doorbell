let faceMatcher = null
    
// async function uploadRefImage(e) {
//   const imgFile = $('#refImgUploadInput').get(0).files[0]
//   const img = await faceapi.bufferToImage(imgFile)
//   $('#refImg').get(0).src = img.src
//   updateReferenceImageResults()
// }

// async function uploadQueryImage(e) {
//   const imgFile2 = $('canvas')
//   const dataURL = imgFile2[0].toDataURL('image/jpeg')
//   const img = await faceapi.bufferToImage(imgFile)
//   updateQueryImageResults()
// }


async function updateReferenceImageResults() {
  const imgEl = $('#refImage').get(0)
  const canvas = $('#refImageOverlay').get(0)

  const fullFaceDescriptions = await faceapi
    .detectAllFaces(imgEl, getFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptors()

  if (!fullFaceDescriptions.length) {
    return
  }

  // create FaceMatcher with automatically assigned labels
  // from the detection results for the reference image
  faceMatcher = new faceapi.FaceMatcher(fullFaceDescriptions)

  // resize detection and landmarks in case displayed image is smaller than
  // original size
  resizedResults = resizeCanvasAndResults(imgEl, canvas, fullFaceDescriptions)
  // draw boxes with the corresponding label as text
  const labels = faceMatcher.labeledDescriptors
    .map(ld => ld.label)
  const boxesWithText = resizedResults
    .map(res => res.detection.box)
    .map((box, i) => new faceapi.BoxWithText(box, labels[i]))
  faceapi.drawDetection(canvas, boxesWithText)
}

async function updateQueryImageResults() {
  if (!faceMatcher) {
    return
  }
  const imgEl = $('#default').get(0)
  const canvas = $('#defaultOverlay').get(0)

  const results = await faceapi
    .detectAllFaces(imgEl, getFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptors()

  // resize detection and landmarks in case displayed image is smaller than
  // original size
  resizedResults = resizeCanvasAndResults(imgEl, canvas, results)
  // draw boxes with the corresponding label as text
  const boxesWithText = resizedResults.map(({ detection, descriptor }) =>
    new faceapi.BoxWithText(
      detection.box,
      // match each face descriptor to the reference descriptor
      // with lowest euclidean distance and display the result as text
      faceMatcher.findBestMatch(descriptor).toString()
    )
  )
  faceapi.drawDetection(canvas, boxesWithText)
}

async function updateResults() {
  await updateReferenceImageResults()
  await updateQueryImageResults()
}

async function run() {
  // load face detection, face landmark model and face recognition models
  await changeFaceDetector(selectedFaceDetector)
  await faceapi.loadFaceLandmarkModel('/')
  await faceapi.loadFaceRecognitionModel('/')
  await updateReferenceImageResults();
}

$(document).ready(function() {
  initFaceDetectionControls()
  run()
})