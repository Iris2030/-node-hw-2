const sharp = require('sharp')
const path = require('path')
const fs = require('fs').promises



const uploadImage = async(id,file) =>{
const avatarUrl = path.join('avatars',`${id}${file.originalname}`)
try {
    await sharp(file.path)
    .resize({width:250})
    .toFile(path.join(__dirname,'../public', avatarUrl))   
    return avatarUrl
} catch (error) {
console.log(error);
}finally{
    await fs.unlink(file.path)
}

}

module.exports = uploadImage