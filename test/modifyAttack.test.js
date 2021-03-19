require('jest')
const fs = require('fs')
const ModifyAttack = require('lib/modifyAttack')
let xml_file

beforeEach(() => {
  xml_file = fs.readFileSync('test/resources/base_saml.xml', 'utf8')
})

describe('Happy Path', () => {
  let attribute_modify_file

  beforeEach(() => {
    attribute_modify_file = fs.readFileSync('test/resources/attribute_modify.xml', 'utf8')
  })
  it('Happy Path', () => {
    const modified_saml = ModifyAttack(xml_file, 'uid', 'modified')
    expect(modified_saml).toEqual(attribute_modify_file)
  })
})

describe('Invalid Input', () => {
  it('Undefined Saml', () => {
    expect(ModifyAttack(undefined, 'uid', 'modified')).toThrow('Invalid Saml Response')
  })

  it('Undefined Attribute', () => {
    expect(ModifyAttack(xml_file, undefined, 'modified')).toThrow('Invalid Assertion Attribute')
  })

  it('Undefined Modified Field', () => {
    expect(ModifyAttack(xml_file, 'uid', undefined)).toThrow('Invalid Modified Field')
  })

  it('Invalid Saml Response', () => {
    const invalid_saml = fs.readFileSync('test/resources/invalid_saml.xml', 'utf8')
    expect(ModifyAttack(invalid_saml, 'uid', 'modified')).toThrow('Invalid Saml Response')
  })
})

describe('Corner Cases', () => {
  it('Could not find Saml Attribute', () => {
    expect(ModifyAttack(xml_file, 'miss', 'modified')).toThrow('Saml Attribute Miss')
  })
})