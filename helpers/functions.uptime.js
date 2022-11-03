import { internalIpV4Sync } from "internal-ip";
export const startupMillis = Date.now();
export const ipAddress = internalIpV4Sync();
