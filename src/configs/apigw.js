const configs = {
    BASE_URL: (process.env.REACT_APP_APIGW_BASE_URL ? process.env.REACT_APP_APIGW_BASE_URL : 'http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com')+ '/app/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    POST_LOGOUT_URL:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : ''),
    RETURN_TO:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    RESPONSE_TYPE: 'response_type=token',
    //Test
    CLIENT_ID: 'client_id='+(process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID:'ef79a009-444e-4de4-90c4-52a17ec783f9'),
    //Prod
    // CLIENT_ID: 'client_id=ce88c83f-7e87-403b-95cf-4eefe80da72e',
    REDIRECT_URI: 'redirect_uri='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    
};

export default configs;