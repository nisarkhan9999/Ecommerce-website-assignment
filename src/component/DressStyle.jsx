import "./DressStyle.css";
import first from "../images/Frame 61 copy.png"
import second from "../images/Frame 62.png"
import fourth from "../images/Frame 64.png"
import third from "../images/Frame 63.png"

const styles = [
  { id: 1, name: "Casual", image: "/images/casual.png" },
  { id: 2, name: "Formal", image: "/images/formal.png" },
  { id: 3, name: "Party", image: "/images/party.png" },
  { id: 4, name: "Gym", image: "/images/gym.png" },
];


   const DressStyle = () => {
  return (
    <div className="ds-wrapper">
      <h2 className="ds-title">Browse by Dress Style</h2>
      <div className="ds-grid">
        <div className="ds-row">
          <div className="ds-card small">
            <img src={first} className="ds-image" />
            {/* <span className="ds-label">Casual</span> */}
          </div>
          <div className="ds-card large">
            <img src={second}alt="Formal" className="ds-image" />
            {/* <span className="ds-label">Formal</span> */}
          </div>
        </div>
        <div className="ds-row">
          <div className="ds-card large">
            <img src={fourth} alt="Party" className="ds-image" />
            {/* <span className="ds-label">Party</span> */}
          </div>
          <div className="ds-card small">
            <img src={third}  alt="Gym" className="ds-image" />
            {/* <span className="ds-label">Gym</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressStyle;