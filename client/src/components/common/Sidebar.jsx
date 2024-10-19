import MenuItem from "./MenuItem";

const Sidebar = ({ menuItems }) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {menuItems.map((item) => (
          <MenuItem key={item.text} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
