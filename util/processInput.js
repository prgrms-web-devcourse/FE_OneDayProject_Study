export default function processInput(text) {
  /**
   * 
  '이름, mbti
  이름, mbti
  이름, mbti'
   */

  const processedInput = text.split('\n').map((eachPerson) =>
    eachPerson
      .trim()
      .split(',')
      .map((str) => str.trim()),
  )

  return processedInput
}
