const { exec } = require('child_process')

const run = (file) => {
  return new Promise((resolve, reject) => {
    console.log(`\n🗃️​ Ejecutando ${file}...`)
    exec(`node seed/${file}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`🛑 Error en ${file}:\n`, stderr || err.message)
        return reject(err)
      }
      console.log(stdout)
      resolve()
    })
  })
}

const runAllSeeds = async () => {
  try {
    await run('memberships.js')
    await run('users.js')
    await run('workouts.js')
    console.log('✅ ✅ ✅ Todas las semillas ejecutadas correctamente ✅ ✅ ✅')
  } catch (err) {
    console.error('🛑 🛑 🛑 Semillas detenidas por error 🛑 🛑 🛑')
  }
}

runAllSeeds()
