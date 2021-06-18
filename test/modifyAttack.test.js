require('jest')
const fs = require('fs')
const ModifyAttack = require('../lib/modifyAttack')
let xml_file

beforeEach(() => {
  xml_file = fs.readFileSync('test/resources/base_saml.xml', 'utf8')
})

describe('Happy Path', () => {
  let attribute_modify_file

  beforeEach(() => {
    attribute_modify_file = fs.readFileSync('test/resources/attribute_modify.xml', 'utf8')
  })
  it('Modify', async () => {
    const modified_saml = await ModifyAttack(xml_file, 'uid', 'modified')
    expect(modified_saml).toEqual(attribute_modify_file)
  })
})

describe('Comment Trunctation', () => {
  let comment_truncation_file

  beforeEach(() => {
    comment_truncation_file = fs.readFileSync('test/resources/comment_truncation.xml', 'utf8')
  })
  it('Happy Path', async () => {
    const modified_saml = await ModifyAttack(xml_file, 'uid', 'te<!-- attack -->st')
    expect(modified_saml).toEqual(comment_truncation_file)
  })
})

describe('Invalid Input', () => {
  it('Undefined Saml', async () => {
    try {
      await ModifyAttack(undefined, 'uid', 'modified')
      fail('An error was expected')
    } catch (error) {
      expect(error).toEqual('Invalid Saml Response')
    }
  })

  it('Undefined Attribute', async () => {
    try {
      await ModifyAttack(xml_file, undefined, 'modified')
      fail('An error was expected')
    } catch (error) {
      expect(error).toEqual('Invalid Assertion Attribute')
    }
  })

  it('Undefined Modified Field', async () => {
    try {
      await ModifyAttack(xml_file, 'uid', undefined)
      fail('An error was expected')
    } catch (error) {
      expect(error).toEqual('Invalid Modified Field')
    }
  })
})

describe('Corner Cases', () => {
  it('Could not find Saml Attribute', async () => {
    try {
      await ModifyAttack(xml_file, 'miss', 'modified')
      fail('An error was expected')
    } catch (error) {
      expect(error).toEqual('Saml Attribute Miss')
    }
  })
})
