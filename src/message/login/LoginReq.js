import { Type, Field } from 'protobufjs';

const LoginReq = new Type('LoginReq').add(new Field('token', 1, 'string'));

LoginReq.ACTION_ID = 'login.req';

export default LoginReq;
