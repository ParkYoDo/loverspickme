import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useEffect } from 'react';

const RestrictionPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    Object.keys(user).length ? navigate('/') : navigate(`${pathname}`);
  }, [navigate, pathname, user]);

  return <Outlet />;
};

export default RestrictionPage;
