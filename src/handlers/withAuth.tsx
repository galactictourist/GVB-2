import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { COOKIES } from '~/utils/constants';

interface Props {
  children: ReactNode
}

function withAuth(WrappedComponent: React.ComponentType<Props>) {
  return function AuthWrapper(props: Props) {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

    const cookies = Cookies.get(COOKIES.JWT)

    if (!cookies) {
      router.replace("/admin/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  }
}

export default withAuth
