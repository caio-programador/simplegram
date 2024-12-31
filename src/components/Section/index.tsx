import { ReactNode } from 'react'
import styles from './Section.module.css'

type SectionProps = {
  title: string
  children: ReactNode 
}

const Section = ({title, children}: SectionProps) => {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}

export default Section