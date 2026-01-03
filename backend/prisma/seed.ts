import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const defaultCategories = [
  {
    name: "Food",
    description: "Expenses on food and beverages",
    icon: "🍔",
    color: "#FF6B6B",
  },
  {
    name: "Clothing",
    description: "Expenses on clothing and accessories",
    icon: "👕",
    color: "#4ECDC4",
  },
  {
    name: "Entertainment",
    description: "Expenses on leisure and fun",
    icon: "🎬",
    color: "#95E1D3",
  },
  {
    name: "Debt",
    description: "Debt and loan payments",
    icon: "💳",
    color: "#F38181",
  },
  {
    name: "Transport",
    description: "Expenses on transport and fuel",
    icon: "🚗",
    color: "#AA96DA",
  },
  {
    name: "Health",
    description: "Expenses on health and medicines",
    icon: "🏥",
    color: "#FCBAD3",
  },
  {
    name: "Education",
    description: "Expenses on education and courses",
    icon: "📚",
    color: "#A8E6CF",
  },
  {
    name: "Housing",
    description: "Expenses on rent, bills, and maintenance",
    icon: "🏠",
    color: "#FFD3A5",
  },
  {
    name: "Utilities",
    description: "Water, electricity, internet bills, etc.",
    icon: "💡",
    color: "#FFA07A",
  },
  {
    name: "Others",
    description: "Other miscellaneous expenses",
    icon: "📦",
    color: "#DDA0DD",
  },
  {
    name: "Salary",
    description: "Monthly salary received",
    icon: "💼",
    color: "#00B894",
  },
  {
    name: "Freelance",
    description: "Income from freelance work",
    icon: "🧑‍💻",
    color: "#00CEC9",
  },
  {
    name: "Investments",
    description: "Earnings from investments and applications",
    icon: "📈",
    color: "#6C5CE7",
  },
  {
    name: "Gifts Received",
    description: "Money received as a gift",
    icon: "🎁",
    color: "#FAB1A0",
  },
  {
    name: "Reimbursement",
    description: "Amounts received as reimbursement",
    icon: "🔄",
    color: "#55EFC4",
  },
  {
    name: "Rental Income",
    description: "Income from renting properties",
    icon: "🏠",
    color: "#FF7675",
  },
  {
    name: "Product Sales",
    description: "Revenue from single product sales",
    icon: "🛒",
    color: "#FDCB6E",
  },
  {
    name: "Online Shopping",
    description: "Expenses on online shopping",
    icon: "🛍️",
    color: "#E17055",
  },
  {
    name: "Travel",
    description: "Travel, accommodation, and tourism expenses",
    icon: "✈️",
    color: "#00B8D4",
  },
  {
    name: "Pets",
    description: "Expenses on pets",
    icon: "🐾",
    color: "#B2BEC3",
  },
  {
    name: "Subscriptions",
    description: "Recurring payments for services (Spotify, Netflix, etc)",
    icon: "📺",
    color: "#636E72",
  },
  {
    name: "Clothing",
    description: "Expenses on clothing and accessories",
    icon: "👗",
    color: "#E84393",
  },
  {
    name: "Donations",
    description: "Expenses with donations and charity",
    icon: "🤲",
    color: "#F7B731",
  },
  {
    name: "Car Maintenance",
    description: "Expenses on car repair, inspection and maintenance",
    icon: "🛠️",
    color: "#0984E3",
  },
  {
    name: "Taxes",
    description: "Tax payments",
    icon: "🧾",
    color: "#6D214F",
  },
];

async function main() {
  console.log("🌱 Iniciando seed de categorias...");

  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
    console.log(`✅ Categoria "${category.name}" criada/atualizada`);
  }

  console.log("✨ Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
