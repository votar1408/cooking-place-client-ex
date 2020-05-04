import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

const checkLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem(storageName));

  return {
    initToken: data && data.token ? data.token : null,
    initUserId: data && data.userId ? data.userId : null
  };
};

const useAuth = () => {
  const { initToken, initUserId } = checkLocalStorage();
  const [token, setToken] = useState(initToken);
  const [userId, setUserId] = useState(initUserId);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = checkLocalStorage();

    login(data.initToken, data.initUserId);
  }, [login]);

  return { login, logout, token, userId };
};

export default useAuth;
