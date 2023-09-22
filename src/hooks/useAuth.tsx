import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/types';

interface Props {
  children: ReactNode;
}

function withAuth(WrappedComponent: React.ComponentType<Props>) {
  return function AuthWrapper(props: Props) {
    const router = useRouter();
    const { status } = useSelector((state: RootState) => state.admin)

    useEffect(() => {
      if (status === '') {
        router.push("/admin/login")
      }
    }, []);

    if (status === '') {
      return <></>;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
