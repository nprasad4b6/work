const chalk = require("chalk")
const yargs = require("yargs")


// create add commond
yargs.command({
    command: 'add',
    describe: 'adds two values',
    builder: {
        title: {
            describe: "Add Title",
            demandOption: true,
            type: "string" // otherwise considers as bollean
        },
        body: {
            describe: "BOdy of add commond",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log(chalk.red.inverse('Adding new note',argv.body))
    }

})

// yargs.parse()

// console.log(process.argv)

debugger

console.log(yargs.argv)