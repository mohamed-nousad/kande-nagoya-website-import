import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetWebUserQuery, useUpdateWebUserMutation } from "@/store/api/webUserApi";
import { useGetFilterOptionsQuery } from "@/store/api/webStockApi";
import { showToast } from "@/utils/toast";
import { setAuthUser } from "@/store/slices/authSlice";

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userId = user?._id;

  const { data: webUser } = useGetWebUserQuery(userId, { skip: !userId });
  const { data: options, isLoading: optionsLoading } = useGetFilterOptionsQuery();
  const [updateWebUser, { isLoading }] = useUpdateWebUserMutation();

  const [agreed, setAgreed] = useState(true);
  const [form, setForm] = useState({
    name: "",email: "", phoneNumber: "",
    country: "", port: "", city: "", address: "",
  });

  const countryOptions = options?.destinationCountry ?? [];
  const portOptions = useMemo(() => {
    if (!form.country || !options?.destinationPortsByCountry) return [];
    return options.destinationPortsByCountry[form.country] ?? [];
  }, [form.country, options]);

  useEffect(() => {
    if (webUser) {
      setForm({
        email: webUser.email || "",
        name: webUser.name || "",
        phoneNumber: webUser.phoneNumber || "",
        country: webUser.country || "",
        port: webUser.port || "",
        city: webUser.city || "",
        address: webUser.address || "",
      });
    }
  }, [webUser]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCountryChange = (e) => {
    const nextCountry = e.target.value;
    const nextPorts = options?.destinationPortsByCountry?.[nextCountry] ?? [];
    setForm((prev) => ({ ...prev, country: nextCountry, port: nextPorts[0] || "" }));
  };

  const handleSubmit = async () => {
    if (!userId) return;
    try {
      const res = await updateWebUser({ id: userId, data: form }).unwrap();
      dispatch(setAuthUser(res.data));
      showToast(res?.message, "success");
    } catch (err) {
      console.error(err);
      showToast(err?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="my-profile">
      <h1 className="my-profile__title">My Profile</h1>
      <div className="my-profile__card">
        <div className="my-profile__form">

          <div className="my-profile__row">
            <label className="my-profile__label">Email <span>*</span></label>
            <input className="my-profile__input" type="email" placeholder="Email Address" value={form.email} disabled />
          </div>

          <div className="my-profile__row">
            <label className="my-profile__label">Name <span>*</span></label>
            <input className="my-profile__input" type="text" placeholder="Your name" value={form.name} onChange={handleChange("name")} />
          </div>

          <div className="my-profile__row">
            <label className="my-profile__label">Phone <span>*</span></label>
            <input className="my-profile__input" type="tel" placeholder="your mobile number" value={form.phoneNumber} onChange={handleChange("phoneNumber")} />
          </div>

          <div className="my-profile__row">
            <label className="my-profile__label">Country <span>*</span></label>
            <div className="my-profile__select-wrap">
              <select
                className="my-profile__select"
                value={form.country}
                onChange={handleCountryChange}
                disabled={optionsLoading}
              >
                <option value="">Select Country</option>
                {countryOptions.map((item) => (
                  <option key={item} value={item}>{item?.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="my-profile__row">
            <label className="my-profile__label">Port <span>*</span></label>
            <div className="my-profile__select-wrap">
              <select
                className="my-profile__select"
                value={form.port}
                onChange={handleChange("port")}
                disabled={optionsLoading || !form.country}
              >
                <option value="">Select Port</option>
                {portOptions.map((item) => (
                  <option key={item} value={item}>{item?.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="my-profile__row">
            <label className="my-profile__label">City <span>*</span></label>
            <input className="my-profile__input" type="text" placeholder="City" value={form.city} onChange={handleChange("city")} />
          </div>

          <div className="my-profile__row">
            <label className="my-profile__label">Address <span>*</span></label>
            <input className="my-profile__input" type="text" placeholder="Address" value={form.address} onChange={handleChange("address")} />
          </div>

          <div className="my-profile__bottom">
            <label className="my-profile__agree">
              <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
              <span className="my-profile__agree-box">
                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="my-profile__agree-text">I agree to receive email newsletters tailored to my preferences from Kan-de.com.jp</span>
            </label>
            <ul className="my-profile__notes">
              <li>Before you tick the check box above, please confirm our <a href="#">Privacy Notice</a></li>
              <li>Kan-de.com.jp does not offer its service to children less than eighteen (18) years of age.</li>
            </ul>
            <button className="my-profile__btn" type="button" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;