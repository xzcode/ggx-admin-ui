import { Type, Field } from "protobufjs";

const LoginResp = new Type("LoginResp")
  .add(new Field("success", 1, "bool"))
  .add(new Field("code", 2, "int32"));

LoginResp.ACTION_ID = "login.resp";

export default LoginResp;
