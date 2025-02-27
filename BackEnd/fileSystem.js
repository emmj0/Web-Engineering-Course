const file =    require('fs');
function fileThings(){
    file.writeFile('file.txt', 'Hello, World! 🚀', (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File has been created');
      });
      file.appendFile('file.txt', 'Hello, World! 🚀', (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Data has been added to the file');
      });
      file.readFile('file.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      file.unlink('file.txt', (err) => {
          if (err) {
              console.error(err);
              return;
              }
          console.log('File has been deleted');
      });

      file.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        const jsonData = JSON.parse(data);
        console.log(data.salary);
        console.log(jsonData); 
    });

}

module.exports = {
    fileThings
}

