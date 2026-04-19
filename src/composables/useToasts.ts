export function useToasts() {
  const toast = useToast()

  function showSuccessToast() {
    toast.add({ title: 'Your card choices were successfully submitted!', color: 'success' })
  }

  function showErrorToast(description: string) {
    toast.add({
      title: 'Uh oh! Something went wrong.',
      description,
      color: 'error',
    })
  }

  return {
    showSuccessToast,
    showErrorToast,
  }
}
