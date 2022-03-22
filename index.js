'use strict'

const fs = require('fs');

getDataCSV();

function getDataCSV() {
    fs.readFile('./puntuaciones.csv', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file");
        } else {
            const usersData = data.split('\n').map(userScore => {
                let [name, numericaSystem, score] = userScore.split(',');
                score = decodeScore(numericaSystem, score.replace('\r', ''));
                return [name, score];
            }).sort((a, b) => b[1] - a[1]);
            writeCSV(usersData)
        }
    });
}

function decodeScore(numericaSystem, score) {
    const calScore = score.split('').reduce((acc, curr) =>  acc + numericaSystem.indexOf(curr).toString(), '');
    return parseInt(calScore, numericaSystem.length);
}

function writeCSV(data) {
    fs.writeFile('resultado.csv', data.join('\n'), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file');
        } else {
            console.log('Success');
        }
    });
}
