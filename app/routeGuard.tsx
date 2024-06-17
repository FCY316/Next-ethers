import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
/**
    * @description: 路由守卫
    * @return {*} 
    */
const RouteGuard = (children: ReactNode) => {
    // 路由跳转
    const router = useRouter();
    // 获取路由信息
    const pathname = usePathname();
    // 这里根据实际情况设置认证逻辑
    const isAuthenticated = true;

    useEffect(() => {
        if (typeof window !== 'undefined') { // 确保在客户端环境中执行
            if (!isAuthenticated && pathname !== '/login') {
                router.replace('/login'); // 未认证用户重定向到登录页
            }
        }
    }, [isAuthenticated, pathname, router]);
    return children;
};

export default RouteGuard;
