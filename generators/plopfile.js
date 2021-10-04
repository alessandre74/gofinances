module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'application component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.hbs'
      }
    ]
  })

  plop.setGenerator('screen', {
    description: 'application screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'screen name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/screen/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.hbs'
      },
      {
        type: 'add',
        path: '../src/screen/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.hbs'
      }
    ]
  })
}
