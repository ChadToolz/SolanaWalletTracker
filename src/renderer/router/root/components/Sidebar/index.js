import { quitApp } from '../../../../utils/electron.js';
import SidebarButton from './button.js';

const Sidebar = () => {
    return (
        <div className="fixed left-14 -ml-14 flex h-full w-14 flex-col overflow-y-auto bg-gray-sidebar">
          <div className="flex flex-1 flex-col items-center py-4">
            <button
              type="button"
              className="mx-auto my-3 cursor-pointer outline-none"
              title="Home"
            >
              <LogoIcon size={Size.SMALL} aria-label="Open Mixcloud" />
            </button>
    
            <SidebarButton
              title="My stats"
              icon={GraphIcon}
            />
          </div>
    
          <div className="px-3 py-4">
            <SidebarButton
                title="Settings"
                icon={GearIcon}
                size={Size.MEDIUM}
            />
    
            <SidebarButton
                title="Quit MXToolKit"
                icon={XCircleIcon}
                size={Size.MEDIUM}
                onClick={() => quitApp()}
            />
          </div>
        </div>
      );
};

export default Sidebar;