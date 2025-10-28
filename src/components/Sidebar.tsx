import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routesConfig } from '../utils/routes';

const items = routesConfig.map(route => ({
  key: route.path!,
  label: route.label!,
  icon: (route?.icon || undefined)!,
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      className="border-r-0 flex-1"
      style={{
        maxHeight: `calc(100vh - 61px)`,
        overflow: `auto`,
      }}
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={items}
    />
  );
};

export default Sidebar;