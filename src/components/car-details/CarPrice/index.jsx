import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatAmount } from "@/utils/vehicleFormatters";
import { LOGIN_MODAL_ID } from "@/constants/AuthConstant";
import { open } from "@/utils/modal";
import { useCreateWebQueryMutation } from "@/store/api/webStockInquiry";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";
import { showToast } from "@/utils/toast";

export default function CarPrice({ vehicle, onSuccess }) {
  const user = useSelector((state) => state?.auth?.user);
  const [createWebQuery, { isLoading }] = useCreateWebQueryMutation();
  const { data: options, isLoading: optionsLoading } = useGetFilterOptionsQuery();
  const navigate = useNavigate();

  const countryOptions = options?.destinationCountry ?? [];

  const [country, setCountry] = useState("");
  const [port, setPort] = useState("");
  const [cnf, setCnf] = useState("CNF");
  const [form, setForm] = useState({ fn: "", em: "", co: "", p1: "", p2: "" });
  const [ins, setIns] = useState(false);
  const [insp, setInsp] = useState(false);
  const [cert, setCert] = useState(false);
  const [warr, setWarr] = useState(false);
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);
  const [errors, setErrors] = useState({});

  const portOptions = useMemo(() => {
    if (!country || !options?.destinationPortsByCountry) return [];
    return options.destinationPortsByCountry[country] ?? [];
  }, [country, options]);

  useEffect(() => {
    if (!options || country) return;
    const firstCountry = countryOptions[0];
    if (!firstCountry) return;
    setCountry(firstCountry);
    const firstPort = options?.destinationPortsByCountry?.[firstCountry]?.[0] ?? "";
    setPort(firstPort);
  }, [options]);

  useEffect(() => {
    if (!country) return;
    const portStillValid = portOptions.some(
      (item) => item.toLowerCase() === port?.toLowerCase()
    );
    if ((!port || !portStillValid) && portOptions.length > 0) {
      setPort(portOptions[0]);
    }
  }, [portOptions]);

  const handleCountryChange = (e) => {
    const nextCountry = e.target.value;
    setCountry(nextCountry);
    const nextPorts = options?.destinationPortsByCountry?.[nextCountry] ?? [];
    setPort(nextPorts[0] || "");
  };

  const fi = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const price = vehicle?.price ?? 0;
  const discountPrice = vehicle?.discountPrice ?? 0;
  const discount = vehicle?.discount ?? 0;
  const totalPrice = vehicle?.totalPrice ?? 0;
  const rating = vehicle?.rating ?? 0;
  const reviewCount = vehicle?.reviewCount ?? 0;

  const validate = () => {
    const next = {};
    if (!form.fn.trim()) next.fn = "Full name is required";
    if (!form.em.trim()) next.em = "Email is required";
    if (!form.co) next.co = "Country is required";
    if (!form.p1.trim()) next.p1 = "Phone is required";
    if (!t1) next.t1 = "You must accept the Terms of Service";
    return next;
  };

  const handleSubmit = async () => {
    if (!user) {
      open(LOGIN_MODAL_ID);
      return;
    }

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      const res = await createWebQuery({
        price,
        discount,
        discountPrice,
        totalPrice,
        destinationCountry: country,
        destinationPort: port,
        insurance: ins,
        inspection: insp,
        certificate: cert,
        kandeWarranty: warr,

        webUserId: user?._id,
        vehicleId: vehicle?._id,

        webUserDetails: {
          fullName: form.fn,
          email: form.em,
          country: form.co,
          phone: form.p1,
          phone2: form.p2,
          term: cnf,
          policy1: t1,
          policy2: t2,
        },
      }).unwrap();

      showToast(res?.message, "success");
      navigate(`/`)
      onSuccess?.();
    } catch (err) {
      showToast(err?.data?.message || "Failed to submit inquiry", "danger");
      setErrors({
        submit:
          err?.data?.message ||
          "Something went wrong submitting your inquiry. Please try again.",
      });
    }
  };

  return (
    <div className="cp">
      <div className="cp-rating">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fa-solid fa-star cp-rating__star"></i>
        ))}
        <span className="cp-rating__score">{rating}</span>
        <a href="#" className="cp-rating__link">{formatAmount(reviewCount)} Reviews</a>
      </div>

      <div className="cp-price">
        <div className="cp-price__row1">
          <span className="cp-price__label">Car Price</span>
          <span className="cp-price__val">{formatAmount(discountPrice)}</span>
        </div>
        <div className="cp-price__row2">
          <span className="cp-price__badge">3RD PARTY <small>seller</small></span>
          {discountPrice && (
            <div className="cp-price__right">
              <span className="cp-price__off">{discount}% OFF</span>
              <span className="cp-price__orig">{formatAmount(price)}</span>
            </div>
          )}
        </div>
        {discountPrice && (
          <div className="cp-price__row3">
            <span className="cp-price__save">Save&nbsp;&nbsp; {formatAmount(vehicle?.savings)}</span>
          </div>
        )}
      </div>

      <div className="cp-box">
        <div className="cp-calc-head">
          <img src="/assets/images/car-details/icon-svg/icon-cal.svg" alt="" className="cp-calc-head__icon" />
          <span className="cp-calc-head__title">Price Calculator</span>
        </div>

        <div className="cp-field">
          <label className="cp-field__label">Country</label>
          <select
            className="cp-field__select"
            value={country}
            onChange={handleCountryChange}
            disabled={optionsLoading}
          >
            <option value="">Select Country</option>
            {countryOptions.map((c) => (
              <option key={c} value={c}>{c?.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="cp-field">
          <label className="cp-field__label">Port</label>
          <select
            className="cp-field__select"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            disabled={optionsLoading || !country}
          >
            <option value="">Select Port</option>
            {portOptions.map((p) => (
              <option key={p} value={p}>{p?.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="cp-checks">
          <label className="cp-checks__item">
            <input type="checkbox" checked={ins} onChange={(e) => setIns(e.target.checked)} />
            <span>Insurance</span>
          </label>
          <label className="cp-checks__item">
            <input type="checkbox" checked={insp} onChange={(e) => setInsp(e.target.checked)} />
            <span>Inspection</span>
          </label>
          <label className="cp-checks__item">
            <input type="checkbox" checked={cert} onChange={(e) => setCert(e.target.checked)} />
            <span>Certificate</span>
          </label>
          <label className="cp-checks__item">
            <input type="checkbox" checked={warr} onChange={(e) => setWarr(e.target.checked)} />
            <span>Kan-de Warranty</span>
          </label>
        </div>

        <div className="cp-inq-head">
          <span className="cp-inq-head__title">Free Quote / Inquiry</span>
          <span className="cp-inq-head__req"><em>*</em>Required Fields</span>
        </div>

        <div className="cp-form">
          <div className="cp-form__row">
            <span className="cp-form__label">Full Name <em>*</em></span>
            <input className="cp-form__input" type="text" placeholder="Your Name" value={form.fn} onChange={fi("fn")} />
          </div>
          {errors.fn && <small className="cp-field-error">{errors.fn}</small>}

          <div className="cp-form__row">
            <span className="cp-form__label">Email Address <em>*</em></span>
            <input className="cp-form__input" type="email" placeholder="Your Email" value={form.em} onChange={fi("em")} />
          </div>
          {errors.em && <small className="cp-field-error">{errors.em}</small>}

          <div className="cp-form__row">
            <span className="cp-form__label">Country <em>*</em></span>
            <select className="cp-form__select" value={form.co} onChange={fi("co")} disabled={optionsLoading}>
              <option value="">Select Country</option>
              {countryOptions.map((c) => <option key={c} value={c}>{c?.toUpperCase()}</option>)}
            </select>
          </div>
          {errors.co && <small className="cp-field-error">{errors.co}</small>}

          <div className="cp-form__row">
            <span className="cp-form__label">Phone <em>*</em></span>
            <input className="cp-form__input" type="tel" placeholder="Telephone" value={form.p1} onChange={fi("p1")} />
          </div>
          {errors.p1 && <small className="cp-field-error">{errors.p1}</small>}

          <div className="cp-form__row">
            <span className="cp-form__label">Phone 2</span>
            <input className="cp-form__input" type="tel" placeholder="Telephone 2" value={form.p2} onChange={fi("p2")} />
          </div>
        </div>

        <div className="cp-total">
          <div className="cp-total__top">
            <span className="cp-total__label">Total Price</span>
            <span className="cp-total__dest">{cnf} {port}</span>
          </div>
          <div className="cp-total__bottom">
            <select className="cp-total__cnf" value={cnf} onChange={(e) => setCnf(e.target.value)}>
              <option value="CNF">C&amp;F</option>
              <option value="CIF">CIF</option>
              <option value="FOB">FOB</option>
            </select>
            <span className="cp-total__price">{formatAmount(totalPrice)}</span>
          </div>
          <div className="cp-total__line"></div>
        </div>

        <div className="cp-warning">
          <img src="/assets/images/car-details/icon-svg/icon-warning.svg" className="cp-warning__icon" alt="" />
          <span>This Field is Required for Inquiry</span>
        </div>

        <div className="cp-terms">
          <label className="cp-terms__row">
            <input type="checkbox" checked={t1} onChange={(e) => setT1(e.target.checked)} />
            <span>
              I agree to Kan-de.co.jp&apos;s{" "}
              <Link to="/terms">Terms of Service</Link> and{" "}
              <Link to="/privacy">confirm Privacy Notice</Link> <span className="text-danger">*Required</span>
            </span>
          </label>
          {errors.t1 && <small className="cp-field-error">{errors.t1}</small>}

          <label className="cp-terms__row">
            <input type="checkbox" checked={t2} onChange={(e) => setT2(e.target.checked)} />
            <span>I agree to receive email newsletters tailored to my preference from Kan-de.com.jp</span>
          </label>
        </div>

        {errors.submit && <div className="cp-error">{errors.submit}</div>}

        <button className="cp-submit" type="button" onClick={handleSubmit} disabled={isLoading}>
          <img src="/assets/images/car-details/icon-svg/icon-msg.svg" alt="" className="cp-submit__icon" />
          {isLoading ? "SUBMITTING..." : "FREE INQUIRY"}
        </button>

        <ul className="cp-notes">
          <li>Kan-de.com.jp does not offer its service to children less than eighteen (18) years of age.</li>
          <li>You can withdraw your consent from the link embedded in each of the email newsletters Kan-de will send to you based on your consent.</li>
          <li>Vehicle information may differ from the actual availability. In case of any discrepancies, our sales staff will contact you to confirm the latest status before finalizing your order.</li>
        </ul>
      </div>
    </div>
  );
}