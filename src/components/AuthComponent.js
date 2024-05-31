import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from 'store/reducers/auth';

const AuthComponent = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const me = async () => {
      await dispatch(getMe());
    };
    if (!isAuth) me();
  }, [dispatch, isAuth]);
  return children;
};

export default AuthComponent;