import { Field, Message } from 'protobufjs/light';

export default class ServiceInfoModel extends Message<ServiceInfoModel> {
    static readonly ACTION_ID = 'login.resp';

    @Field.d(1, 'string', 'optional')
    public serviceId: string | undefined;

    @Field.d(2, 'string', 'optional')
    public serviceGroupId: string | undefined;

    @Field.d(3, 'string', 'optional')
    public serviceName: string | undefined;

    @Field.d(4, 'string', 'optional')
    public host: string | undefined;

    @Field.d(5, 'string', 'optional')
    public region: string | undefined;

    @Field.d(6, 'string', 'optional')
    public zone: string | undefined;

    @Field.d(7, 'Map', 'optional')
    public customData: Map<string, string> | undefined;
}
