import { Type, Field, MapField } from 'protobufjs';

import CustomData from './CustomData';

const ServiceModel = new Type('ServiceModel')
    .add(new Field('serviceId', 1, 'string', 'optional'))
    .add(new Field('serviceGroupId', 2, 'string', 'optional'))
    .add(new Field('serviceName', 3, 'string', 'optional'))
    .add(new Field('host', 4, 'string', 'optional'))
    .add(new Field('region', 5, 'string', 'optional'))
    .add(new Field('zone', 6, 'string', 'optional'))
    .add(new Field('customData', 7, 'CustomData', 'repeated'));

ServiceModel.add(CustomData);

export default ServiceModel;
