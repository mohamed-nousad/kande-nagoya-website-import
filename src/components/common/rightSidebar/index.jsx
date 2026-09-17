import React from "react";
import SatisfactionRate from "./SatisfactionRate";
import CreateAccount from "./CreateAccount";
import LocalInformation from "./LocalInformation";
import FollowUs from "./FollowUs";
import Cta from "./Cta";
import Cta2 from "./Cta2";

export { SatisfactionRate, CreateAccount, LocalInformation, FollowUs, Cta, Cta2 };

export default function RightSidebar({ showCta = true }) {
  return (
    <aside className="rsb">
      <SatisfactionRate />
      <CreateAccount />
      <LocalInformation />
      <FollowUs />

      {showCta && (
        <div className="rsb-cta">
          <Cta />
          <Cta2 />
        </div>
      )}
    </aside>
  );
}

