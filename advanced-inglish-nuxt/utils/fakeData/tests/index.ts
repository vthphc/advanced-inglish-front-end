import { generateTOEICTest } from "./testGenerator";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Create the equivalent of __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate the test
const test = generateTOEICTest();

// Create a formatted date-time string for the filename (YYYY-MM-DD_HH-MM-SS)
const now = new Date();
const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
const formattedTime = `${now.getHours().toString().padStart(2, "0")}-${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}-${now.getSeconds().toString().padStart(2, "0")}`;
const timestamp = `${formattedDate}_${formattedTime}`;

// Define the testBank directory path (assumes it's a sibling to the tests folder)
const testBankDir = join(__dirname, "testBank");

// Ensure the testBank directory exists
if (!existsSync(testBankDir)) {
    mkdirSync(testBankDir, { recursive: true });
}

// Create the full file path with dynamic name
const filename = `toeic_test_${timestamp}.json`;
const filePath = join(testBankDir, filename);

// Write the test to the file
writeFileSync(filePath, JSON.stringify(test, null, 2), "utf-8");

console.log(`Fake TOEIC test data written to ${filePath}`);
