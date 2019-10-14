$(function () {
  $('#repo-form').submit((event) => {
    event.preventDefault()
    console.log('form being submitted')

    const username = $('#github-username').val()
    console.log(username)

    // clear list and clear text field
    $('.repos').html('')
    $('#github-username').val('')

    search(username)
  })

  function displayResults (repos) {
    console.log(repos)
    repos.forEach((repo) => {
      $('.repos').append(
        `<li>
          <a href='${repo.html_url}' target='_blank'>${repo.full_name}</a>
        </li>`
      )
    })
  }

  async function search (username) {
    // ** making API request using async/await **
    try {
      const url = `https://api.github.com/users/${username}/repos`
      const accessToken = 'ADD_YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'

      const response = await axios.get(url, {
        params: {
          access_token: accessToken
        }
      })

      console.log(response)
      displayResults(response.data)
    } catch (error) {
      console.log(error)
      alert('an error occurred with your request')
    }
  }
})
