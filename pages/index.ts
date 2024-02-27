import FeatureLab from '../src/lib/feature-lab'

document.addEventListener('DOMContentLoaded', function () {
  const githubIssueButton = document.getElementById('openGithubIssue') as HTMLDivElement
  githubIssueButton.addEventListener('click', function () {
    const url = 'https://github.com/Zabee52/Wakfreeca/issues'
    chrome.tabs.create({ url })
  })

  const copyEmailButton = document.getElementById('copyEmail') as HTMLDivElement
  copyEmailButton.addEventListener('click', function () {
    const email = 'zabeee52@gmail.com'
    navigator.clipboard
      .writeText(email)
      .then(function () {
        copyEmailButton.classList.remove('btn-secondary')
        copyEmailButton.classList.add('btn-success')
        copyEmailButton.textContent = '복사 완료!'

        setTimeout(() => {
          copyEmailButton.classList.remove('btn-success')
          copyEmailButton.classList.add('btn-secondary')
          copyEmailButton.textContent = '개발자에게 항의하고 싶다면 : zabeee52@gmail.com'
        }, 3000)
      })
      .catch(function (err) {
        console.error('Could not copy text: ', err)
      })
  })

  const cleanChatterSwitch = document.getElementById('switchCleanChatter') as HTMLInputElement
  cleanChatterSwitch.addEventListener('change', () => {
    FeatureLab.setAndPropagation('cleanChatter', cleanChatterSwitch.checked)
  })
  const cuteFilterSwitch = document.getElementById('switchCuteFilter') as HTMLInputElement
  cuteFilterSwitch.addEventListener('change', () => {
    FeatureLab.setAndPropagation('cuteFilter', cuteFilterSwitch.checked)
  })
  const eeFilterSwitch = document.getElementById('switchEeFilter') as HTMLInputElement
  eeFilterSwitch.addEventListener('change', () => {
    FeatureLab.setAndPropagation('eeFilter', eeFilterSwitch.checked)
  })
  const kiaFilterSwitch = document.getElementById('switchKiaFilter') as HTMLInputElement
  kiaFilterSwitch.addEventListener('change', () => {
    FeatureLab.setAndPropagation('kiaFilter', kiaFilterSwitch.checked)
  })

  init()
})

const init = async () => {
  if (!FeatureLab.loaded) {
    await FeatureLab.init()
  }
  if (FeatureLab.getFeatureEnabled('cleanChatter')) {
    const cleanChatterSwitch = document.getElementById('switchCleanChatter') as HTMLInputElement
    cleanChatterSwitch.checked = FeatureLab.getFeatureEnabled('cleanChatter')
  }
  if (FeatureLab.getFeatureEnabled('cuteFilter')) {
    const cuteFilterSwitch = document.getElementById('switchCuteFilter') as HTMLInputElement
    cuteFilterSwitch.checked = FeatureLab.getFeatureEnabled('cuteFilter')
  }
  if (FeatureLab.getFeatureEnabled('eeFilter')) {
    const eeFilterSwitch = document.getElementById('switchEeFilter') as HTMLInputElement
    eeFilterSwitch.checked = FeatureLab.getFeatureEnabled('eeFilter')
  }
  if (FeatureLab.getFeatureEnabled('kiaFilter')) {
    const kiaFilterSwitch = document.getElementById('switchKiaFilter') as HTMLInputElement
    kiaFilterSwitch.checked = FeatureLab.getFeatureEnabled('kiaFilter')
  }
}
