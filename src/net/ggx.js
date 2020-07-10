import config from '@/config';

import {
    GGXCoreClient,
    GGXCoreClientConfig,
    AESCodecHandler
} from 'ggx-core-client-ts';

const conf = new GGXCoreClientConfig();
conf.serverUrl = config.serverUrl;
conf.codecHandler = new AESCodecHandler(conf);
const cli = new GGXCoreClient(conf);

export default cli;
