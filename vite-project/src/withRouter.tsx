import { useLocation, useNavigate } from "react-router-dom";

const withRouter = (Component: any) => {
  const WithRouter = (props: any) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Component
      {...props}
      location={location}
      navigate={navigate}
    />;
  };
  return WithRouter;
};

export default withRouter;