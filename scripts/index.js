const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "hello what's the title of the project?",
    },

    {
      type: "input",
      name: "questions",
      message: "hello whats your github username?",
    },

    {
      type: "input",
      name: "description",
      message: "please enter a short description of your project",
    },

    {
      type: "input",
      name: "installation",
      message: "please enter command required to install the project:",
    },

    {
      type: "input",
      name: "usage",
      message: "please provied instructions and examples for use:",
    },

    {
      type: "list",
      name: "license",
      message: "please select applicable licenses:",
      choices: ["MIT", "Mozilla", "IBM"],
    },
    {
      type: "input",
      name: "credits",
      message: "List your collaborators, if any.",
    },
    {
      type: "input",
      name: "contributing",
      message:
        "If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so.",
    },
    {
      type: "input",
      name: "tests",
      message:
        "If you know how to run tests include them here:",
    },
  ]);
}

function generateMarkdown(answers) {
  return `
# **${answers.title}**

${
  answers.license === "MIT"
    ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    : answers.license === "IBM"
    ? "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"
    : "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
} 

## gitHub portfolio:
https://github.com/${answers.questions}

## Description 
------------
${answers.description}

## Table of Contents 
------------
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation
------------
${answers.installation} 

## Usage 
------------
${answers.usage}

## Credits
------------
${answers.credits}

## License
------------
   ${
     answers.license === "MIT"
       ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
       : answers.license === "IBM"
       ? "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"
       : "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
   } 
  
## Contributing
------------
${answers.contributing}

## Tests
------------
${answers.tests}
`;
}

promptUser().then(function (answers) {
  const markdown = generateMarkdown(answers);
  return writeFileAsync("readMe.md", markdown);
});
