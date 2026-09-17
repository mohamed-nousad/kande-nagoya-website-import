import { ICONS } from "../../configs/assetPaths";

const LeftSidebar = ({ activeTab, setActiveTab }) => {
  const myOrders = [
    { key: "inquiries", label: "Inquiries" },
    { key: "invoices", label: "Invoices" },
    { key: "purchase-history", label: "Purchase History" },
  ];

  const myAccount = [
    { key: "account-information", label: "Account Information" },
    { key: "my-deposit", label: "My Deposit" },
    { key: "change-password", label: "Change Password" },
    { key: "whitelist", label: "My Whitelist" },
    { key: "browsing-history", label: "Browsing History" },
  ];

  return (
    <aside className="profile-sidebar">
      <div className="sidebar-group">
        <h3 className="sidebar-heading">My Orders</h3>
        <ul>
          {myOrders.map((item) => (
            <li
              key={item.key}
              className={activeTab === item.key ? "active" : ""}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.label}</span>
              <img src={ICONS.chevronRight} alt="" className="chevron" />
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-group">
        <h3 className="sidebar-heading">My Account</h3>
        <ul>
          {myAccount.map((item) => (
            <li
              key={item.key}
              className={activeTab === item.key ? "active" : ""}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.label}</span>
              <img src="/assets/icons/solid-arrow-right.svg" alt="" className="chevron" />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;