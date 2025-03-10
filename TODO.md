[X] Basic file layout
[X] Dummy home page

[ ] Authentication
    [X] Gateway
        [X] Reverse proxy to user api
    [X] Special page for both signing in and up
        [X] HTML + CSS
        [X] Script
    [ ] User microservice
        [X] Microservice
        [X] Sign in
            [X] Endpoint
            [X] Inputs validation
            [X] Model
                [X] Database connection
                [X] Acc creation
                    [X] Password hashing
                    [X] Store new user in database
                [X] Sign in
                    [X] Credentials validation
            [X] access-JWT generation and provision
            [X] refresh-UUID generation, provision and saving
        [ ] Refresh
            [ ] Endpoint
            [ ] refresh-UUID validation
            [ ] access-JWT generation and provision
            [ ] refresh-UUID generation, provision and saving
        [ ] Logout
            [ ] Endpoint
            [ ] UUID-validation
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