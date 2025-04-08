import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Project-Ception</h1>
      <Link onClick={() => window.location.href = '/about'}>
        <section>
          <h1>About Me</h1>
          <img src="/images/IMG_4192.jpg" alt="Attic Selfie" />
          <p>On a journey of learning and pushing the boundries of the unknown!</p>
        </section>
      </Link>
      
      <Link onClick={() => window.location.href = '/info'}>
        <section>
          <h1>HVAC Info</h1>
          <img src="/images/HVACsys2.png" alt="Home HVAC System" />
          <p>From Maintenance to Repairs, and Preventitive measures, you'll find all you NEED to know here! </p>
        </section>
      </Link>
      
      <Link onClick={() => window.location.href = '/demo'}>
        <section>
          <h1>The Demo</h1>
          <img src="/images/hvac2042.webp" alt="Rooftop AC systems" />
          <p>A few lines about the demo</p>
        </section>
      </Link>
      
    </div>
  );
};

export default Home;
