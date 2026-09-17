import React from "react";
import SocialIcon from "../SocialIcon";

const links = [
  { icon: "facebook", href: "#" },
  { icon: "linkedin", href: "#", },
  { icon: "instagram", href: "#" },
  { icon: "youtube", href: "#" },
];

export default function FollowUs() {
  return (
    <div className="rsb-follow">
      <h4 className="rsb-follow__title">Follow us on</h4>
      <div className="rsb-follow__icons">
        {links.map((l) => (
          <a key={l.icon} href={l.href} className="rsb-follow__icon" aria-label={l.icon}>
            <SocialIcon className={l.icon} name={l.icon}/>
          </a>
        ))}
      </div>
    </div>
  );
}
