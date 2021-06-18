const SAML = require("saml-encoder-decoder-js");

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
