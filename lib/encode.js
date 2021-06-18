const encode = async (data) => {
  await SAML.encodeSamlPost(data.SAMLResponse, function (err, encoded) {
    if (!err) {
      data.SAMLResponse = encoded
    }
  })

  return qs.stringify(data)
}

module.exports = encode
