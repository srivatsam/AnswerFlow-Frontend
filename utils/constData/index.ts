export const APIBACKEND =
  process.env.NODE_ENV == "production"
    ? "http://flask:5000"
    : "http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com";
