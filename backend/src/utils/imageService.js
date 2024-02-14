import { cloudinary } from '../config/cloudinary.js';

export const uploadImage = async(image) => {
    try {
        const dataUri = `data:${image.mimetype};base64,${image.data.toString('base64')}`;
        const uploadResponse = await cloudinary.uploader.upload(
            dataUri,
            {
                resource_type: "any",
                folder: "myparking",
            },
        );

        return uploadResponse.secure_url
    } catch (error) {
        throw new Error(error)
    }

}