const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title for this project?"
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of this project."
    },
    {
      type: "input",
      name: "installation",
      message: "Provide a step-by-step description of how to get the development environment running."
    },
    {
      type: "input",
      name: "usage",
      message: "Provide instructions and examples for use."
    },
    {
      type: "list",
      name: "contributing",
      message: "What are the guidelines to allow others to contribute to this project?",
      choices: ["The Contributor Covenant Code of Conduct", "Custom Guidelines"],
      default: "The Contributor Covenant Code of Conduct"
    },
    {
      type: "list",
      name: "guidelines",
      message: "Hit enter to insert Contributor Covenant information",
      choices: ["If you want to contribute to this project we ask that you review [The Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) for guidelines. Thank you"],
      default: "If you want to contribute to this project we ask that you review [The Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) for guidelines. Thank you",
      when: (answers) => answers.contributing === "The Contributor Covenant Code of Conduct"
    },
    {
      type: "input",
      name: "guidelines",
      message: "Enter your custom guidelines",
      when: (answers) => answers.contributing === "Custom Guidelines"
    },
    {
      type: "input",
      name: "tests",
      message: "What tests have been performed for this application."
    },
    {
      type: "input",
      name: "githubName",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "githubLink",
      message: "Enter the url for your github profile."
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address."
    },
    {
      type: "list",
      name: "license",
      message: "Which license do you want to use for this project?",  
      choices: ["MIT", "GPLv3", "AGPL"]
    },
    {
      type: "list",
      name: "licenseBadge",
      message: "Press enter to add license badge",
      choices: ["[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)"],
      default: "[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)",
      when: (answers) => answers.license === "MIT"
    },
    {
      type: "list",
      name: "licenseBadge",
      message: "Press enter to add license badge",
      choices: ["[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)"],
      default: "[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)",
      when: (answers) => answers.license === "GPLv3"
    },
    {
      type: "list",
      name: "licenseBadge",
      message: "Press enter to add license badge",
      choices: ["[The AGPL License](https://opensource.org/licenses/AGPL-3.0)"],
      default: "[The AGPL License](https://opensource.org/licenses/AGPL-3.0)",
      when: (answers) => answers.license === "AGPL"
    },
    {
      type: "list",
      name: "licenseInfo",
      message: "Press enter to add license Information",
      choices: ["[The MIT License](https://opensource.org/licenses/MIT)"],
      default: "[The MIT License](https://opensource.org/licenses/MIT)",
      when: (answers) => answers.license === "MIT"
    },
    {
      type: "list",
      name: "licenseInfo",
      message: "Press enter to add license Information",
      choices: ["[The GPL License](https://opensource.org/licenses/GPL-3.0)"],
      default: "[The GPL License(https://opensource.org/licenses/GPL-3.0)",
      when: (answers) => answers.license === "GPLv3"
    },
    {
      type: "list",
      name: "licenseInfo",
      message: "Press enter to add license Information",
      choices: ["[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)"],
      default: "[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)",
      when: (answers) => answers.license === "AGPL"
    }
  ]);
}

function generateREADME(answers) {
  return `# ${answers.title}
${answers.licenseBadge}

## Description 

${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
* [License](#license)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributing

${answers.guidelines}

## Tests

${answers.tests}

## Questions

If you have any questions about this project feel free to email me at ${answers.email}. 

For more information, or to check out my other projects visit my github page: [${answers.githubName}](${answers.githubLink}).

## License

${answers.licenseInfo}
  `;
}

async function init() {
  try {
    const answers = await promptUser();

    const readMe = generateREADME(answers);

    await writeFileAsync("README.md", readMe);

    console.log("Successfully generated a README.md file");
  } catch(err) {
    console.log(err);
  }
}

init();
