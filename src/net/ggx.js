import config, { isDevEnv, isTestEnv } from '@/config';

import {
    GGXCoreClient,
    GGXCoreClientConfig,
    AESCodecHandler
} from 'ggx-core-client-ts';

const conf = new GGXCoreClientConfig();
if (isDevEnv() || isTestEnv()) {
    conf.showMessageLog = true;
}
conf.serverUrl = config.serverUrl;
conf.codecHandler = new AESCodecHandler(conf);
const cli = new GGXCoreClient(conf);

export default cli;
