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
  
  // Old way:
  // function uploadImg(ev) {
  //   const CLOUD_NAME = 'insert1'
  //   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  
  //   const formData = new FormData()
  //   // console.log('target', ev.target)
  //   formData.append('file', ev.target.files[0])
  //   // console.log('ev.target.files[0]):', ev.target.files[0])
  //   formData.append('upload_preset', 'insert2')
  //   // console.log('formData:', formData)
  
  //   return fetch(UPLOAD_URL, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // console.log('res', res)
  //       const elImg = document.createElement('img')
  //       elImg.src = res.url
  //       document.body.append(elImg)
  //     })
  //     .catch((err) => console.error(err))
  // }
  