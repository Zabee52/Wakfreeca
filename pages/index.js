document.addEventListener('DOMContentLoaded', function () {
  const githubIssueButton = document.getElementById('openGithubIssue')
  githubIssueButton.addEventListener('click', function () {
    const url = 'https://github.com/Zabee52/Wakfreeca/issues'
    chrome.tabs.create({ url })
  })

  const copyEmailButton = document.getElementById('copyEmail')
  copyEmailButton.addEventListener('click', function () {
    const email = 'zabeee52@gmail.com'
    navigator.clipboard
      .writeText(email)
      .then(function () {
        console.log('Text successfully copied to clipboard')
      })
      .catch(function (err) {
        console.error('Could not copy text: ', err)
      })
  })
})
