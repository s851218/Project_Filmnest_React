export default function handleInputNumber (e , setValue) {
  console.log(e);
  
  const { value, id:inputId } = e.target
  const inputValue = value.replace(/\D/g, '')
  setValue(inputId,inputValue)
}