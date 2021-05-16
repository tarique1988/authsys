export default (success: Boolean, data: Object, errors: { name: string, message: string }[], message: string) => {
  return {
    success,
    data,
    errors,
    message
  }
}