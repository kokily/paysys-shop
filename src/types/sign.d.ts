interface UploadType {
  name: string;
  type: string;
}

interface S3FileType {
  file: Buffer;
  fileName: string;
  type: string;
}

interface S3ParamsType {
  Bucket: string;
  Body: Buffer;
  Key: string;
  ContentType: string;
}

interface S3ReturnType {
  target: string;
}

interface AddSignPayload {
  weddingId: string;
  sex: string;
  image: string;
}

interface RemoveSignPayload {
  sex: string;
}
