import { useState } from "react";
import LeftSidebar from "@/components/profile/LeftSidebar";
import BrowsingHistory from "@/components/profile/myAccount/BrowsingHistory";
import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import MetaComponent from "@/components/common/MetaComponent";
import InquiredCars from "@/components/profile/myOrders/InquiredCars";
import { defaultCarImg } from "@/constants";
import MyProfile from "@/components/profile/myAccount/MyProfile";
import { useSearchParams } from "react-router-dom";
import Whitelist from "@/components/profile/myAccount/Whitelist ";

const metadata = {
  title: "kande-nagoya-website",
  description: "kande-nagoya-website",
};

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "inquiries";
  const setActiveTab = (tab) => setSearchParams({ tab });

 const renderContent = () => {
    switch (activeTab) {
      case "inquiries":
        return <InquiredCars defaultImage={defaultCarImg}/>;
      case "account-information":
        return <MyProfile defaultImage={defaultCarImg}/>;
      case "browsing-history":
        return <BrowsingHistory defaultImage={defaultCarImg}/>;
      case "whitelist":
        return <Whitelist defaultImage={defaultCarImg}/>;
      default:
        return <InquiredCars defaultImage={defaultCarImg}/>;
    }
  };
  
  const getBreadcrumbLabel = () => {
    const map = {
      "inquiries": "Inquiries",
      "invoices": "Invoices",
      "purchase-history": "Purchase History",
      "account-information": "Account Information",
      "my-deposit": "My Deposit",
      "change-password": "Change Password",
      "browsing-history": "Browsing History",
      "whitelist": "My Whitelist"
    };
    return map[activeTab] || "";
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header5 />
      <div className="profile-page">
        <div className="profile-layout">
        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="profile-content">
          <div className="breadcrumb">
            <span>Japanese Used Cars TOP</span>
            <span className="separator">›</span>
            <span>My page</span>
            <span className="separator">›</span>
            <span className="current">{getBreadcrumbLabel()}</span>
          </div>
          {renderContent()}
        </div>
        </div>
      </div>
      <Footer1/>
    </>
  );
};

export default Profile;