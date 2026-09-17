import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav2({ menuItems }) {
  const { pathname } = useLocation();
  const seg = (href) => href?.split("/")[1];

  if (!menuItems) return null;

  return (
    <>
      {menuItems.map((item) => {
        const hasSub = !!item.links;
        const active = hasSub
          ? item.links.some((l) => seg(l.href) === seg(pathname))
          : seg(item.href) === seg(pathname);

        return (
          <li
            key={item.title}
            className={["hg-nav-item", hasSub ? "has-sub" : "", active ? "current" : ""].filter(Boolean).join(" ")}
          >
            {hasSub ? (
              <span className="hg-nav-link hg-nav-parent">
                {item.title}
                <i className="fa fa-chevron-down hg-nav-chevron" />
              </span>
            ) : (
              <Link className="hg-nav-link" to={item.href}>{item.title}</Link>
            )}

            {hasSub && (
              <ul className="hg-nav-sub">
                {item.links.map((link) => (
                  <li
                    key={link.text}
                    className={seg(link.href) === seg(pathname) ? "current" : ""}
                  >
                    <Link to={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}