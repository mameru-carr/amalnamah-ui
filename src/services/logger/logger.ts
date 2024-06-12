
import pino from "pino";

const pinoOptions = {
    level: "info",
}

if (import.meta.env.VITE_ENVIRONMENT === "development") {
    // pinoOptions.prettyPrint = true;
}

const logger = pino(pinoOptions);

export default logger;