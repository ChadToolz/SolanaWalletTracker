import { Outlet } from '@tanstack/react-router';
import Sidebar from '../components/Sidebar/index.js';

const Layout = () => {
    return (
        <div className="flex h-full overflow-y-auto flex-col pl-14">
            <Sidebar />
            <Outlet />
        </div>
    )
};

export default Layout;