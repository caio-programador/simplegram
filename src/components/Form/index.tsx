import { useForm } from 'react-hook-form'
import IPost from '../../interfaces/Post'
import Input from '../Input'
import styles from './Form.module.css'
import isImageLink from './utils/isImageLink'

type FormProps = {
  handleForm: (data: IPost) => void,
  isPending: boolean
}

const Form = ({handleForm, isPending}: FormProps) => {
  const {register, handleSubmit, formState: {errors}} = useForm<IPost>()

 
  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Input style={errors.title && {borderBottomColor: '#c52722', color: '#c52722'}}
          id='title' 
          label='Título' 
          placeholder='Título do seu post...' 
          type='text'
          {...register("title", 
            {required: "O título é obrigatório",
             maxLength: {value: 100, message: "O título só pode ter no máximo 100 caracteres"}, 
             minLength: {value: 3, message: "O título precisa ter no mínimo 3 caracteres"}})}
        />
        {errors.title && <span data-testid="error_form" className={styles.error_form}>{errors.title.message}</span>}

        <Input style={errors.title && {borderBottomColor: '#c52722', color: '#c52722'}}
          id='imageUrl' 
          label='Link da imagem' 
          placeholder='Link da imagem do seu post...' 
          type='text'
          {...register("imageURL", {required: "O link da imagem é obrigatório",
            validate: isImageLink
          })}
        />
        {errors.imageURL && <span data-testid="error_form" className={styles.error_form}>{errors.imageURL.message}</span>}

        <Input style={errors.title && {borderBottomColor: '#c52722', color: '#c52722'}}
          id='description' 
          label='Descrição' 
          placeholder='Descrição do seu post...' 
          type='text'
          {...register("description", {required: "A descrição é obrigatória",
            minLength: {value: 3, message: "A descrição precisa ter no mínimo 3 caracteres"}
          })}
        />
        {errors.description && <span data-testid="error_form" className={styles.error_form}>{errors.description.message}</span>}
        

        <input className="btn" disabled={isPending} type="submit" value={isPending ? 'Aguarde' : 'Postar'} />
  
    </form>
  )
}

export default Form