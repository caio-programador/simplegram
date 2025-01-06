import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'
import styles from './Input.module.css'

type InputProps = {
  id: string,
  label: string
} & ComponentPropsWithoutRef<'input'>


const Input = forwardRef(({id, label, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={styles.form_group} >
      <label  htmlFor={id}>{label}:</label>
      <input className={props.className} id={id} {...props} ref={ref}/>
    </div>
  )
})

export default Input