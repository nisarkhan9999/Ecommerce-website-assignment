import "./DressStyle.css";
import first from "../images/Frame 61 copy.png";
import second from "../images/Frame 62.png";
import third from "../images/Frame 63.png";
import fourth from "../images/Frame 64.png";

const DressStyle = () => {
  return (
    <div className="ds-wrapper">
      <h2 className="ds-title">Browse by Dress Style</h2>

      <div className="ds-grid">

        {/* Row 1: Casual + Formal */}
        <div className="ds-row">
          <div className="ds-card ds-small">
            <img src={first} alt="Casual" className="ds-image ds-adjust" />
          </div>

          <div className="ds-card ds-large">
            <img src={second} alt="Formal" className="ds-image ds-center" />
            <span className="ds-label">Formal</span>
          </div>
        </div>

        {/* Row 2: Party + Gym */}
        <div className="ds-row">
          <div className="ds-card ds-large">
            <img src={fourth} alt="Party" className="ds-image ds-center" />
            <span className="ds-label">Party</span>
          </div>

          <div className="ds-card ds-small">
            <img src={third} alt="Gym" className="ds-image ds-adjust" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DressStyle;