const fs = require('fs');

// Function to find the constant term
function findConstantTerm(jsonData) {
    const k = jsonData.keys.k;
    const points = [];

    // Select the first k points based on keys
    for (let i = 1; i <= k; i++) {
        const point = jsonData[i];
        const x = i; // Using keys 1 to k as x values
        const y = decodeValue(point.base, point.value);
        points.push([x, y]); // Store as (x, y)
    }

    // Use Lagrange interpolation to find the constant term at x = 0
    return lagrangeInterpolation(points, 0);
}

// Function to decode a value from a given base to decimal
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(points, x) {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
        let term = points[i][1]; // y value
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        result += term;
    }
    return Math.round(result); // Round off result for clarity
}

// Read the JSON data from a file
const filePath = 'data.json'; // Specify your file path here

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    try {
        const jsonData = JSON.parse(data); // Parse the JSON data
        
        // Process each test case
        jsonData.testCases.forEach((testCase, index) => {
            console.log(`Test Case ${index + 1}:`);
            const constantTerm = findConstantTerm(testCase);
            console.log(`c = ${constantTerm}`); // Calculate and print c for each test case
            console.log(); // Add a newline for readability
        });
        
    } catch (parseErr) {
        console.error(`Error parsing JSON: ${parseErr}`);
    }
});