import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <a class="brand" href="">PIS</a>
        <nav>
            <a href="">Community</a>
            <a href="">Events</a>
            <a href="">Shop</a>
        </nav>
        
        {/* <!-- <button class="button" style="vertical-align:middle"><span>Download</span></button> --> */}
        <button class="sign">Sign in</button>
        <button class="sign">Sign up</button>
    </header>

    <section class="presentation">
        <div class="titulo-sub">
            <h1>The home of the pets</h1>
            <p>Actually there are <span>98</span> pets connected</p>
        </div>
        <div class="image-container">
            <img src="/img/peito.png" alt="inspirational"></img>
        </div>
    </section>

    <div id="imageContainer" class="container">
    </div>
    

    <section class="availables">

        <div class="card">
            <div class="face front">
                <img src="/img/availables/adoptFront.jpg" alt="image showing an union of hands between a future owner of a dog"></img>
                <h3>Adopt</h3>
            </div>
            <div class="face back">
                <h3>Get a friend</h3>
                <img src="/img/availables/adoptBack.png" alt="Backpack with a footprint of a new pet"></img>
                <p>A new member of your life</p>
                <div class="link">
                    <a href="#">Details</a>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="face front">
                <img src="/img/availables/rescueFront.jpg" alt="image showing a sad dog"></img>
                <h3>Rescue</h3>
            </div>
            <div class="face back">
                <h3>Provide support</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius harum molestiae iste, nihil doloribus fugiat distinctio ducimus maxime totam nulla fuga odio non aperiam eos?</p>
                <div class="link">
                    <a href="#">Details</a>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="face front">
                <img src="/img/availables/socializeFront.jpg" alt="image showing dogs in the park"></img>
                <h3>Socialize</h3>
            </div>
            <div class="face back">
                <h3>Connect your pets</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius harum molestiae iste, nihil doloribus fugiat distinctio ducimus maxime totam nulla fuga odio non aperiam eos?</p>
                <div class="link">
                    <a href="#">Details</a>
                </div>
            </div>
        </div>
    </section>

    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
        <div class="wheel"></div>
        <div class="hamster">
            <div class="hamster__body">
                <div class="hamster__head">
                    <div class="hamster__ear"></div>
                    <div class="hamster__eye"></div>
                    <div class="hamster__nose"></div>
                </div>
                <div class="hamster__limb hamster__limb--fr"></div>
                <div class="hamster__limb hamster__limb--fl"></div>
                <div class="hamster__limb hamster__limb--br"></div>
                <div class="hamster__limb hamster__limb--bl"></div>
                <div class="hamster__tail"></div>
            </div>
        </div>
        <div class="spoke"></div>
    </div>
    

    
        
    <footer>
        
    </footer>
    </>
  )
}

export default App
