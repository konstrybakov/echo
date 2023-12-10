const escape = [
  '_',
  '*',
  '[',
  ']',
  '(',
  ')',
  '~',
  '`',
  '>',
  '#',
  '+',
  '-',
  '=',
  '|',
  '{',
  '}',
  '.',
  '!'
]

export const sanitize = (input: string): string => {
  let result = input

  for (const char of escape) {
    result = result.replaceAll(char, `\\${char}`)
  }

  return result
}
