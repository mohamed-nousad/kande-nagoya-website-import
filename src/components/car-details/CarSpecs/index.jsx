import React from "react";

const formatDate = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  if (isNaN(date)) return "-";
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};

const formatNum = (n, suffix = "") => {
  if (n === null || n === undefined || n === "") return "-";
  return `${Number(n).toLocaleString()}${suffix}`;
};

const val = (value) => (!value ? "-" : value);

const NOTES = [
  { text: "*[Registration Year/month] is a registration date in Stock Country.", bold: false },
  { text: "*Chassis No. is provided by the 3rd Party Supplier. The chassis number might be a temporary number so the chassis number can be changed before shipment. In that case, the accurate chassis number will be updated on official documents. KAN-DE has not checked nor verified the authenticity of the information. KAN-DE does not warrant the authenticity of the information.", bold: false },
  { text: "*All accessories, devices, and equipment that do not usually equipped in passenger vehicle will be removed.", bold: false },
  { text: "You need to look up the Import Regulation of your country for this vehicle.", bold: true },
  { text: "The actual dimension, M3 and weight may differ from the above one.", bold: true },
];

export default function CarSpecs({ vehicle }) {
  const SUMMARY = [
    { label: "Mileage", val: formatNum(vehicle?.mileage, " km") },
    { label: "Year", val: formatDate(vehicle?.firstRegistration)},
    { label: "Engine", val: formatNum(vehicle?.engineCode, "cc") },
    { label: "Trans", val: val(vehicle?.transmission) },
    { label: "Fuel", val: val(vehicle?.fuel) },
  ];

  const ROWS = [
    ["Ref No.", val(vehicle?.refNo), "Mileage", formatNum(vehicle?.mileage, " km")],
    ["Chassis No.", val(vehicle?.chassisNo), "Engine Code", val(vehicle?.engineCode)],
    ["Model Code", val(vehicle?.modelCode), "Steering", val(vehicle?.steering)],
    ["Engine Size", formatNum(vehicle?.engineSize, "cc"), "Ext. Color", val(vehicle?.extColor)],
    ["Location", val(vehicle?.location), "Fuel", val(vehicle?.fuel)],
    ["Version/Class", val(vehicle?.versionClass), "Seats", val(vehicle?.seats)],
    ["Drive", val(vehicle?.drive), "Doors", val(vehicle?.doors)],
    ["Transmission", val(vehicle?.transmission), "M3", val(vehicle?.m3)],
    ["Registration year/month", formatDate(vehicle?.firstRegistration), "Dimension", val(vehicle?.dimension)],
    ["Manufacture Year/month", formatDate(vehicle?.manufactureYearMonth), "Weight", val(vehicle?.weight)],
    ["", "", "Max.Cap", val(vehicle?.maxCap)],
    ["", "", "Sub Ref No.", val(vehicle?.subRefNo)],
  ];

  return (
    <div className="cs">
      <div className="cs-head">
        <img src="/assets/images/car-details/icon-svg/icon-specs.svg" alt="" className="cs-head__icon" />
        <span className="cs-head__title">SPECS</span>
        <span className="cs-head__gap"></span>
        <span className="cs-head__loc-label">LOCATION</span>
        <img src="/assets/images/car-details/icon-svg/icon-jap.svg" alt="" className="cs-head__icon" />
        <span className="cs-head__city">{val(vehicle?.origin)}</span>
      </div>

      <div className="cs-summary">
        {SUMMARY.map((s, i) => (
          <div key={i} className="cs-summary__col">
            <span className="cs-summary__label">{s.label}</span>
            <span className="cs-summary__val">{s.val}</span>
          </div>
        ))}
      </div>

      <div className="cs-table-wrap">
        <table className="cs-table">
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={i}>
                <td className="cs-table__lb">{row[0]}</td>
                <td className="cs-table__vl cs-table__vl--sep">{row[1]}</td>
                <td className="cs-table__lb">{row[2]}</td>
                <td className="cs-table__vl">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cs-notes">
        {NOTES.map((n, i) => (
          <p key={i} className={`cs-notes__p${n.bold ? " cs-notes__p--bold" : ""}`}>
            {n.text}
          </p>
        ))}
      </div>
    </div>
  );
}