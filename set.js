const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0JtamI5SkpJMURHNkJTYkJsYUVFbmZjellibStCN0wwYUptK2lvbEZrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWlIelFEM1BhU2JKa3E0L2djWWpSZm1rUjdROVdFSkpoSkRueWg3RUpTbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJUHlNY3E4c0ljL21zVzJWdFNLTlppSU5qMVFvbnpaN3JDRjRKckhYVjFnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTW5vRG9DckpFMkdBb2trRTBnL29aUzM3WWN3TVJNM3RCVTFZTlRseUVZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitNOEsxMUQxUEhBVDRUQVV1TmR5cDl5VnhnajVFZlpHM0pDMFZrMDZTM3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9tYXdvRzN6RjFOTjRVYW12a3hRRENrQlVTTkFOU2tnZXpOVDlic2JVeFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0dyeFFXT0RRTmJwSUQ2VGY4K29OOXRmUXJYZHNnNXI2SWx4c0RCS3Yzbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGNwZzJsVWcyc2Yra05iT2pNYUw1OXBrdzhBZTE2K2ZJMHBFYWh4OWlrWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVhMHBzb0VsOUtLQmlERllPbE51MWI2K3h3WG5vZnpXa0YxSUNNTGpyMERJd2FjN3czVUpyUkYyM2NjQnUwbWYxS3J6Sm5xRGYxNzc4dXBMN1c1SWdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiJFR3QrU0NncUw2cVhWNnJLMkY2UHNDQ3hPcHZLaVNEUHkxdHh3UGlQM2JNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyMzgzNTcxMDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE0ODEzNkZDRTI2Q0RFMjA2OTcxM0EzRUEyNTFBQUE5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgyNDYxMjh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIyMzgzNTcxMDA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU5QTU0NDNGNUE5M0RGMUY4OUM0NDI3QzAyOEE0RkREIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjgyNDYxMjl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IldxbXNMSkFhUTJlOEFYZU5BbXpOenciLCJwaG9uZUlkIjoiYTkyNWU0Y2YtMGRjMy00MWU1LTgxYTQtM2E3Mjc1OTM1NTQ2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCa1pJVWRtZ1gvMm4wQjV0eTRBdEpTNjFSZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPbmp1cnhkbklxOVVwcWwzYm03MEdPSVpkZ2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR05HNTZHOUciLCJsYXN0UHJvcEhhc2giOiIyWk42aXYiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlBZz09In0sIm1lIjp7ImlkIjoiMjIzODM1NzEwMDg6MTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2VvvCdlop58J2WifCdlpTwnZaaIPCdlb7wnZaZ8J2WhvCdlpfwnZaQIiwibGlkIjoiMTA2MDk0MzMyNDk3OTY0OjEyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTNleThVQkVPZmlpN2dHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVEpUTjVtWFJSeFBDa01YaGlaODVGS0xpTm5WbzhXZWtJUlMzZDFsZDhsMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoicGFpQlE2dHl3WXg0ZS81K3k4eFB3TnJIelNmWXRvZExURkJ1SThORTkwRGErQ3YvTldsdllHUGk4bWZKZ29QYmNEZmhsay9rRG11OEFtNk5FQW9zQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IkRXUUkwc3ZJOEdBaHhIZldXL2lGdFdSYlE0Ry8rd2lmT1Z3blVWY3dMK3IzRi9GbUZTdVIrQWdwR2FpTTFac0tBelVSbXBYUHhvc3pwZkVERFNZMmdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIzODM1NzEwMDg6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVXlVemVabDBVY1R3cERGNFltZk9SU2k0aloxYVBGbnBDRVV0M2RaWGZKZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyODI0NjEyMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOQkcifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE, ♤
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,  83571008            
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,

    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
