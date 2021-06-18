const SAML = require('saml-encoder-decoder-js')

const encoded = async (encoded_saml, target, modify, callback) => {
  await SAML.decodeSamlPost(encoded_saml, function (
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

  return altered
}

module.exports = encoded
