import CtaCard from "../../components/homes/home-11/CtaCard";
import ctaData from "../../data/ctaData";

const CtaSection = () => {
  return (
    <section className="cta-section">
      {Array.isArray(ctaData) &&
       ctaData.map((item) => (
        <CtaCard
          key={item.id}
          title={item.title}
          description={item.description}
          buttonText={item.buttonText}
          icon={item.icon}
          variant={item.variant}
        />
      ))}
    </section>
  );
};

export default CtaSection;