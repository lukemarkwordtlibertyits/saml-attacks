const qs = require('querystring')
const SAML = require('saml-encoder-decoder-js')

const decode = async () => {
  post_string = request.postData()
  post_data = qs.parse(post_string)
  let decoded
  await SAML.decodeSamlPost(post_data.SAMLResponse, function (
    err,
    encoded
  ) {
    if (!err) {
      decoded = encoded
    }
  })

  return parsed
}

module.exports = decode
