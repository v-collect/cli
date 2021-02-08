const inquirer = require("inquirer");
const { fetchRepoList } = require("./request");
const ora = require('ora')
const {sleep} = require('./utils')

async function wrapLoading(fn,message){
    const spinner = ora(message);
    spinner.start();
    try {
        let result = await fn();
        spinner.succeed();
        return result
    } catch (error) {
        spinner.fail('request failed!, try again...')
        await sleep(2000)
        return wrapLoading(fn,message)
    }
}

class Creator {
    constructor(name,target){
        this.name = name;
        this.target = target;
    }

    async fetchRepo(){
        let repos = await wrapLoading(fetchRepoList,'waiting for fetch template!');
        console.log('repo', repos)
        if(!repos) return;
        repos = repos.map(item=> item.name)
        let {repo} = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices : repos,
            message: 'please choose a template to create project.'
        })

        console.log('repo', repo)

    }

    async fetchTag(){

    }

    async download(){

    }

    async create(){
        // 拉取当前组织下的模板

        let repo = await this.fetchRepo()

        // 通过模板找到版本号
        let tag = await this.fetchTag()

        // 下载
        let download = await this.download()

        // 编译
    }
}

module.exports = Creator;