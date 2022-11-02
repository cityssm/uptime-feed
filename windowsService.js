import path from "path";
const __dirname = ".";
export const serviceConfig = {
    name: "Uptime Feed",
    description: "RSS and JSON application startup notifications",
    script: path.join(__dirname, "bin", "www.js")
};
