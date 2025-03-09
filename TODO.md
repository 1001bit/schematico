[X] Basic file layout
[X] Dummy home page

[ ] Authentication
    [ ] Gateway
        [X] Reverse proxy to user api
        [ ] Special page for both signing in and up
            [X] HTML + CSS
            [ ] Script
    [ ] User microservice
        [X] Microservice
        [X] Dummy endpoint
        [ ] Register
            [ ] Endpoint
            [ ] User creation
                [ ] Username validation
                [ ] Password hashing
                [ ] New user storing
            [ ] access-JWT generation and provision
            [ ] refresh-UUID generation, provision and saving
        [ ] Login
            [ ] Endpoint
            [ ] Credentials validation
                [ ] finding username
                [ ] password validation
            [ ] access-JWT generation and provision
            [ ] refresh-UUID generation, provision and saving
        [ ] Refresh
            [ ] Endpoint
            [ ] refresh-UUID validation
            [ ] access-JWT generation and provision
            [ ] refresh-UUID generation, provision and saving
        [ ] Logout
            [ ] Endpoint
            [ ] JWT-validation
            [ ] refresh-UUID removing
    [X] PostgreSQL service
    [X] Redis service

[ ] HTML + CSS for home page with your projects
[ ] Backend for project creation
[ ] Project page frontend
[ ] Drawing
[ ] Authorization
[ ] Websocket connection
[ ] Autosaving
[ ] Circuit logic