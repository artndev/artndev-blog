import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import Button from '../components/Button'
import config from '../config.json'

const Home = () => {
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
            <div>I just write my thoughts sipping my coffee here...</div>
            <div>Grab some coffee too, mate!</div>
          </div>
        </div>
        <Button
          width={'min(200px, 100%)'}
          height={45}
          onClick={() => navigator('/articles')}
          content={'Enjoy yourself'}
        />
      </div>
    </div>
  )
}

export default Home
