const configs = {
    BASE_URL: 'http://nlp-nmt-160078446.us-west-2.elb.amazonaws.com/app/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    POST_LOGOUT_URL:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : ''),
    RETURN_TO:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    RESPONSE_TYPE: 'response_type=token&scope=view',
    //Test
    CLIENT_ID: 'client_id=6d810055-185e-4799-baba-c78693da6134',
    //Prod
    // CLIENT_ID: 'client_id=fc7ed37f-546a-41d3-b0f4-96e6ab8274bf',
    REDIRECT_URI: 'redirect_uri='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    
};

export default configs;