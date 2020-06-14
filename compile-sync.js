const { execFileSync } = require('child_process')

module.exports = (inputCode, config) => {
  const nodeCode = `
    const { minify } = require(process.env.TERSER_PATH || 'terser')
    async function main() {
      const result = await minify(${JSON.stringify(inputCode)}, ${JSON.stringify(config)})

      if (result.error) throw result.error

      console.log(result.code)
    }

    main().catch(e => {
      console.error(e)
      process.exitCode = 1
    })
  `

  return execFileSync('node', [], {
    encoding: 'utf-8',
    input: nodeCode
  });
}
