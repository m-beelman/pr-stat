// for license and copyright look at the repository

import { table, tsMarkdown } from 'ts-markdown'
import { MetricTable } from '../src/Report.Measures'
import * as fs from 'fs'
import { MeasureCategory } from '../src/Report.Definitions'
import yaml from 'js-yaml'

let rows: { Name: string; Description: string; DefaultValue: string | number; Category: string }[] = []

beforeAll(() => {
  const configItems = MetricTable.map((item) => {
    return {
      description: item.Info.Description,
      name: item.Info.ConfigurationName,
      category: MeasureCategory[item.Info.MeasureCategory],
      defaultValue: item.Info.DefaultConfigValue,
    }
  })

  rows = configItems
    .map((entry) => ({
      Name: entry.name,
      Description: entry.description,
      DefaultValue: entry.defaultValue,
      Category: entry.category,
    }))
    .sort((a, b) => {
      if (a.Category < b.Category) {
        return -1
      }
      if (a.Category > b.Category) {
        return 1
      }
      return 0
    })
})

test('Generate documentation for configuration items', () => {
  const configValues = table({
    columns: [{ name: 'Name' }, { name: 'Description' }, { name: 'Category' }, { name: 'DefaultValue' }],
    rows: rows,
  })

  const defaultConfigMeasures = tsMarkdown([configValues])
  // write to file
  fs.writeFileSync('config.values.default.md', defaultConfigMeasures)
  expect(defaultConfigMeasures.length).toBeGreaterThan(0)
})

test('Generate input description for action.yaml file', () => {
  const inputDescription = rows.map((row) => {
    return `  ${row.Name}:
    description: ${row.Description}
    default: ${row.DefaultValue}
    required: false`
  })
  console.log(inputDescription)
  expect(1).toBe(1)

  const resultString = inputDescription.join('\n')
  fs.writeFileSync('config.values.default.yaml', resultString)
})

test('Generate valid input keys and patch the action.yaml file', () => {
  const inputValues: { [index: string]: { description: string; default: string | number; required: boolean } } = {}
  rows.map((row) => {
    inputValues[row.Name] = { description: row.Description, default: row.DefaultValue, required: false }
  })
  // load action yaml file
  const actions = yaml.load(fs.readFileSync('action.yaml', 'utf8')) as {
    inputs: { [index: string]: { description: string; default: string | number; required: boolean } }
  }
  actions.inputs = inputValues

  fs.writeFileSync('action.yaml', yaml.dump(actions))
  expect(1).toBe(1)
})

test('Generate configuration arguments for action code', () => {
  const inputValues: { [index: string]: { description: string; default: string | number; required: boolean } } = {}
  rows.map((row) => {
    inputValues[row.Name] = { description: row.Description, default: row.DefaultValue, required: false }
  })
  // open file
  fs.writeFileSync('src/action.config.args.ts', '//GENERATED FILE FROM report.config.tests.ts - DO NOT EDIT!!!\n\n')
  fs.writeFileSync('src/action.config.type.ts', '//GENERATED FILE FROM report.config.tests.ts - DO NOT EDIT!!!\n\n')
  fs.appendFileSync('src/action.config.args.ts', "import * as core from '@actions/core'\n\n")
  fs.appendFileSync('src/action.config.type.ts', 'type ConfigurationInputs = {\n')
  fs.appendFileSync('src/action.config.args.ts', 'export const config = {\n')
  for (const key in inputValues) {
    fs.appendFileSync(
      'src/action.config.args.ts',
      `  ${key}: core.getInput('${key}', { required: ${inputValues[key].required.toString()} }),\n`
    )
    fs.appendFileSync('src/action.config.type.ts', `  ${key}: string | number,\n`)
  }
  fs.appendFileSync('src/action.config.args.ts', '}')
  fs.appendFileSync('src/action.config.type.ts', '}\n')
  expect(1).toBe(1)
})
