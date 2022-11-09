import type * as configTypes from "../types/configTypes";

export const config: configTypes.Config = {
    applicationName: "Uptime Feed - My Server",
    httpPort: 9111,
    ntfy: {
        topic: "serverRestart"
    }
};

export default config;
