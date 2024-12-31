import { MdOutlineEventAvailable, MdOutlineSecurity } from 'react-icons/md'

import styles from './About.module.css'
import { GiLibertyWing } from 'react-icons/gi'
import Section from '../../components/Section'

const About = () => {
  return (
    <div className={styles.about}>
      <Section title='Quem somos?'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Ut elementum lacinia turpis at eleifend. Nulla facilisi.
        Donec in turpis vitae ligula fermentum ultrices. Nulla facilisi.
        Quisque neque velit, maximus non cursus sit amet, pulvinar vel dolor.
        Nam ut porta orci. Suspendisse dignissim ipsum sed purus auctor viverra.
        Proin a dolor in ligula euismod dapibus condimentum id enim. 
        Nunc massa dui, venenatis ut fringilla in, ultrices sit amet massa.
        Nunc vulputate in enim eget mollis. Aliquam id dolor non nunc scelerisque elementum.
        Ut quam erat, congue lobortis massa non, elementum posuere eros. Ut quis maximus sapien. 
        Suspendisse potenti. Sed vel rutrum turpis, ut gravida diam. Morbi quis purus a felis vestibulum rhoncus.
      </Section>

      <Section title='De onde surgimos?'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Ut elementum lacinia turpis at eleifend. Nulla facilisi.
        Donec in turpis vitae ligula fermentum ultrices. Nulla facilisi.
        Quisque neque velit, maximus non cursus sit amet, pulvinar vel dolor.
        Nam ut porta orci. Suspendisse dignissim ipsum sed purus auctor viverra.
        Proin a dolor in ligula euismod dapibus condimentum id enim. 
        Nunc massa dui, venenatis ut fringilla in, ultrices sit amet massa.
        Nunc vulputate in enim eget mollis. Aliquam id dolor non nunc scelerisque elementum.
        Ut quam erat, congue lobortis massa non, elementum posuere eros. Ut quis maximus sapien. 
        Suspendisse potenti. Sed vel rutrum turpis, ut gravida diam. Morbi quis purus a felis vestibulum rhoncus.
      </Section>

      <div className={styles.values}>
        <h2>Nossos valores:</h2>
        <div className={styles.box_values}>
          <div className={styles.value}>
            <MdOutlineSecurity data-testid="security-icon" />
            <h3>Segurança</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className={styles.value}>
            <MdOutlineEventAvailable data-testid="event-icon" />
            <h3>Disponibilidade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className={styles.value}>
            <GiLibertyWing data-testid="liberty-icon" />
            <h3>Liberdade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About