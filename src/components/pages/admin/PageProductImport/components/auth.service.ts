export function getAuthToken() {
    const authorizationToken = localStorage.getItem('authorization_token');

    console.log('token:', authorizationToken);

    return authorizationToken ? `Basic ${authorizationToken}` : undefined;
}