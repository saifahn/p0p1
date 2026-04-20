<script lang="ts" setup>
// April 21, 2026 at 6:00 AM PDT, 13:00 UTC
const targetDate = new Date('2026-04-21T13:00:00Z')

const localTargetDate = targetDate.toLocaleString(undefined, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
})
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const units = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
] as const
function relative() {
  const diffSec = (targetDate.getTime() - Date.now()) / 1000
  const [unit, sec] = units.find(([, s]) => Math.abs(diffSec) >= s) ?? ['second', 1]
  return rtf.format(Math.round(diffSec / sec), unit)
}
</script>

<template>
  <h1 class="text-xl font-bold my-2">Pack 0, Pick 1 - Secrets of Strixhaven</h1>
  <section class="mb-4">
    <p class="mb-2">
      Pick a team of ten cards - one common of each color, and one common/uncommon from each of the
      schools.
    </p>
    <p class="mb-2">
      Your team will be scored by summing the total
      <ULink class="underline underline-offset-4" to="https://www.17lands.com/card_data"
        >Game In Hand Win Rate (GIH)</ULink
      >
      across your ten cards according to
      <ULink class="underline underline-offset-4" to="https://www.17lands.com">17Lands.com</ULink>
    </p>
    <p class="mb-2">
      You'll also pick a Mystical Archive card that will only be used in case of a tie.
    </p>
    <p class="mb-4">
      The results will be announced after 17Lands releases their
      <ULink class="underline underline-offset-4" to="https://www.17lands.com/public_datasets"
        >Public Game Data</ULink
      >
      for the format. (After 3-4 weeks, based on previous sets.)
    </p>

    <div class="bg-elevated/50 ring ring-inset ring-accented p-4 w-full rounded-lg">
      <h2 class="font-bold">Some things to note</h2>
      <ul class="list-disc pl-5 mt-2">
        <li>
          You will not be able to change your team after submission. Make sure you're satisfied with
          your choices before submitting.
        </li>
        <li>
          The deadline for submissions is
          <time datetime="{{ targetDate.toISOString() }}">{{ localTargetDate }}</time> ({{
            relative()
          }}).
        </li>
      </ul>
    </div>
  </section>
</template>
