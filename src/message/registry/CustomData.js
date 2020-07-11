import { Type, Field } from 'protobufjs';

const CustomData = new Type('CustomData')
    .add(new Field('key', 1, 'string', 'optional'))
    .add(new Field('value', 2, 'string', 'optional'))

export default CustomData;
