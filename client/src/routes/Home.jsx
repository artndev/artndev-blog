import { Link, useNavigate } from "react-router-dom"
import "../styles/css/Home.css"
import React from 'react'
import Button from "../components/Button.jsx"
import Typewriter from 'typewriter-effect';
import config from "../config.json"


function Home() {
  const navigator = useNavigate()

  return (
        <div className="hero__container f-md">
          <div className="hero">
            <div className="hero__group">
              <h1>
                <Typewriter
                  options={{
                    strings: config.TYPEWRITER_STRINGS,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <div className="hero__info">
                <div>
                  I just write my thoughts sipping my coffee here...
                </div>
                <div>
                  Grab some coffee too, mate!
                </div>
              </div>
            </div>
            <Button 
              width={"min(200px, 100%)"}
              height={45}
              onClick={() => navigator("/articles")}
              content={"Enjoy yourself"}
            />
          </div>
        </div>
  )
}

export default Home