import { exec } from 'child_process'

const execute = function (command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err)
                return
            }

            resolve(stdout ?? stderr)
        })
    })
}

export default execute
