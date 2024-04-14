  import React from 'react';
  import { useNavigate, Link } from 'react-router-dom';
  import styles from '../../styles/pages/homepageL.module.css';
  import { Card, cardsData } from '../molecules/Card';
import HamsterWheel from '../atoms/HamsterWheel';

  const HomePageLog = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
      navigate('/login');
    };

    const handleSignUpClick = () => {
      navigate('/signup');
    };
    
    return (
      <>
        <header className={styles.header}>
          <Link className={styles.brand} to="/">PIS</Link>
          <nav>
              <Link className={styles.navLink} to="/">Community</Link>
              <Link className={styles.navLink} to="/">Events</Link>
              <Link className={styles.navLink} to="/">Shop</Link>
          </nav>
          <div className={styles.signContainer}>
            <button className={styles.sign} onClick={handleSignInClick}>Sign in</button>
            <button className={styles.sign} onClick={handleSignUpClick}>Sign up</button>
          </div>
        </header>
        <div className={styles.wrapper}>
          <section className={styles.presentation}>
            <div className={styles.tituloSub}>
                <h1 className={styles.tituloSubH1}>The home of the pets</h1>
                <p className={styles.tituloSubP}>
                  Actually there are <span className={styles.tituloSubPSpan}>98</span> pets connected
                </p>
            </div>
          </section>

          <div className={styles.imageContainer} >
                <img className={styles.imageContainerImg} src="/img/homepage/peito.png" alt="inspirational" />
            </div>

          <section className={styles.availables}>
          {cardsData.map((card, index) => (
            <Card
              key={index}
              imageFront={card.imageFront}
              imageBack={card.imageBack}
              title={card.title}
              description={card.description}
              link={card.link}
            />
           ))}
          </section>
          <div className="hamsterWheelContainer">
           <HamsterWheel/>
      </div>
          <div className={styles.dashboardLinkContainer}>
        <Link to="/dashboard" className={styles.dashboardLink}>Go to Dashboard</Link>
      </div>
      </div>
      </>
    );
  };

  export default HomePageLog;
