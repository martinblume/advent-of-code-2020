const fs = require('fs');

const CommandType = {
  ACC: 'acc', NOP: 'nop', JMP: 'jmp'
}
CommandType.fromString = (string) => {
  switch (string) {
    case 'acc':
      return CommandType.ACC
    case 'nop':
      return CommandType.NOP
    case 'jmp':
      return CommandType.JMP
    default:
      break;
  }
}

const data = fs.readFileSync('08-input.txt', 'UTF-8');
const lines = data.split(/\r?\n/);

const getCodeLines = () => lines
  .map((line) => line.split(' '))
  .map(([command, argument]) => ({
    commandType: CommandType.fromString(command),
    argument: Number(argument),
    executed: false
  }))


const executeBootCode = (indexToFlip) => {
  let index = 0
  let accumulator = 0
  let nrOfCommandsExecuted = 0
  const codeLines = getCodeLines()
  switch (codeLines[indexToFlip].commandType) {
    case CommandType.JMP: codeLines[indexToFlip] = CommandType.NOP
    break
    case CommandType.NOP: codeLines[indexToFlip] = CommandType.JMP
    break
    default:
    break
  }
  let command = codeLines[index]
  while(command && !command.executed) {
    if (command.commandType === CommandType.ACC) {
      accumulator += command.argument
    } else if (command.commandType === CommandType.JMP) {
      index += command.argument-1
    }
    command.executed = true
    index++
    command = codeLines[index]
    nrOfCommandsExecuted++
  }
  return ({
    accumulator,
    nrOfCommandsExecuted,
    executedNormally: !command
  })
}
console.log('Start executing boot code')

let accumulator = 0
let lineToSwitch = 0
let nrOfCommandsExecuted = 0
let executedNormally = false
console.log(`getCodeLines.length: ${getCodeLines().length}`)
while (!executedNormally && lineToSwitch < getCodeLines().length && nrOfCommandsExecuted < getCodeLines().length) {
  const result = executeBootCode(lineToSwitch)
  lineToSwitch++
  accumulator = result.accumulator
  nrOfCommandsExecuted = result.nrOfCommandsExecuted
  executedNormally = result.executedNormally
  if(executedNormally) {
    console.log('executed normally.')
  }
}

console.log('Finished executing boot code.')
console.log(`accumulator is ${accumulator}.`)
console.log(`executed ${nrOfCommandsExecuted} commands.`)
console.log(`line to fix was ${lineToSwitch-1}`)

