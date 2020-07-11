import ServiceModel from './ServiceModel';

import { Type, Field } from 'protobufjs';

const GetRegistryInfoResp = new Type('GetRegistryInfoResp').add(
    new Field('services', 1, 'ServiceModel', 'repeated')
);
GetRegistryInfoResp.add(ServiceModel);

export default GetRegistryInfoResp;
