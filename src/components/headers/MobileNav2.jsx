import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav2({ menuItems }) {
  const { pathname } = useLocation();
  const seg = (href) => href?.split("/")[1];
  const closeMobile = () => document.body.classList.remove("mobile-menu-visible");

  useEffect(() => { closeMobile(); }, [pathname]);

  const toggleAccordion = (event) => {
    const li = event.currentTarget.closest("li.has-sub");
    if (!li) return;
    const ul = li.querySelector(":scope > ul");
    const isOpen = li.classList.contains("open");

    document.querySelectorAll(".hg-mob-nav > li.has-sub.open").forEach((el) => {
      if (el !== li) {
        el.classList.remove("open");
        const u = el.querySelector(":scope > ul");
        if (u) u.style.maxHeight = "0px";
      }
    });

    if (isOpen) {
      li.classList.remove("open");
      if (ul) ul.style.maxHeight = "0px";
    } else {
      li.classList.add("open");
      if (ul) ul.style.maxHeight = ul.scrollHeight + "px";
    }
  };

  if (!menuItems) return null;

  return (
    <ul className="hg-mob-nav">
      {menuItems.map((item) => {
        const hasSub = !!item.links;
        const active = hasSub
          ? item.links.some((l) => seg(l.href) === seg(pathname))
          : seg(item.href) === seg(pathname);

        return (
          <li
            key={item.title}
            className={["has-sub" ? hasSub : "", active ? "current" : "", hasSub ? "has-sub" : ""].filter(Boolean).join(" ")}
          >
            {hasSub ? (
              <span className="hg-mob-parent" onClick={toggleAccordion}>
                {item.title}
                <i className="fa fa-chevron-down hg-mob-chevron" />
              </span>
            ) : (
              <Link className="hg-mob-link" to={item.href} onClick={closeMobile}>
                {item.title}
              </Link>
            )}

            {hasSub && (
              <ul className="hg-mob-sub">
                {item.links.map((link) => (
                  <li
                    key={link.text}
                    className={seg(link.href) === seg(pathname) ? "current" : ""}
                  >
                    <Link to={link.href} onClick={closeMobile}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}