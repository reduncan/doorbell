let faceMatcher = null

/**
   * Use capture image from canvas and detect all faces landmark and descriptor.
   * Credits to justadudewhohacks' face-api.js on github.
   */
async function updateResults() {
  if (!isFaceDetectionModelLoaded()) {
    return
  };

  const inputImgEl = $('#default').get(0);

  const options = getFaceDetectorOptions();
  const results = await faceapi
    .detectAllFaces(inputImgEl, options)
    .withFaceLandmarks()
    .withFaceDescriptors();

  drawFaceRecognitionResults(results);
}

/**
   * Draw the all faces landmark and descriptor on overlay.
   * If none matches with default photo, call sendNodeMailer API and display denied.
   * If one matches with default photo, call run servo motor and display approved.
   * 
   * Credits to justadudewhohacks' face-api.js on github.
   */
function drawFaceRecognitionResults(results) {
  const canvas = $('#defaultOverlay').get(0);
  resizedResults = resizeCanvasAndResults($('#default').get(0), canvas, results)
  const boxesWithText = resizedResults.map(({ detection, descriptor }) =>
    new faceapi.BoxWithText(
      detection.box,
      faceMatcher.findBestMatch(descriptor).toString()
    )
  );

  const approvedFaces = boxesWithText.filter(e => e._text.indexOf('unknown') !== 0);
  if ((approvedFaces.length === 0 && boxesWithText.length !== 0) || boxesWithText.length === 0) {
    let canvas2 = $('#default').get(0);
    let imgURL = canvas2.toDataURL();
    const toSend = { imgSrc: `${imgURL}` };
    $.ajax({ url: `/api/sendNodeMailer`, method: "PUT", data: toSend }).then(
      function (e) {}
    );
    $('.lds-ellipsis').hide();
    $('.denied').show();

  } else {
    $.ajax( {url: '/api/servo', method: "GET"});
    $('.lds-ellipsis').hide();
    $('.success').show();
  }

  faceapi.drawDetection(canvas, boxesWithText)

}

/**
   * Load face detection and landmark model, find a match, then process the image.
   * Credits to justadudewhohacks' face-api.js on github.
   */
async function run() {
  await changeFaceDetector(selectedFaceDetector)
  await faceapi.loadFaceLandmarkModel('/')
  await faceapi.loadFaceRecognitionModel('/')

  faceMatcher = await createBbtFaceMatcher(1)

  updateResults()
}



$(document).ready(function () {
  initFaceDetectionControls()
})