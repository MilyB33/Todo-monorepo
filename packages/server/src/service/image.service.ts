import { ListFileOptions, UploadOptions, UploadResponse } from "imagekit/dist/libs/interfaces";
import ImageKitClient from "../clients/ImageKitClient";

class ImageService {
  #client: typeof ImageKitClient = ImageKitClient;

  auth() {
    return this.#client.getAuthenticationParameters();
  }

  async getImages(config: ListFileOptions = {}) {
    try {
      const response = await this.#client.listFiles(config);

      return { data: { images: response }, message: "Images Found" };
    } catch (e) {
      console.log(e);
      throw new Error("Error in fetching images");
    }
  }

  async uploadImage(config: UploadOptions): Promise<UploadResponse | null> {
    try {
      const response = await this.#client.upload({
        overwriteFile: true,
        useUniqueFileName: false,
        ...config,
      });

      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteImage(fileId: string) {
    try {
      const response = await this.#client.deleteFile(fileId);

      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default ImageService;
