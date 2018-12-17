/**
   * resize detections (and landmarks) in case displayed image is smaller than original save
   * Credits to justadudewhohacks' face-api.js on github.
   */
function resizeCanvasAndResults(dimensions, canvas, results) {
  const { width, height } = dimensions instanceof HTMLVideoElement
    ? faceapi.getMediaDimensions(dimensions)
    : dimensions
  canvas.width = width
  canvas.height = height
  return results.map(res => res.forSize(width, height))
}

/**
   * @const resizedDetections the resized detections and landmarks
   * Draw detection.
   * Credits to justadudewhohacks' face-api.js on github.
   */
function drawDetections(dimensions, canvas, detections) {
  const resizedDetections = resizeCanvasAndResults(dimensions, canvas, detections)
  faceapi.drawDetection(canvas, resizedDetections)
}

/**
   * @const resizedResults the resized detections and landmarks
   * Draw landmarks.
   * Credits to justadudewhohacks' face-api.js on github.
   */
function drawLandmarks(dimensions, canvas, results, withBoxes = true) {
  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)

  if (withBoxes) {
    faceapi.drawDetection(canvas, resizedResults.map(det => det.detection))
  }

  const faceLandmarks = resizedResults.map(det => det.landmarks)
  const drawLandmarksOptions = {
    lineWidth: 2,
    drawLines: true,
    color: 'green'
  }
  faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
}