import { MBTI, MBTI_MAP, MBTI_MATRIX } from '../util/embededData.js'

export default function makeTeams(people, nOfTeam) {
  const queue = [...people]
  const peoplePerTeam = Math.floor(people.length / nOfTeam)
  const tempTeam = []
  const totalPeopleCount = []

  let benefit = 0

  for (let i = 0; i < nOfTeam; i++) {
    tempTeam.push({
      name: `TEAM ${i + 1}`,
      isMbtiFull: false,
      currentMember: 0,
      totalScore: 0,
      history: {
        // 순회를 여기에서 하기.
        INFP: 0,
        ENFP: 0,
        INFJ: 0,
        ENFJ: 0,
        INTJ: 0,
        ENTJ: 0,
        INTP: 0,
        ENTP: 0,
        ISFP: 0,
        ESFP: 0,
        ISTP: 0,
        ESTP: 0,
        ISFJ: 0,
        ESJF: 0,
        ISTJ: 0,
        ESTJ: 0,
      },
      member: [], // 이름, mbti
    })
    totalPeopleCount.push(0)
  }

  while (queue.length) {
    const [name, mbti] = queue.shift()
    const totalBenefit = []
    const totalBenefitWithMember = []
    for (const team of tempTeam) {
      benefit = 0
      for (const key of MBTI) {
        if (team.history[key] > 0) {
          const start = MBTI_MAP[mbti]
          const target = MBTI_MAP[key]
          benefit += MBTI_MATRIX[start][target] * team.history[key]
        }
      }
      team.currentMember
        ? totalBenefit.push(
            parseFloat((benefit / team.currentMember).toFixed(2)),
          )
        : totalBenefit.push(0)
    }

    const min = Math.min(...totalBenefit)
    const teamMinIndex = totalBenefit.indexOf(min)

    totalBenefit.map((value, index) => {
      totalBenefitWithMember.push([value, totalPeopleCount[index], index])
    })
    // 0,1,번 인덱스로 정렬 내림차순
    totalBenefitWithMember
      .sort(function (a, b) {
        return a[0] - b[0] || b[1] - a[1]
      })
      .reverse()

    if (min === 0) {
      tempTeam[teamMinIndex].member.push([name, mbti])
      tempTeam[teamMinIndex].currentMember++
      tempTeam[teamMinIndex].history[mbti]++
      totalPeopleCount[teamMinIndex]++
      continue
    }

    let find = false
    let i = 0
    while (!find && i < nOfTeam) {
      const [, currentPeople, teamIndex] = totalBenefitWithMember[i]
      if (currentPeople < peoplePerTeam) {
        tempTeam[teamIndex].member.push([name, mbti])
        tempTeam[teamIndex].currentMember++
        tempTeam[teamIndex].history[mbti]++
        tempTeam[teamIndex].totalScore += benefit

        totalPeopleCount[teamIndex]++
        find = true
      }
      i++
    }
  }
  console.log(tempTeam)
  return tempTeam
}
