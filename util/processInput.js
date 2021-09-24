export default function processInput(text) {
  const processedInput = text.split('\n').map((eachPerson) =>
    eachPerson
      .trim()
      .split(',')
      .map((str) => str.trim()),
  )

  return processedInput
}
