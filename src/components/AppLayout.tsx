// src/components/Layout/AppLayout.tsx
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { type ReactNode, useState } from 'react';
import Sidebar from './Sidebar.tsx';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      {/* 手機版：上方 Header + 展開按鈕 */}
      <Header className="p-0 bg-white sticky top-0 z-10 shadow-sm md:hidden">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="ml-4 text-lg"
        />
      </Header>

      {/* 側邊欄：手機收合 / 桌面固定 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={0}
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        className="bg-white border-r border-gray-200 md:border-r-0"
        width={240}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b hidden md:block">
            <h1 className="text-xl font-bold text-center">My Demo</h1>
          </div>
          <Sidebar />
        </div>
      </Sider>

      {/* 主內容區 */}
      <Layout>
        <Content
          className='overflow-auto'
          style={{
            background: colorBgContainer,
            margin: 0,
            minHeight: 'calc(100vh - 64px)',
            maxHeight: '100vh',
            width: '100%',
          }}
        >
          <div className="bg-white rounded-lg shadow-sm h-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;