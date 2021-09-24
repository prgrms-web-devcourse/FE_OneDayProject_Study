export default function processInput(text) {
  const processedInput = []

  text.map((eachPerson) => {
    const [name, mbti] = eachPerson.split(',')
    processedInput.push([name, mbti.trim()])
  })

  return processedInput
}
