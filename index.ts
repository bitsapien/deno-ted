
// @ts-nocheck
console.log(Deno.args)
const filepath = Deno.args[0]


const tokenize = (file: string) => {
  const chars = file.split('')
  const ds = collectExpressions(chars)
  return ds
}

type expr = string[] | never
const extractExpression = (char: string, chars: string[]) => {
  if(char === ')') {
    return []
  }

  const rest: expr  = extractExpression(chars[1], chars.slice(1))

  if(char !== '(')
    return [char, ...rest]
  else
    return [rest]
}

/*
* (
*
*
*
*/


const collectExpressions = (chars: string[]) =>
  extractExpression(chars[0], chars)

const collect = (line: string[], end: string) => line.filter(token => token !== end)


const convertToAST = (tokens: string[][]) => {
  return tokens.map(tokenLine => {
    return tokenLine.flatMap((token: string, index: number) => {
      if(token === '(') {
        return collect(tokenLine.slice(index+1), ')')
      }
    }).filter(a => a)
  })
}


type ast = (string | undefined)

const execute = (ast: ast[][]) => console.log('yes')

// 1. Read file
console.log('1. Reading file ...')
const file = await Deno.readTextFile(filepath)
console.log(file)
// 2. Tokenize
console.log('2. Tokenizing ...')
const tokens = tokenize(file)
console.log(tokens)
// 3. Convert to data structure
console.log('3. Convert To data structures ...')
//const ast = convertToAST(tokens)
//console.log(ast)
// 4. Interpret
//console.log('4. Interpret')
//console.log(execute(ast))
