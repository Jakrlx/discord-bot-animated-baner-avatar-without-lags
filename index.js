const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {
  console.log("Bot logged in!");

  // ===== AVATAR =====
  if (fs.existsSync("./logo.gif")) {
    try {
      const avatar = fs.readFileSync("./logo.gif");
      await client.user.setAvatar(avatar);
      console.log("✅ Avatar changed successfully!");
    } catch (err) {
      console.error("❌ Avatar error:", err);
    }
  } else {
    console.log("⚠️ logo.gif not found");
  }

  // ===== BANNER =====
  if (fs.existsSync("./banner.gif")) {
    try {
      const banner = fs.readFileSync("./banner.gif");

      const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

      await rest.patch(Routes.user(), {
        body: {
          banner: `data:image/gif;base64,${banner.toString("base64")}`,
        },
      });

      console.log("✅ Banner changed successfully!");
    } catch (err) {
      console.error("❌ Banner error:", err);
    }
  } else {
    console.log("⚠️ banner.gif not found");
  }

  process.exit(0);
});

client.login(process.env.TOKEN);
