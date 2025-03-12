[X] Basic file layout
[X] Dummy home page

[X] Authentication
    [X] Gateway
        [X] Reverse proxy to user api
    [X] Special page for both signing in and up
        [X] HTML + CSS
        [X] Script
    [X] User microservice
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
        [X] Refresh
            [X] Endpoint
            [X] refresh-UUID validation
            [X] access-JWT generation and provision
            [X] refresh-UUID generation, provision and saving
        [X] Logout
            [X] Endpoint
            [X] Cookeis removing
            [X] refresh-UUID removing
    [X] PostgreSQL service
    [X] Redis service

[X] HTML + CSS for home page with your projects
[ ] Projects microservice
    [X] Microservice
    [X] HTTP Server
    [X] Database
    [ ] Project model
        [ ] Project creation
    [ ] Passing jwt claims from cookie to context 
    [ ] Project creation endpoint
[ ] Projects render on frontend
[ ] Project page frontend
[ ] Drawing
[ ] Authorization
[ ] Websocket connection
[ ] Autosaving
[ ] Circuit logic