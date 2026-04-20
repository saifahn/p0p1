export function useToasts() {
  const toast = useToast()

  function showErrorToast(description: string) {
    toast.add({
      title: 'Uh oh! Something went wrong.',
      description,
      color: 'error',
    })
  }

  return {
    showErrorToast,
  }
}
