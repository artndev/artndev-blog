import type { AxiosResponse } from 'axios'
import React from 'react'
import { Navigate } from 'react-router-dom'
import config from '../config.json'

const ErrorHandler: React.FC<{ err: AxiosResponse | undefined }> = ({
  err,
}) => {
  return (
    <>
      {err && !config.ACCEPTED_ERR_CODES.includes(err.status) ? (
        <Navigate to={`/errors/${err.status}`} />
      ) : (
        'The page is loading...'
      )}
    </>
  )
}

export default ErrorHandler
