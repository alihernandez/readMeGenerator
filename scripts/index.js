const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
// * Title
// * Description
// * Table of Contents
// * Installation
// * Usage
// * License
// * Contributing
// * Tests
// * Questions
{
  type: "input",
  name: "title",
  message: "hello what's the title of the project?",
},
{
  type: "input",
  name: "description",
  message: "please enter a short description of your project",
},
// {
//   type: "input",
//   name: "table-of-contents",
//   message: "please enter items for table of contents",
// },

{
  type: "input",
  name: "installation",
  message: "please enter the installation",
},

{
  type: "input",
  name: "usage",
  message: "usage?",
},

{
  type: "list",
  name: "license",
  message: "any licenses?",
  choices: ["MIT", "Mozilla", "IBM"],
},
{
  type: "input",
  name: "contributing",
  message: "contributing",
},
{
  type: "input",
  name: "questions",
  message: "hello whats your name?",
},
  ]);
}

function generateMarkdown(answers) {
  return `
# ${answers.title}

## Badges

![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)

Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## License
   ${answers.license === "MIT" ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" :  answers.license === "IBM" ? "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)":  "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"} 



## Description 
${answers.description}


## Table of Contents (Optional)

If your README is very long, add a table of contents to make it easy for users to find what they need.

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

${answers.installation}

   
## Usage 

Provide instructions and examples for use. Include screenshots as needed.  


## Credits

${answers.contributing}


## Contributing

If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them.


`;
}

promptUser().then(function (answers) {
  const markdown = generateMarkdown(answers);
  return writeFileAsync("readMe.md", markdown);
});
