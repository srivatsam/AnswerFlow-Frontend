export const APIBACKEND =
  process.env.NODE_ENV == "production"
    ? "http://flask:5000"
    : "http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com";

// export const ChatAPI =
//   process.env.NODE_ENV == "production"
//     ? "http://localhost:5000"
//     : "http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com";
export const userItems = ["profile", "billings", "settings", "logout"];

export const limitPlan: { name: string; datatypes: fileTypeSelected[] }[] = [
  { name: "Basic", datatypes: ["Documents", "Links"] },
  {
    name: "Starter",
    datatypes: ["Documents", "Links", "Database", "Zapier"],
  },
  {
    name: "Pro",
    datatypes: ["Documents", "Links", "Database", "Zapier", "ExternalAPI"],
  },
];
