const isImageLink = (value: string) => {
  const regex = /\.(jpeg|jpg|gif|png|jfif)$/i; // Extensões comuns de imagens
  return value.startsWith('http') && regex.test(value) 
    ? true 
    : 'Por favor, insira um link válido para uma imagem!';
};

export default isImageLink