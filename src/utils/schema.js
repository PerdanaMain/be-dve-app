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
}

export default new Schema();
