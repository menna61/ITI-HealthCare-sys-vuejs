import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dtaqbcmmg", // Replace with your Cloudinary cloud name
  },
  url: {
    secure: true,
  },
});

export default cld;
