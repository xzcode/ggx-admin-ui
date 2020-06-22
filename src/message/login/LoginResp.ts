import { Message, Type, Field, OneOf } from 'protobufjs/light';

export default class LoginResp extends Message<LoginResp> {
    static readonly ACTION_ID = 'login.resp';

    @Field.d(1, 'bool', 'optional')
    public success: boolean | undefined;

    @Field.d(2, 'int32', 'optional')
    public code: number | undefined;
}
