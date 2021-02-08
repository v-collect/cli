const path = require('path');
const fs = require('fs-extra');
const inquire = require('inquirer');
const Creator = require('./Creator');

module.exports = async function (projectName,options){

    const cwd = process.cwd(); // 当前的工作路径

    const targetDir = path.join(cwd,projectName);

    if(fs.existsSync(targetDir)){
        if(options.force){
            await fs.remove(targetDir);
        }else{
            let {action} = await inquire.prompt([
                {
                    name: 'action',
                    type: 'list',// 类型丰富
                    message: 'Target directory already exists, pick an action',
                    choices:[
                        {
                            name: 'Overwrite', value: 'overwrite'
                        },
                        {
                            name: 'Cancel', value: false
                        },
                    ]
                }
            ])
            if(!action){
                return;
            }
            else if(action === 'overwrite'){
                console.log(`\r\nRemoving...`)
                await fs.remove(targetDir)
                let create = new Creator(projectName,targetDir);
                create.create()
            }
           
        }
    }else{
        let create = new Creator(projectName,targetDir);
        create.create()
    }
}