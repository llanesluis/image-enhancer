export type AddImageParams = {
  image: AddImage;
  userId: string;
  path: string;
};

export type AddImage = {
  title: string;
  publicId: string;
  transformationType: string;
  width: number;
  height: number;
  config: any;
  secureURL: string;
  transformationURL: string;
  aspectRatio: string | undefined;
  prompt: string | undefined;
  color: string | undefined;
};

export type UpdateImageParams = {
  image: UpdateImage;
  userId: string;
  path: string;
};

export type UpdateImage = {
  _id: string;
  title: string;
  publicId: string;
  transformationType: string;
  width: number;
  height: number;
  config: any;
  secureURL: string;
  transformationURL: string;
  aspectRatio: string | undefined;
  prompt: string | undefined;
  color: string | undefined;
};
