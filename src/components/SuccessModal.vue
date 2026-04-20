<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}>()

const feedbackUrl = 'https://forms.gle/Uf9wQb2LuLwfmhwm6'

function handleOpenUpdate(value: boolean) {
  emit('update:open', value)
  if (!value) emit('close')
}

function handleClose() {
  emit('update:open', false)
  emit('close')
}
</script>

<template>
  <UModal :open="open" @update:open="handleOpenUpdate" title="Submission successful">
    <template #body>
      <p>Your card choices were successfully submitted! Thank you for participating.</p>
      <p class="mt-4">
        We'd love your feedback - share your experience by
        <ULink :to="feedbackUrl" class="underline underline-offset-4">filling out this form</ULink>
        to help us improve for the future.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end w-full">
        <UButton variant="ghost" color="neutral" size="lg" @click="handleClose">Close</UButton>
      </div>
    </template>
  </UModal>
</template>
