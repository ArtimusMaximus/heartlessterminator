import readline from 'readline';
import open from 'open';
import fs, { readFile, writeFile } from 'fs'
import fetch from 'node-fetch';
import terminalImage from 'terminal-image';
import boxen from 'boxen';
import express from 'express';

// const app = express();

// app.get('/', (req, res) => {
//     res.send('you got it')
// })

// const server = app.listen(process.env.PORT || 8000, () => {
//     console.log('Server running @ 8000');
// })






let RL = readline.createInterface(process.stdin, process.stdout);

let commandsArray = [
    {command: 'new card', action: 'Makes a new flash card...'}, 
    {command: 'flashcard', action: 'Makes a new flash card...'},
    {command: 'list cards', action: 'Lists all available flashcards...'},
    {command: 'fetch', action: 'Performs a Google search...'}, 
    {command: 'search', action: 'Performs a Google search...'}, 
    {command: 'email', action: 'Loads Thunderbird...'},
    {command: 'terminate', action: 'Exits program with a special message...'},
    {command: 'exit', action: 'Exits program...'},
    {command: 'close', action: 'Exits program...'},
    {command: 'commands', action: 'Lists all available commands...'},
    {command: '!', action: 'Lists all available commands...'},
    {command: 'time', action: 'Shows the time for 5 seconds...'},
    {command: 'def', action: 'Fetch the definition of a word...'},
    {command: 'definition', action: 'Fetch the definition of a word...'},
    {command: 'define', action: 'Fetch the definition of a word...'},
    {command: 'antonym', action: 'Fetch synonyms / antonyms from Thesaurus...'},
    {command: 'synonym', action: 'Fetch synonyms / antonyms from Thesaurus...'},
    {command: 'thesaurus', action: 'Fetch synonyms / antonyms from Thesaurus...'},
    {command: 'thes', action: 'Fetch synonyms / antonyms from Thesaurus...'},
    {command: 'new card', action: 'Create a new flash card/text file...'},
    {command: 'flash card', action: 'Create a new flash card/text file...'},
    {command: 'random', action: 'Read a random flash card...'},
    {command: 'rcard', action: 'Read a random flash card...'},
    {command: 'readcard', action: 'Read a specific flash card/textfile...'},
]
// let commandsArray2 = {
//     'new card': 'Make a new flash card...',
//     'flashcard': 'Make a new flash card...',
//     'list cards': 'Lists all available flashcards...',
//     'fetch': 'Performs a Google search...',
//     'search': 'Performs a Google search...',
//     'email': 'Loads Thunderbird...',
//     'terminate' : 'Exits program...',
//     'exit': 'Exits program...',
//     'close': 'Exits program...',
//     'commands': 'Lists all available commands...',
//     '!': 'Lists all available commands...'
// }

const appStartTime = new Date()
console.log('App Start Time: ' + appStartTime.toString().slice(15, 25))


RL.question('Name? >> ', (name) => {
    let ques = [];
    ques.push(name)

    console.log(`Thank you ${name}... type: "!" or "commands" for command list.\n`)
    RL.setPrompt(`Awaiting further commands ${name}...\n`)
    
    RL.prompt();
    RL.on('line', async (data) => {

        ques.push(data)

        if (commandsArray.find((item) => item.command === data) === undefined) {
            console.warn(`"${data}" Command not recognized ${name}... enter "!" or "commands" for a list of commands...`);
        }
        
        if (data.toLowerCase() === 'new card' || data.toLowerCase() === 'flashcard') {
            RL.question('\x1b[101;90mTitle of text file? >>>>\x1b[0m  ', async (title) => {
                RL.question('\x1b[101;90mEnter data for text file >>>>\x1b[0m  ', async (content) => {
                    data = content
                    await fs.writeFile(`./flashcardfiles/${title}.txt`, data, err => {
                        if (err) console.warn(err)
                    })
                    console.log(`\x1b[101;92mNew text file '${title}' created successfully.\x1b[0m \x1b[92m ♣ \x1b[0m`)
                    setTimeout(() => {
                        RL.prompt();
                    }, 2000)
                })
            })
        }

        if (data.toLowerCase() === 'fetch' || data.toLowerCase() === 'search') {
            RL.question('Which url are we fetching? ', async (url) => {
                await open(`https://www.google.com/search?q=${url}`)
                RL.prompt();
            })
        }

        if (data.toLowerCase() === 'email') {
            open('thunderbird.exe')
            setTimeout(() => {
                process.stdout.write('Loading your email\r') 
            }, 500)
            setTimeout(() => {process.stdout.write('Loading your email.\r')}, 1000)
            setTimeout(() => {process.stdout.write('Loading your email..\r')}, 1500)
            setTimeout(() => {process.stdout.write('Loading your email...\r')}, 2000)
            setTimeout(() => {process.stdout.write('Loading your email....\r')}, 2500)
            setTimeout(() => {process.stdout.write('Loading your email.....\r')}, 3000)
            setTimeout(() => {process.stdout.write('Loading your email......\r')}, 3500)
            setTimeout(() => {console.log('~Email loaded successfully~')}, 4000)
            setTimeout(() => {RL.prompt();}, 5000)
        }

        if (data.toLowerCase() === 'close' || data.toLowerCase() === 'exit') {
            RL.close();
            
            let appEndTime = new Date();
            let appUpTime = appStartTime - appEndTime
            console.log('App started @ ' + appStartTime + 'App ended @ ' + appEndTime + 'Total app uptime: ' + appUpTime)
            console.table('Data log: ' + ques.map(item => '\n' + `${ques.indexOf(item) + ':' + ' ' + item}`).join(''))
            process.on('SIGTERM', () => {
                server.close(() => {
                    console.log('Process terminated.');
                })
            })
            process.kill(process.pid, 'SIGTERM')
        }

        if (data.toString() === 'terminate') {
            RL.close();
            console.log(await terminalImage.file('images/terminatorjpg.jpg'))
            // process.exit();
            // process.on('SIGTERM', () => {
            //     server.close(() => {
            //         console.log('Process terminated.');
            //     })
            // })
            process.kill(process.pid, 'SIGTERM')
        }

        if (data.toLowerCase() === 'list cards') {
            fs.readdir('./flashcardfiles', (err, files) => {
                if (err) {
                    console.log(err)
                    RL.prompt()
                }
                files.forEach((file) => {
                    console.log('Files in folder: ' + file)
                })
            })
        }

        if (data.toLowerCase() === 'commands' || data.toLowerCase() === '!') {
            let columns = ['commands', 'command actions']
            console.table(commandsArray.map(item => item.command + ' : ' + item.action))
            RL.prompt();
        }

        if (data.toLowerCase() === 'time') {
            let showClock = setInterval(() => process.stdout.write(`${new Date()}\r`), 1000)
            
            setTimeout(() => {

                clearInterval(showClock)
                RL.prompt()
            }, 5000)
        }

        if (data.toLowerCase() === 'def' || data.toLowerCase() === 'definition' || data.toLowerCase() === 'define') {
            RL.question('Word to fetch definition for? >> ', async (word) => {

                const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=ee9b97b7-f255-4a65-9d7a-41e3c6290b53`)
                const data = await response.json();

                console.log(`Definition for '${word}' (${data[0].fl}): ` +  data[0].shortdef.map(item => `\n${item}`))
                      
                setTimeout(() => {
                    RL.prompt()
                }, 2000)

            })
            
        }

        if (data.toString() === 'antonym' || data.toString() === 'thesaurus' || data.toString() === 'thes' || data.toString() === 'synonym') {
            RL.question('Which word would you like from the Thesaurus? >> ', async (word) => {
                let response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=d465c9ab-7253-4549-aa42-8700856c931d`)
                let data = await response.json();
                if (data[0].meta.syns.length === 0) {
                    console.log('No Synonyms...')
                } else {
                    console.log(`Synonyms for ${word}: ` + data[0].meta.syns.map(item => item.toString().split(',').join(' ')).join(' '))
                }
                if (data[0].meta.ants.length === 0) {
                    console.log('No antonyms...')
                } else {
                    console.log(`Antonyms for ${word}: `+ data[0].meta.ants.map(item => item.toString().split(',').join(' ')).join(' '))
                }
                setTimeout(() => {
                    RL.prompt();
                }, 2000)
            })
        }

        if (data.toString() === 'random' || data.toString() === 'rcard') {
            fs.readdir('./flashcardfiles', 'utf-8', async (err, text) => {
                if(err) console.log(err)

                let randomCard = text[(Math.random() * text.length | 0)];

                await fs.readFile(`./flashcardfiles/${randomCard}`, 'utf-8', (err, text) => {
                    if (err) console.warn(err)
                    console.log(boxen(`\x1b[101;30m${text}\x1b[0m`, {title: `\x1b[101;30m${randomCard.slice(0, -4)}\x1b[0m`, titleAlignment: 'center', padding: 1, margin: 1}))
                    RL.prompt();
                })
                
            })
        }

        if (data.toString() === 'readcard') {
            RL.question('Which card do you want to read? >>>> ', (card) => {
                let readCard = fs.readFile(`./flashcardfiles/${card}.txt`, 'utf-8', (err, text) => {
                    console.log(boxen(`\x1b[101;30m${text}\x1b[0m`, {title: `\x1b[101;30m${card + `.txt`.slice(0, -4)}\x1b[0m`, titleAlignment: 'center', padding: 1, margin: 1}))
                    RL.prompt();
                })
                try {
                    readCard;
                }
                catch(e) {
                    console.log(e + ` ...file doesn't exist, type: list cards`)
                }
            })
            
        }

       

    })
    

    
})



