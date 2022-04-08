import ImageKit from "imagekit";
import config from "config";

export default new ImageKit({
  publicKey: config.get("imagekitPublicKey"),
  privateKey: config.get("imagekitPrivateKey"),
  urlEndpoint: config.get("imagekitUrlEndpoint"),
});
