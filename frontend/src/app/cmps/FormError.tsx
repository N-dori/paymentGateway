import React from 'react'

import { FormErrorProps } from '@/types/FormError';

export const FormError = ({ errors }: FormErrorProps) => {
  if(!errors?.length) return null;
  return (
    <div className="form-error-container">
     
      { errors.map(err => {
        return (
          <p className='error-txt' key={err}>
            {err}
          </p>
        )
      })}
    </div>
  )
}