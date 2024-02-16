import { cloudinary } from '../config/cloudinary.js';

export const uploadImage = async(image) => {
    try {
        const dataUri = `data:${image.mimetype};base64,${image.data.toString('base64')}`;
        const uploadOptions = { folder: "myparking", use_filename: true, resource_type: "auto" };
        return cloudinary.v2.uploader.upload(dataUri,uploadOptions).then((uploadResponse) => {
            return uploadResponse.secure_url
        }).catch((error) => {
            throw new Error(error)
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadImages = async(images) => {
    try {
        let stringImages = []
        await Promise.all(images.map(async (image) => {
            const newImage = await uploadImage(image);
            if (newImage) {
               stringImages.push(newImage); 
            }
        }));
        return stringImages
    } catch (error) {
        throw new Error(error)
    }

}