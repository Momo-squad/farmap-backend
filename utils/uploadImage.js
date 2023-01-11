import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

import dotenv from "dotenv";

import { uuid } from "uuidv4";

dotenv.config();

async function uploadImage(file) {
  try {
    const { BLOB_ACCOUNT, BLOB_KEY, BLOB_CONTAINER } = process.env;

    const sharedKeyCredential = new StorageSharedKeyCredential(
      BLOB_ACCOUNT,
      BLOB_KEY
    );

    const blobServiceClient = new BlobServiceClient(
      `https://${BLOB_ACCOUNT}.blob.core.windows.net`,
      sharedKeyCredential
    );
    const containerClient =
      blobServiceClient.getContainerClient(BLOB_CONTAINER);

    // Create a new blob in the container
    const blobName = uuid();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file to the blob
    const uploadResponse = await blockBlobClient.upload(file.buffer, file.size);

    // Get the URL of the uploaded image
    const imageUrl = blockBlobClient.url;

    return { data: { url: imageUrl } };
  } catch (error) {
    return { success: false, error };
  }
}

export default uploadImage;
