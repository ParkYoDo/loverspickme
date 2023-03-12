import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useEffect } from 'react';

const PrivatePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    !Object.keys(user).length && navigate(`/`);
  }, [navigate, user]);

  return <Outlet />;
};

export default PrivatePage;
