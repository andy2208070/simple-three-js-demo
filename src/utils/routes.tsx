import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { AppstoreOutlined, CodeOutlined, HomeOutlined } from '@ant-design/icons';

// Lazy load 頁面組件（提升效能）
const Demo1Page = lazy(() => import('../pages/demo1/demo1'));
const Demo2Page = lazy(() => import('../pages/demo2/demo2'));

// 路由配置物件陣列
type MyRouteObject = RouteObject & {
  label?: string; 
  icon?: React.ReactNode;
};

export const routesConfig: MyRouteObject[] = [
  {
    label: 'Home',
    icon: <HomeOutlined />,
    path: '/',
    element: null,
  },
  {
    label: 'Demo 1',
    icon: <AppstoreOutlined /> ,
    path: '/demo1',
    element: <Demo1Page />,
  },
  {
    label: 'Demo 2',
    icon: <CodeOutlined />,
    path: '/demo2',
    element: <Demo2Page />,
  },
];