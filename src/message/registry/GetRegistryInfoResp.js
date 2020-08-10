import ServiceDataModel from './ServiceDataModel';

import { Type, Field } from 'protobufjs';

const GetRegistryInfoResp = new Type('GetRegistryInfoResp').add(
    new Field('services', 1, 'ServiceDataModel', 'repeated')
);
GetRegistryInfoResp.add(ServiceDataModel);

export default GetRegistryInfoResp;
