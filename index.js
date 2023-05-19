const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require('./shapes');

function writeToFile(fileName, answers) {
  let svgString = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  svgString += '<g>';

  let shapeChoice;
  if (answers.shape === 'Triangle') {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === 'Square') {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += '</g>';
  svgString += '</svg>';

  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log('Generated logo.svg');
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What text would you like your logo to display? (Enter up to three characters)',
        name: 'text',
        validate: (input) => input.length <= 3 || 'Please enter up to three characters.',
      },
      {
        type: 'input',
        message: 'Choose text color (Enter a color keyword or a hexadecimal number)',
        name: 'textColor',
      },
      {
        type: 'list',
        message: 'What shape would you like the logo to render?',
        choices: ['Triangle', 'Square', 'Circle'],
        name: 'shape',
      },
      {
        type: 'input',
        message: 'Choose shape color (Enter a color keyword or a hexadecimal number)',
        name: 'shapeBackgroundColor',
      },
    ])
    .then((answers) => {
      writeToFile('logo.svg', answers);
    });
}

promptUser();
