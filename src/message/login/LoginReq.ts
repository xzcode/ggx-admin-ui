import { Message, Type, Field, OneOf } from 'protobufjs/light';

export default class LoginReq extends Message<LoginReq> {
    static readonly ACTION_ID = 'login.req';

    @Field.d(1, 'string', 'optional')
    public username: string | undefined;

    @Field.d(2, 'string', 'optional')
    public password: string | undefined;
}
