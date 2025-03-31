import { Link } from "react-router-dom"
import "../styles/css/Home.css"
import React from 'react'
import Button from "../components/Button.jsx"
import Typewriter from 'typewriter-effect';
import config from "../config.json"


function Home() {
  return (
    <>
        <div className="hero__container">
          <div className="hero">
            <div className="hero__group">
              <h1 className="hero__title">
                <Typewriter
                  options={{
                    strings: config.TYPEWRITER_STRINGS,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <div className="hero__subgroup">
                <div className="hero__subtitle">
                  I just write my thoughts sipping my coffee here...
                </div>
                <div className="hero__desc">
                  Grab some coffee too, mate!
                </div>
              </div>
            </div>
            <Link to={"/articles"} className="a-reset">
              <Button 
                content={"Enjoy yourself"}
                width={200}
                height={45}
              />
            </Link>
          </div>
        </div>
    </>
  )
}

export default Home