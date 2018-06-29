// @ts-check
/**
 * @see https://plopjs.com/documentation/
 */

const path = require('path');
const slash = require('slash');
const glob = require('glob');
const directoryPrompt = require('inquirer-directory');

const templateDir = './template';
const basePath = './assets';

const createComponentConfig = {
    description: 'Create a new Svelte Component',

    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Component name in space separated words e.g. "search input": '
        },
        {
            type: 'directory',
            name: 'parentDir',
            message: 'Where should the component be created:',
            basePath
        }
    ],

    actions: createComponent
};

const updateComponentConfig = {
    description: 'Create a new version of an existing component',

    prompts: [
        {
            type: 'list',
            name: 'name',
            message: 'Please choose the component to update',
            choices: getComponentRootPaths()
        },
        {
            type: 'input',
            name: 'version',
            message: 'What is the new version number of the component?:',
            validate: input => !!input // required input
        }
    ],

    actions: updateComponent
};

module.exports = plop => {
    plop.setPrompt('directory', directoryPrompt);

    plop.setGenerator('Create New Component', createComponentConfig);
    plop.setGenerator('Update Existing Component', updateComponentConfig);
};

/**
 * This finds the paths to component folders by looking for the version directories and
 * returning the parent directory of that version folder. This should correspond to the
 * component name. We should show the 'namespace' directories as well, to be explicit.
 *
 * @returns {Array<string>}
 */
function getComponentRootPaths() {
    const versionPaths = glob.sync(`${basePath}/**/v*/`);
    const componentRootPaths = versionPaths
        .map(versionPath => path.dirname(versionPath)) // get the version parent dir
        .map(versionPath => versionPath.replace(basePath + '/', '')) // remove the base directory
        .map(versionPath => slash(versionPath));

    // We use Set to ensure the values are unique.
    return [...new Set(componentRootPaths)];
}

/**
 * Mutates the answers object to include data required during template render.
 * Creates and returns plop actions.
 *
 * @param {{name: string, parentDir: string, relativePathToRoot: string, version?: number}} answers
 * @returns {Array} Plop actions
 */
function createComponent(answers) {
    // Add a file in the root of the component to ensure that the url to v1.hbs is
    // prefixed, resulting in unique `component-name-v1` in the fractal browser url.
    const actions = [];

    const commonActions = getCommonActions(templateDir);

    // The parentDir is where the component will be created.
    answers.parentDir = slash(path.join(basePath, answers.parentDir));

    // Inside the created files, we need to know the relative path to the root directory.
    // name/version/name is used to ensure the correct nesting. It is representative
    // of directory structure of a component.
    answers.relativePathToRoot = slash(path.relative(answers.parentDir + 'name/version/name', '.'));

    return actions.concat(commonActions);
}

/**
 * Mutates answers data for use in plop templating. Creates actions for updating component.
 *
 * @see getComponentRootPaths()
 * @param {{name: string, version: string, parentDir: string, relativePathToRoot?: string}} answers
 * @returns {Array} Plop actions
 */
function updateComponent(answers) {
    const actions = getCommonActions(templateDir);

    // Get the parent of the component root folder the user selected.
    answers.parentDir = slash(path.dirname(`${basePath}/${answers.name}/`));
    // The name currently includes the namespace, but we need only the component name.
    answers.name = slash(path.basename(answers.name));
    answers.relativePathToRoot = slash(path.relative(answers.parentDir + 'name/name', '.'));

    return actions;
}

/**
 * @param {string} templateDir
 * @returns {Array<{type: string, path: string, templateFile: string}>} Plop actions
 */
function getCommonActions(templateDir) {
    return [
        {
            type: 'add',
            path: `{{parentDir}}/{{pascalCase name}}/{{pascalCase name}}.svelte`,
            templateFile: `${templateDir}/TemplateComponent.svelte.hbs`
        },
        {
            type: 'add',
            path: `{{parentDir}}/{{pascalCase name}}/{{pascalCase name}}.spec.js`,
            templateFile: `${templateDir}/TemplateComponent.spec.js.hbs`
        },
        {
            type: 'add',
            path: `{{parentDir}}/{{pascalCase name}}/_{{pascalCase name}}.scss`,
            templateFile: `${templateDir}/_TemplateComponent.scss.hbs`
        },
        {
            type: 'add',
            path: `{{parentDir}}/{{pascalCase name}}/README.md`,
            templateFile: `${templateDir}/README.md.hbs`
        }
    ];
}
