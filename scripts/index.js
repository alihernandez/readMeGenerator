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
    {
      type: "input",
      name: "table-of-contents",
      message: "please enter items for table of contents",
    },

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
      type: "input",
      name: "license",
      message: "any licenses?",
    },
    {
        type: "input",
        name: "contributing",
        message: "contributing"
        },
        {
            type: "input",
            name: "questions",
            message: "hello whats your name?"
            },

  ]);
};

function generateMarkdown(answers){
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h1>#${answers.title}</h1>
<p>*${answers.description}*<p>

    
</body>
</html>
    `
}

promptUser()
.then(function(answers){
    const html = generateMarkdown(answers);
    return writeFileAsync("markUp.html", html);
});