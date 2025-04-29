import cloudinary from '../config/cloudinary.js';
import { UploadApiResponse } from 'cloudinary';

export async function uploadImage(filePath: string): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products',
    });

    return result;
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error);
    throw new Error('No se pudo subir la imagen');
  }
}