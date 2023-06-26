import { useSelector } from "react-redux";

const AuthUser = () => {
  const userLogin = useSelector((state) => state.login);
  const { LoggedUser } = userLogin;

  return Object.keys(LoggedUser).length !== 0;
};

export default AuthUser;
