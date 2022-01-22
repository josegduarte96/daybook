import axios from 'axios'


const uploadImage = async (file) => {
    
    if(!file) return 

    const formData = new FormData()
    formData.append('upload_preset', 'curso-vue')
    formData.append('file', file)

    const url = 'https://api.cloudinary.com/v1_1/dgzfzkz0i/image/upload'

    const {data} = await axios.post(url, formData)

    return data.url
}

export default uploadImage