import { Type, Field } from 'protobufjs';

const LoginReq = new Type('LoginResp')
    .add(new Field('username', 1, 'string', 'optional'))
    .add(new Field('password', 2, 'string', 'optional'));

LoginReq.ACTION_ID = 'login.req';

export default LoginReq;
