import { config } from "../data/config.js";
const configFallbackValues = new Map();
configFallbackValues.set("applicationName", "Uptime Feed");
configFallbackValues.set("httpPort", 9111);
configFallbackValues.set("urlPrefix", "");
export function getProperty(propertyName) {
    const propertyNameSplit = propertyName.split(".");
    let currentObject = config;
    for (const propertyNamePiece of propertyNameSplit) {
        if (currentObject[propertyNamePiece]) {
            currentObject = currentObject[propertyNamePiece];
        }
        else {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObject;
}
