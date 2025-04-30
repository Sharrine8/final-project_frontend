import "./NothingFound.css";
import nothing_found from "../../assets/not-found.svg";

function NothingFound() {
  return (
    <div className="nothing-found">
      <img
        alt="Nothing Found Icon"
        src={nothing_found}
        className="nothing-found__img"
      />
      <h2 className="nothing-found__title">Nothing found</h2>
      <p className="nothing-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NothingFound;
