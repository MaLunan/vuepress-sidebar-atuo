//侧边栏
// const autosidebar = require('vuepress-auto-sidebar-doumjun')
const fs = require('fs')
const path = require('path')
function getChildren(path) {
let root = []
readDirSync(path,root)
root=root.map(item=>{
    if(item.split('/')[4]){
        return item.split('/')[3]+'/'+item.split('/')[4]
    }else{
        return item.split('/')[3]
    }
})
return root
}
function readDirSync(path,root){
var pa = fs.readdirSync(path);
pa.forEach(function(ele,index){
var info = fs.statSync(path+"/"+ele)
if(info.isDirectory()) {
readDirSync(path+ele,root)
} else {
if (checkFileType(ele)) {
root.push(prefixPath(path,ele))
}
}
})
}
function checkFileType(path) {
return path.includes(".md")
}
function prefixPath(basePath,dirPath) {
let index = basePath.indexOf("/")
// 去除一级目录地址
basePath = basePath.slice(index,path.length)
// replace用于处理windows电脑的路径用\表示的问题
return path.join(basePath,dirPath).replace(/\\/g,"/")
}
module.exports = {getChildren:getChildren}