const inquirer = require('inquirer');

const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?(Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please eneter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username(Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please eneter your name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => { 
    // If theres no 'projects' array property, create one
    if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?(Required)',
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please eneter your project name!');
                return false;
            }
        }
      },
      {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project(Required)',
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please eneter description!');
                return false;
            }
        }
      },
      {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you build the project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
          type: 'input', 
          name: 'link', 
          message: 'Enter the GitHub link to your project. (Required)',
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please eneter your github link!');
                return false;
            }
        }
      },
      {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
      },
      {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
      }
  ])
  .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
      } else {
          return portfolioData;
      }
  });  
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    return generatePage(portfolioData);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
})
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
.catch(err => {
    console.log(err);
});



    //     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//        if(err) {
//            console.log(err);
//            return;
//        }
//        console.log('Page Created! Check out index.html in the directory to see it!');

//        fs.copyFile('./src/style.css', './dist/style.css', err => {
//            if (err) {
//                console.log(err);
//                return;
//            }
//            console.log('Style sheet copied succesfully!');
//        });
//      });
// });






// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });






// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!')
// });




// const profileDataArgs = process.argv.slice(2, process.argv.length);
// const [name, github] = profileDataArgs;
// const fs = require('fs');

// const generatePage = (userName, githubName) => {
//     return `
//    <!DOCTYPE html>
//    <html lang="en">
//    <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//     <head> 
    
//     <body>
//         <h1>${name}</h1>
//         <h2><a href="https://github.com/${github}">Github</a></h2>
//         </body>
//         </html>
//    `;
// };

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

// const printProfileData = profileDataArr => {
//     // This... 
//     for (let i = 0; i < profileDataArr.length; i+= 1) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('================');

//     // Is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);