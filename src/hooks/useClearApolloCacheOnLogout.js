import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthManager from '../services/AuthManager';

export default function useClearApolloCacheOnLogout() {
  const client = useApolloClient();
  useEffect(() => {
    const unsubscribe = AuthManager.onLogout(() => {
      client.clearStore();
    });
    return () => unsubscribe();
  }, [client]);
}
