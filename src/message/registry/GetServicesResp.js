import ServiceModel from './ServiceModel';

import { Type, Field } from 'protobufjs';

const GetServicesResp = new Type('GetServicesResp').add(
    new Field('services', 1, 'ServiceModel', 'repeated')
);
GetServicesResp.ACTION_ID = 'get.services.resp';
GetServicesResp.add(ServiceModel);

export default GetServicesResp;
