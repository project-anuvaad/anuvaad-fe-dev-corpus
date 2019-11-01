const configs = {
    BASE_URL: 'http://ct.sci-suvas.org:8080/app/',
    AUTH_ENDPOINT: 'oauth2/authorize',
    LOGOUT_ENDPOINT: 'logout',
    POST_LOGOUT_URL:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/',
    RETURN_TO:'returnTo='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    RESPONSE_TYPE: 'response_type=token',
    //Test
    CLIENT_ID: 'client_id=e531b5b8-120d-46ba-8167-1f9d7cab2d58',
    //Prod
    // CLIENT_ID: 'client_id=55952c35-8387-4c56-8cf4-a3c1c63714eb',
    REDIRECT_URI: 'redirect_uri='+window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '')+'/callback',
    
};

export default configs;