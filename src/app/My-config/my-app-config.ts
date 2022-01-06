export default{
    oidc :{
        clientId: '0oa33t0exf8D5u58S5d7',
        issuer:'https://dev-82995265.okta.com/oauth2/default',
        redirectUri:'http://localhost:4200/okta/callback',
        scopes:['openid','profile','email'],
        pkce: true
    }
}