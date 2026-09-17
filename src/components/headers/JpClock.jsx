import { useState, useEffect } from "react";

const JpClock = () => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("ja-JP", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="hg-jp-clock"><i className="fa-clock fa-solid"></i> Japan Time {time}</span>;
};

export default JpClock;