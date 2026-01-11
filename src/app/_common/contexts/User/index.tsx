'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { TypeUser } from '@/types/domain';
import { getUserData } from '@/utils/user/clientSide';

type UserContextType = ReturnType<typeof getUserData>;

type UserProviderProps = {
  children: ReactNode;
  user: TypeUser | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children, user }: UserProviderProps) => {
  const userData = getUserData(user);
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
};

export { UserProvider, useUser };
