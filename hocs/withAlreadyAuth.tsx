import { useAuth } from "components/AuthProvider/hooks";
import { useAlreadyAuth } from "hooks/auth";

const withAlreadyAuth = (WrappedComponent) => {
  return (props) => {
    const [user] = useAuth();
    useAlreadyAuth();
    if (!user) return <WrappedComponent {...props} />;
    return null;
  };
};

export default withAlreadyAuth;
