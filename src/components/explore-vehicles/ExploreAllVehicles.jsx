import SeeMoreButton from "../homes/home-11/SeeMoreButton";

const vehicleColumns = [
  ["Ford Cars", "Honda Cars", "Hyundai Cars", "Infiniti Cars", "Jaguar Cars", "Jeep Cars"],
  ["Chrysler Cars", "Citroen Cars", "Cupra Cars", "Dacia Cars", "DS Cars", "Fiat Cars"],
  ["Land Rover Cars", "Lexus Cars", "Mercedes-Benz Cars", "Mazda Cars", "MG Cars", "Kia Cars"],
  ["Abarth Cars", "Romeo Cars", "Audi Cars", "Bentley Cars", "BMW Cars", "Chevrolet Cars"],
  ["Mini Cars", "Mitsubishi Cars", "Nissan Cars", "Peugeot Cars", "Porsche Cars", "Renault Cars"],
];

const ExploreAllVehicles = () => {
  return (
    <section className="explore-vehicles-section">
      <div className="explore-vehicles-header">
        <h2>Explore All Vehicles</h2>

        <SeeMoreButton />
      </div>

     <div className="explore-vehicles-scroll-wrapper">

  <div className="explore-vehicles-tabs">
    <button type="button" className="active">New Cars For Sale</button>
    <button type="button">Used Cars For Sale</button>
    <button type="button">Browse By Type</button>
    <button type="button">Browse By Brand</button>
    <button type="button">In Stock</button>
  </div>

  <div className="explore-vehicles-content">
    {Array.isArray(vehicleColumns) &&
      vehicleColumns.map((column) => (
        <div
          key={column[0]}
          className="explore-vehicles-column"
        >
          {column.map((item) => (
            <a
              key={item}
              href="#"
              className="explore-vehicles-link"
            >
              {item}
            </a>
          ))}
        </div>
      ))}
  </div>

</div>
    </section>
  );
};

export default ExploreAllVehicles;