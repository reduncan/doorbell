const classes = ['ben','ming','robert','weston']

/**
   * Return photos on images folder
   * Credits to justadudewhohacks' face-api.js on github.
   */
function getFaceImageUri(className, idx) {
  return `${className}/${className}${idx}.jpeg`
}

/**
   * Fetch the images folder and compute their descriptors
   * Credits to justadudewhohacks' face-api.js on github.
   */
async function createBbtFaceMatcher(numImagesForTraining = 1) {
  const maxAvailableImagesPerClass = 5
  numImagesForTraining = Math.min(numImagesForTraining, maxAvailableImagesPerClass)
  const labeledFaceDescriptors = await Promise.all(classes.map(
    async className => {
      const descriptors = []
      for (let i = 1; i < (numImagesForTraining + 1); i++) {
        const img = await faceapi.fetchImage(getFaceImageUri(className, i))
        descriptors.push(await faceapi.computeFaceDescriptor(img))
      }

      return new faceapi.LabeledFaceDescriptors(
        className,
        descriptors
      )
    }
  ))

  return new faceapi.FaceMatcher(labeledFaceDescriptors)
}