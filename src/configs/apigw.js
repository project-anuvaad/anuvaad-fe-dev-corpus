const configs = {
    BASE_URL: (process.env.REACT_APP_APIGW_BASE_URL ? process.env.REACT_APP_APIGW_BASE_URL : 'http://auth.anuvaad.org')+ '/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    POST_LOGOUT_URL:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/',
    RETURN_TO:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    RESPONSE_TYPE: 'response_type=token',
    //Test
    // CLIENT_ID: 'client_id=fc7ed37f-546a-41d3-b0f4-96e6ab8274bf',
    //Prod
    CLIENT_ID: 'client_id='+process.env.REACT_APP_CLIENT_ID ,
    REDIRECT_URI: 'redirect_uri='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    
};

export default configs;