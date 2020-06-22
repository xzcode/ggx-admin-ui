import { Type, Field } from 'protobufjs';

const LoginReq = new Type('LoginReq').add(
    new Field('username', 1, 'string'),
    new Field('password', 2, 'string')
);

LoginReq.ACTION_ID = 'login.req';

export default LoginReq;
