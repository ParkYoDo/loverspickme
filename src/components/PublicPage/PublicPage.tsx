import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useEffect } from 'react';

const PublicPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    !Object.keys(user).length && navigate(`${pathname}`);
  }, []);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default PublicPage;
