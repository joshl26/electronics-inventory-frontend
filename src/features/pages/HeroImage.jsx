import './HeroImage.css';
import background from '../../img/bg.jpg';

function LandingPage() {
  return (
    <div className="hero_image">
      <img alt="" className="background_image" src={background} />
    </div>
  );
}

export default LandingPage;
