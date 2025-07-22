import * as Yup from "yup";

class Schema {
  registerSchema = () => {
    return Yup.object({
      fullname: Yup.string().required("fullname is required!"),
      username: Yup.string().required("username is required!"),
      password: Yup.string().required("password is required!"),
      confirmPassword: Yup.string()
        .required("password is required!")
        .oneOf([Yup.ref("password")], "password not match!"),
    });
  };

  loginSchema = () => {
    return Yup.object({
      username: Yup.string().required("username is required!"),
      password: Yup.string().required("password is required!"),
    });
  };

  userActivationSchema = () => {
    return Yup.object({
      id: Yup.string()
        .required("id is required!")
        .uuid("id must be a valid UUID!"),
      activate: Yup.boolean().required(),
    });
  };

  createEquipmentSchema = () => {
    return Yup.object({
      hostname: Yup.string().required("hostname is required!").min(6),
      type: Yup.string().required("type is required!"),
      brand: Yup.string().required("brand is required!"),
      serialnumber: Yup.string().required("serial number is required!"),
      function: Yup.string()
        .required("function is required!")
        .oneOf(
          ["SERVER", "SWITCH", "FIREWALL", "GGSN", "DISCOVERY"],
          "type must be one of: SERVER, SWITCH, FIREWALL"
        ),
      category: Yup.string()
        .required("category is required!")
        .oneOf(
          ["SERVER", "SWITCH", "FIREWALL", "GGSN", "DISCOVERY"],
          "type must be one of: SERVER, SWITCH, FIREWALL"
        ),
      group: Yup.string()
        .required("group is required!")
        .oneOf(["CORE", "IN", "IT"], "type must be one of: CORE, IN, IT"),
    });
  };
}

export default new Schema();
