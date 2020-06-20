import ConfigDev from "./config.dev";
import ConfigTest from "./config.test";
import ConfigProd from "./config.prod";

let exportConfig = ConfigDev;
if (process.env.NODE_ENV === "test") {
    exportConfig = ConfigTest;
} else if (process.env.NODE_ENV === "prod") {
    exportConfig = ConfigProd;
}
export default exportConfig;
