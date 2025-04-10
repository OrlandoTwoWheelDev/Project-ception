import { Link } from "react-router-dom";
import '../index.css';

const Home = () => {
  return (
    <>
    <h1 style={{ textAlign: 'center', color: '#ffcc00' }}>Project-Ception</h1>
    <div className="container grid grid-cols-3 gap-4">      
      {[ 
        { href: '/about', title: 'About Me', img: '/images/IMG_4192.jpg', desc: 'On a journey of learning!' },
        { href: '/info', title: 'HVAC Info', img: '/images/HVACsys2.png', desc: "From Maintenance to Repairs." },
        { href: '/demo', title: 'The Demo', img: '/images/hvac2042.webp', desc: 'A few lines about the demo' },
      ].map(({ href, title, img, desc }) => (
        <Link key={href} to={href} className="card flex flex-col items-center">
          <section>
            <h2>{title}</h2>
            <img src={img} alt={title} />
            <p>{desc}</p>
          </section>
        </Link>
      ))}
    </div>
    </>
    
  );
};

export default Home;
