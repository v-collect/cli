const path = require('path');
const fs = require('fs-extra');
const inquire = require('inquirer');

module.exports = async function (projectName,options){
    console.log(projectName, options)
    // 创建项目

    const cwd = process.cwd(); // 当前的工作路径

    const targetDir = path.join(cwd,projectName);

    if(fs.existsSync(targetDir)){
        if(options.force){
            await fs.remove(targetDir);
        }else{
            let {action} = await inquire.prompt([
                {
                    name: 'action',
                    type: 'list',
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
        }
    }
}