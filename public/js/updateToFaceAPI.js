let faceMatcher = null

async function updateResults() {
  if (!isFaceDetectionModelLoaded()) {
    return
  }

  const inputImgEl = $('#default').get(0)

  const options = getFaceDetectorOptions()
  const results = await faceapi
    .detectAllFaces(inputImgEl, options)
    .withFaceLandmarks()
    .withFaceDescriptors()

  drawFaceRecognitionResults(results)
}

function drawFaceRecognitionResults(results) {
  const canvas = $('#defaultOverlay').get(0)
  // resize detection and landmarks in case displayed image is smaller than
  // original size
  resizedResults = resizeCanvasAndResults($('#default').get(0), canvas, results)
  const boxesWithText = resizedResults.map(({ detection, descriptor }) =>
    new faceapi.BoxWithText(
      detection.box,
      faceMatcher.findBestMatch(descriptor).toString()
    )
  )

  const approvedFaces = boxesWithText.filter(e => e._text.indexOf('unknown') !== 0
  );
  console.log(approvedFaces.length, boxesWithText.length);
  if ((approvedFaces.length === 0 && boxesWithText.length !== 0) || boxesWithText.length === 0) {
    // $.ajax({ url: "/api/sendNodeMailer", method: "GET" }).then(
    //   function (e) {
    //     console.log('-------get into face-api and trigger sendNodeMailer---------');
    //   }
    // );
    // $('#face').hide();
    // $('.denied').show();
  } else {
    // $('#face').hide();
    // $('.success').show();
  }

  faceapi.drawDetection(canvas, boxesWithText)
}

async function run() {
  // load face detection, face landmark model and face recognition models
  await changeFaceDetector(selectedFaceDetector)
  await faceapi.loadFaceLandmarkModel('/')
  await faceapi.loadFaceRecognitionModel('/')

  // initialize face matcher with 1 reference descriptor per bbt character
  faceMatcher = await createBbtFaceMatcher(1)

  // start processing image
  updateResults()
}

$(document).ready(function () {
  initFaceDetectionControls()
})