// const ouput = require('./src/services/berfore_personalCenter.js')
const fs = require('fs')
const base = `import request from '@/utils/request';
import {
  stringify
} from 'qs';\n`
fs.readdir(__dirname + '/src/before',function(err,files){
  const dirList = files
  dirList.map(item => {
    let ouput = require(__dirname + `/src/before/${item}`)
    if (ouput && ouput.default) {
      build(item, ouput.default)
    }
  })
})
function build (dir, ouput) {
  const w_data = Object.entries(ouput).map(([key, item]) => {
    console.log(item)
    if (item.method === 'post') {
      return `export async function ${key}(params) {
                return request('/${item.url}', {
                    method: 'post',
                    body: params,
                    header: ${JSON.stringify(item.header || {})},
                    interFaceType: '${item.interFaceType}'
                });
                }\n`
    } else {
      return `export async function ${key}(params) {
                return request(\`/${item.url}\${stringify(params)}\`, {
                    interFaceType: '${item.interFaceType}'
                });
                }\n`
    }
  }).join('')
  //'/src/services/learningCenterDetail.js'
  console.log(w_data, 'res')
  fs.writeFile(__dirname + `/src/services/${dir}`, base + w_data, {flag: 'a'}, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('写入成功');
    }
  });
}