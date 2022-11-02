// eslint-disable-next-line node/no-unpublished-import
import { config } from "../data/config.js";

/*
 * SET UP FALLBACK VALUES
 */

const configFallbackValues = new Map<string, unknown>();

configFallbackValues.set("applicationName", "Uptime Feed");
configFallbackValues.set("httpPort", 9111);
configFallbackValues.set("urlPrefix", "");

/*
 * Set up function overloads
 */

export function getProperty(propertyName: "applicationName"): string;
export function getProperty(propertyName: "httpPort"): number;
export function getProperty(propertyName: "urlPrefix"): string;

export function getProperty(propertyName: string): unknown {
    const propertyNameSplit = propertyName.split(".");

    let currentObject = config;

    for (const propertyNamePiece of propertyNameSplit) {
        if (currentObject[propertyNamePiece]) {
            currentObject = currentObject[propertyNamePiece];
        } else {
            return configFallbackValues.get(propertyName);
        }
    }

    return currentObject;
}
