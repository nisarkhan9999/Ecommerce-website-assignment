import "./DressStyle.css";

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
            <img src="/images/casual.png" alt="Casual" className="ds-image" />
            <span className="ds-label">Casual</span>
          </div>
          <div className="ds-card large">
            <img src="/images/formal.png" alt="Formal" className="ds-image" />
            <span className="ds-label">Formal</span>
          </div>
        </div>
        <div className="ds-row">
          <div className="ds-card large">
            <img src="/images/party.png" alt="Party" className="ds-image" />
            <span className="ds-label">Party</span>
          </div>
          <div className="ds-card small">
            <img src="/images/gym.png" alt="Gym" className="ds-image" />
            <span className="ds-label">Gym</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressStyle;