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

export const planData = [
  {
    name: "BASIC",
    price: 19,
    popular: false,
    features: [
      "✅ Unlimited Chats",
      "🤖 1 Bot",
      "💿 50 MB Knowledge base",
      "🔗 Share as Link",
      "🔑 Use your own OpenAI API Key",
    ],
    dataSupport: ["📄 Documents", "🔗 Links"],
  },
  {
    name: "STARTER",
    price: 99,
    popular: true,
    features: [
      "✅ Unlimited Chats",
      "🤖 5 Bots",
      "💿 1 GB Knowledge base",
      "👨 5 Seat",
      "🔗 Share as Link",
      "🧩 Website Embed",
      "🔑 Use your own OpenAI API Key",
    ],
    dataSupport: ["📄 Documents", "🔗 Links", "🧩 Zapier Integration"],
  },
  {
    name: "PRO",
    price: 299,
    popular: false,
    features: [
      "✅ Unlimited Chats",
      "🤖 5 Bots",
      "💿 1 GB Knowledge base",
      "👨 5 Seat",
      "🔗 Share as Link",
      "🧩 Website Embed",
      "🔑 Use your own OpenAI API Key",
    ],
    dataSupport: [
      "📄 Documents",
      "🔗 Links",
      "🧩 Zapier Integration",
      "💿 1 Database Connection",
      "🛠️ 2 External API Integrations",
    ],
  },
];
