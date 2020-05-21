const {Octokit} = require('@octokit/rest')
const octokit = new Octokit({auth: process.env.GITHUB_ACCESS_TOKEN})

module.exports = async (req, res) => {
  let result
  try {
    result = await octokit.repos.listCommits({owner: 'ttskch', repo: 'vercel-nodejs-sample'})
  } catch (e) {
    console.error(e)
    result = null
  }

  result ? res.send(result.data.map(item => `<a href="${item.html_url}">${item.commit.message}</a>`).join('<br>')) : res.end()
}
