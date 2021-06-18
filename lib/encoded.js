const { v4: uuidv4 } = require("uuid");
const puppeteer = require("puppeteer");
const { isSensitiveError, isIcnError } = require("./page-assertions");
const { logger } = require("saml-proxy-automation/logging/logger.js");
const qs = require("querystring");
const SAML = require("saml-encoder-decoder-js");
var parseString = require("xml2js").parseString;
var xml2js = require("xml2js");

const encoded = async (encoded_saml, target, modify, callback) => {
  post_data = encoded_saml
  let decoded
  await SAML.decodeSamlPost(post_data.SAMLResponse, function (
    err,
    encoded
  ) {
    if (!err) {
      decoded = encoded
    }
  })

  const parsed = await callback(decoded, target, modify)

  let altered

  await SAML.encodeSamlPost(parsed, function (err, encoded) {
    if (!err) {
      altered = encoded
    }
  })
  post_data.SAMLResponse = altered

  return post_data
}

module.exports = encoded
