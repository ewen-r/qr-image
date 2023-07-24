/* Node application to create a QR image.
 * npm install
 * npm run
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";


/* Create a QR image from user entered text.
 * - Prompts user for text to encode.
 * - Prompts user to select an output format (png, svg, pdf).
 * - Prompts user for an output filename.
 * - When responses return...
 * - - Create qr image and write to file.
*/
function main() {
  console.log("main()");

  // Get user input
  inquirer.prompt([
    //  Prompts user for text to encode.
    {
      name: "txt",
      message: "Enter text to encode"
    },
    // Prompts user to select an output format (png, svg, pdf).
    {
      name: "format",
      message: "Select output format",
      type: "list",
      choices: ['png', 'svg', 'pdf']
    },
    // Prompts user for an output filename.
    {
      name: "filename",
      message: "output filename"
    }
  ])
    .then(
      // Handle response...
      (response) => {
        console.debug("response:", response);
        if (response.txt && response.format && response.filename) {
          // Create qr image and write to file.
          qr.image(response.txt, { type: response.format }).pipe(
            fs.createWriteStream(response.filename)
          );
        }
      }
    )
    .catch(
      (error) => {
        if (error.isTtyError) {
          console.error("ERROR: Error while retrieving user input.");
          throw (error);
        } else {
          console.error("ERROR: Unknown error");
        }
      }
    );
}


// Run main.
main();