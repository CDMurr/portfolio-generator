const fs = require('fs');

// writing files 
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if theres an error, reject the Promise and send the error to the Promises . `.catch()` method
            if (err) {
                reject(err);
                // return out fo the function to make sure the Promise doesnt accidentally execute the resolve() function as well 
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the `.then()` method 
            resolve({
                ok: true, 
                message: 'File created!'
            });
        });
    });
};

// copying files 
const copyFile = fileContent => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./dist/index.html', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true, 
                message: 'Stylesheet created!'
            });
        });
    });
};

module.exports = { writeFile, copyFile };