import { useAuth } from "components/AuthProvider/hooks";
import { useRequireAuth } from "hooks/auth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user] = useAuth();
    useRequireAuth();
    if (!!user) return <WrappedComponent {...props} />;
    return null;
  };
};

export default withAuth;
