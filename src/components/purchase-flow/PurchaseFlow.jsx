import {
  PurchaseArrowIcon,
  SearchRedIcon,
  PurchasePaymentIcon,
  PurchaseShipmentIcon,
  PurchaseDeliveryIcon,
} from "../homes/home-11/Icon";

const PurchaseFlow = () => {
  return (
    <section className="purchase-flow-section">
      <h2 className="purchase-flow-title">Purchase Flow</h2>

      <p className="purchase-flow-description">
        Hear from our happy buyers! See real feedback on car quality,
        smooth transactions, and great support. Trust their experiences
        for your next purchase!
      </p>

      <div className="purchase-flow-steps">
        <div className="purchase-step-card purchase-step-card--order">
          <div className="purchase-step-order-layout">
            <div className="purchase-step-order-left">
                 <div className="purchase-order-icon-wrapper">
              <SearchRedIcon className="search-icon" />
            </div>

              <div className="purchase-step-text">
                <span>STEP 1</span>
                <h4>ORDER</h4>
              </div>
            </div>

            <div className="purchase-step-order-right">
             <button
                type="button"
                className="quotation-btn"
              >
                <img
                  src="/assets/images/home-11/icon-svg/email.svg"
                  alt="email"
                />
                Get a free quotation
              </button>

              <span className="purchase-or">OR</span>

              <button
                type="button"
                className="paypal-btn"
              >
                Buy now by Paypal, Wise, Credit Card
              </button>

              <p>
                Receive a quote and
                <br />
                confirm your order
              </p>
            </div>
          </div>
        </div>

        <div className="purchase-step-arrow purchase-step-arrow-1">
          <PurchaseArrowIcon />
        </div>

      <div className="purchase-step-card purchase-step-card--payment purchase-step-card--payment-gap">
        <div className="purchase-payment-layout">
          
          <div className="purchase-payment-left">
        <div className="purchase-order-icon-wrapper">
          <PurchasePaymentIcon className="payment-icon" />
        </div>

        <div className="purchase-step-text">
          <span>STEP 2</span>
          <h4>PAYMENT</h4>
        </div>
      </div>

      <div className="purchase-payment-right">
<div className="payment-card-row">
  <img
    src="/assets/images/home-11/icon-svg/visa.svg"
    alt="visa"
  />

  <div className="payment-card-box">
    <img
      src="/assets/images/home-11/icon-svg/master.svg"
      alt="master"
    />
  </div>

  <div className="payment-american-box">
    <img
      className="payment-american"
      src="/assets/images/home-11/icon-svg/american.svg"
      alt="american"
    />
  </div>
</div>

        <div className="payment-paypal-row">
          <img
            src="/assets/images/home-11/icon-svg/paypal.svg"
            alt="paypal icon"
          />

          <img
            src="/assets/images/home-11/icon-svg/pay.svg"
            alt="pay"
          />
          <img
            src="/assets/images/home-11/icon-svg/pal.svg"
            alt="pal"
          />
        </div>

        <img
          className="payment-bank-transfer"
          src="/assets/images/home-11/icon-svg/bank-transfer.svg"
          alt="bank transfer"
        />
      </div>

        </div>
      </div>

        <div className="purchase-step-arrow purchase-step-arrow-2">
            
          <PurchaseArrowIcon />
        </div>

        <div className="purchase-simple-step purchase-simple-step-3">
            <div className="purchase-order-icon-wrapper">
          <PurchaseShipmentIcon className="shipment-icon" />
          </div>

          <div className="purchase-step-text">
            <span>STEP 3</span>
            <h4>SHIPMENT</h4>
          </div>
        </div>

        <div className="purchase-step-arrow purchase-step-arrow-3">
          <PurchaseArrowIcon />
        </div>

        <div className="purchase-simple-step purchase-simple-step-4">
            <div className="purchase-order-icon-wrapper">
          <PurchaseDeliveryIcon className="delivery-icon" />
        </div>
          <div className="purchase-step-text">
            <span>STEP 4</span>
            <h4>DELIVERY</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseFlow;