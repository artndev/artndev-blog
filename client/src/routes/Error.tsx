import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'

const Error = () => {
  const navigator = useNavigate()
  const { code } = useParams()

  return (
    <div className="hero__container f-md">
      <div className="hero">
        <div className="hero__group">
          <h1>Sorry! I have not implemented this yet.</h1>
          <div className="hero__info">
            <div>
              You have just got an error with the code{' '}
              <span id="red">{code ? code.substring(0, 3) : '418'}</span>...
            </div>
            <div>Do not worry, whatever happens happens!</div>
          </div>
        </div>
        <Button
          width={'min(200px, 100%)'}
          height={45}
          onClick={() => navigator('/articles')}
          content={'Understood'}
        />
      </div>
    </div>
  )
}

export default Error
