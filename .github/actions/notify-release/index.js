import * as core from '@actions/core'
import * as github from '@actions/github'

export async function getContext() {
  const context = github.context
  const payload = context.payload

  const content = {
    body:
      payload.release.body.length < 1500
        ? payload.release.body
        : `${payload.release.body.substring(0, 1500)} ([...](${payload.release.html_url}))`,
    tag_name: payload.release.tag_name,
    html_url: payload.release.html_url,
    full_name: payload.repository.full_name,
  }

  return content
}

async function run() {
  try {
    const webhookUrl = core.getInput('discord_webhook_url')
    if (!webhookUrl) {
      return core.setFailed('Missing Discord webhook URL')
    }

    const content = await getContext()

    const embedMsg = {
      color: 3447003,
      title: `${content.tag_name} has been released`,
      description: `Desktop apps are being built and will be attached shortly to this release\n\n${content.body}`,
      url: content.html_url,
    }

    const body = { embeds: [embedMsg] }

    const url = `${webhookUrl}?wait=true`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => core.info(JSON.stringify(data)))
      .catch((err) => core.info(err))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
