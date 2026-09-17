import SeeMoreButton from "../home/SeeMoreButton";

const popularModels = [
  [
    "Toyota Hiace Van",
    "Toyota Vitz",
    "Toyota RAV4",
    "Toyota Harrier",
    "Toyota IST",
  ],
  [
    "Toyota Noah",
    "Toyota Passo",
    "Toyota Allion",
    "Toyota Wish",
    "Toyota Premio",
  ],
  [
    "Toyota Probox Van",
    "Toyota Land Cruiser Prado",
    "Toyota Corolla Spacia",
    "Toyota Raum",
    "Toyota Townace Noah",
  ],
  [
    "Toyota Voxy",
    "Toyota Carina",
    "Toyota Sienta",
    "Toyota Liteace Noah",
    "Toyota Corolla Sedan",
  ],
  [
    "Toyota RunX",
    "Toyota Cross",
    "Toyota Camry",
    "Toyota CH-R",
    "Toyota Yaris",
  ],
];

const popularTypes = [
  [
    "Toyota Mini Van",
    "Toyota SUV",
    "Toyota Hatchback",
  ],
  [
    "Toyota Van",
    "Toyota Pick up",
    "Toyota Wagon",
  ],
  [
    "Toyota Truck",
    "Toyota Convertibles",
    "Toyota Sedan",
  ],
  [
    "Toyota Mini Vehicle",
    "Toyota Unspecified",
    "Toyota Coupe",
  ],
  [
    "Toyota Bus",
    "Toyota Mini Bus",
  ],
];

const stockCountries = [
  ["Japan", "Taiwan"],
  ["Korea", "Australia"],
  ["Thailand", "Belgium"],
  ["UAE", "United Kingdom"],
  ["Singapore", "Republic of South Africa"],
];

const ExploreToyotaModels = () => {
  return (
    
    <section className="explore-toyota-models">
      <div className="explore-toyota-models__header">
        <h2>Explore All Toyota Models</h2>

        <SeeMoreButton />
      </div>
      <div className="explore-toyota-models__scroll-wrapper">
      <div className="explore-toyota-models__section">
        <h3>Toyota Most Popular Models</h3>

        <div className="explore-toyota-models__line" />

        <div className="explore-toyota-models__grid">
          {popularModels.map((column) => (
            <div key={column[0]}>
              {column.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="explore-toyota-models__link"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="explore-toyota-models__section">
        <h3>Toyota Most Popular Types</h3>

        <div className="explore-toyota-models__line" />

        <div className="explore-toyota-models__grid">
          {popularTypes.map((column) => (
            <div key={column[0]}>
              {column.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="explore-toyota-models__link"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="explore-toyota-models__section">
        <h3>Most Popular Stock Country</h3>

        <div className="explore-toyota-models__line" />

        <div className="explore-toyota-models__grid">
          {stockCountries.map((column) => (
            <div key={column[0]}>
              {column.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="explore-toyota-models__link"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreToyotaModels;