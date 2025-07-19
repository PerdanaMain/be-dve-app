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
}

export default new Schema();
