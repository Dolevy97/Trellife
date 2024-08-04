export const cloudinaryService = {
  uploadImg
}

async function uploadImg(img) {
  const CLOUD_NAME = import.meta.env.CLOUD_NAME || 'dw5vg4xiv'
  const UPLOAD_PRESET = 'trellife_uploads'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  FORM_DATA.append('file', img)
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)


  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })
    const { url } = await res.json()
    return url
  } catch (err) {
    console.error(err)
    throw err
  }
}