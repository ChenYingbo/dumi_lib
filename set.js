/**
 * Author: csvn
 * 2021.01.29
 */

let fs = require('fs');
let mkdirp = require('mkdirp');
let basepath = 'src/components/';
let moment = require('moment');
let cptName = process.argv.splice(2)[0];
let path = cptName.split('/');
let name = path[path.length - 1];
let writes = [`${name}.tsx`, `${name}.less`,  `index.md`, `index.tsx`];
let reads = [`${basepath}cptTemp/index.md`,`${basepath}cptTemp/index.tsx`,`${basepath}cptTemp/cptTemp.tsx`];
let file = [];
let author = require('os').homedir().split('\\').pop();

console.log('path', path, name, writes, reads, author)
//检测是否存在文件夹
let exists = function () {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of path) {
                fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
            }
            res(basepath);
        })()
    })
}
//建立文件夹
let mkdir = function (a) {
  console.log('mkdir', a)
    return new Promise((res, rej) => {
      mkdirp(basepath + a)
      .then(() => {
        console.log('文件夹创建成功')
        basepath = `${basepath}${a}/`
        res(basepath);
      })
      .catch(err => {
          if (err) rej(err);       
      })
    })
}
//读取模板文件内容，并替换为目标组件
let readFile = function () {
    return new Promise((res) => {
        for (let a of reads) {
            let text = fs.readFileSync(a).toString();
            text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
                .replace(/temp/g, name)
                .replace(/author/g, author)
            file.push(text)
        }
        res(file);
    })
}
//生成文件，并填入之前读取的文件内容
let writeFile = function (file) {
    return new Promise((res, rej) => {
        (async function () {
            for (let a of writes) {
                console.log('a', a, writes)
                await fs.writeFile(`${basepath}${a}`,
                    a == writes[0] ? file[2] : a == writes[2] ? file[0] : a == writes[3] ? file[1] : '', (err) => {
                        if (err) rej(err)
                    })
            }
            res('succ');
        })()
    })
}
async function creatCpt() {
    try {
        await exists();
        await readFile()
        await writeFile(await readFile());
        return console.log(`Successfully created ${name} component`)
    }
    catch (err) {
        console.error(err);
    }
}
creatCpt();