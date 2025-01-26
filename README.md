# deepseek-cli

> Chat with [Deepseek](https://chat.deepseek.com/) in terminal

# Table of Contents

- [Dependency](#dependency)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Want an alternative?](#want-an-alternative)
- [Note](#note)

## Dependency

- [playwright-extra](https://www.npmjs.com/package/playwright-extra)
- [playwright-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth)

## Installation

- Install dependencies

```bash
npm i playwright-extra puppeteer-extra-plugin-stealth
npx playwright install chromium
```

- Set value in `config.json`

```bash
cp config.json.sample config.json
<edit config.json, put "user agent", "userToken", "cf clearance" value from your browser with an authenticated Deepseek account>
```

- User Agent: Its value can be found from any request
- userToken: Its value can be found in localStorage
- cf clearance: Its value can be found in cookie

## How to use

```bash
$ ./deepseek.js "enter any text here"
```

## Want an alternative?

Check out [chatgpt-cli](https://github.com/KevCui/chatgpt-cli)

## Note

This script is designed to process one question and answer at a time, delivering in plain text format. It is optimized for command-line use, enabling users to rapidly retrieve answers directly in the terminal, without having to engage in a conversation with Deepseek.

---

<a href="https://www.buymeacoffee.com/kevcui" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60px" width="217px"></a>
