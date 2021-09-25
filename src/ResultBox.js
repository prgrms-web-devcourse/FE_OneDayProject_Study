import makeTeams from '../util/makeTeams.js'

export default function ResultBox({ target, initialState }) {
  const resultBox = document.createElement('div')
  resultBox.className = 'resultBox'
  target.appendChild(resultBox)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    // 팀 만드는 로직.
    const nOfTeam = this.state.totalTeamNum
    const people = this.state.currentData
    if (!people) return
    const completedTeamArray = makeTeams(people, nOfTeam)

    resultBox.innerHTML = `
    <div>
      ${completedTeamArray
        .map(
          (team) => `
        <ul>
          팀원: ${team.member.map(([name, mbti]) => `${name}(${mbti}) `)}
        </ul>`,
        )
        .join('')}
    </div>
    `
  }

  this.render()
}
