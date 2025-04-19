export default function handleInputNumber (e , setValue) {
  const { value, id:inputId } = e.target
  const inputValue = value.replace(/\D/g, '')
  setValue(inputId,inputValue)
}