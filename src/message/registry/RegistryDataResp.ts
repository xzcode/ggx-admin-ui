import { Field, Message } from 'protobufjs/light';
import ServiceInfoModel from './ServiceInfoModel';

export default class RegistryDataResp extends Message<RegistryDataResp> {
    static readonly ACTION_ID = 'registry.data.resp';

    @Field.d(1, 'ServiceInfoModel', 'optional')
    public serviceInfos: ServiceInfoModel[] | undefined;

}
