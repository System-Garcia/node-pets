import React from 'react';
import "../../styles/homepage.css"

const HomePage = () => {
  return (
    <>
      <header>
        <a className="brand" href="/">PIS</a>
        <nav>
            <a href="/">Community</a>
            <a href="/">Events</a>
            <a href="/">Shop</a>
        </nav>
        <button className="sign">Sign in</button>
        <button className="sign">Sign up</button>
      </header>

      <section className="presentation">
        <div className="titulo-sub">
            <h1>The home of the pets</h1>
            <p>Actually there are <span>98</span> pets connected</p>
        </div>
        <div className="image-container">
            <img src="/img/peito.png" alt="inspirational" />
        </div>
      </section>

      <div id="imageContainer" className="container">
      </div>

      <section className="availables">
        <Card
          frontImg="/img/availables/adoptFront.jpg"
          frontAlt="image showing an union of hands between a future owner of a dog"
          frontTitle="Adopt"
          backTitle="Get a friend"
          backImg="/img/availables/adoptBack.png"
          backAlt="Backpack with a footprint of a new pet"
          backText="A new member of your life"
        />
        <Card
          frontImg="/img/availables/rescueFront.jpg"
          frontAlt="image showing a sad dog"
          frontTitle="Rescue"
          backTitle="Provide support"
          backText="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius harum molestiae iste, nihil doloribus fugiat distinctio ducimus maxime totam nulla fuga odio non aperiam eos?"
        />
        <Card
          frontImg="/img/availables/socializeFront.jpg"
          frontAlt="image showing dogs in the park"
          frontTitle="Socialize"
          backTitle="Connect your pets"
          backText="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius harum molestiae iste, nihil doloribus fugiat distinctio ducimus maxime totam nulla fuga odio non aperiam eos?"
        />
      </section>

      <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
            <div className="hamster__body">
                <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
            </div>
        </div>
        <div className="spoke"></div>
      </div>

      <footer>
      </footer>
    </>
  );
};

const Card = ({ frontImg, frontAlt, frontTitle, backTitle, backImg, backAlt, backText }) => (
  <div className="card">
    <div className="face front">
        <img src={frontImg} alt={frontAlt} />
        <h3>{frontTitle}</h3>
    </div>
    <div className="face back">
        <h3>{backTitle}</h3>
        {backImg && <img src={backImg} alt={backAlt} />}
        <p>{backText}</p>
        <div className="link">
            <a href="#">Details</a>
        </div>
    </div>
  </div>
);

export default HomePage;
