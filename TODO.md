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
            [ ] Stop if JWT is presented
            [X] refresh-UUID validation
            [X] access-JWT generation and provision
            [X] refresh-UUID generation, provision and saving
        [X] Logout
            [X] Endpoint
            [X] Cookies removing
            [X] refresh-UUID removing from redis
    [X] PostgreSQL service
    [X] Redis service

[X] HTML + CSS for home page with your projects
[X] Project creation
    [X] Microservice
        [X] HTTP Server
        [X] Database
        [X] Project model
            [X] Project creation
        [X] Project creation endpoint
        [X] Passing JWT claims from cookie to context
        [X] Adding project to database and responding with ID
    [X] Script
[X] Projects render on home page
    [X] Backend
    [X] Fetch on frontend side
    [X] Render
[ ] Project page
[ ] Drawing
[ ] Authorization
[ ] Websocket connection
[ ] Autosaving
[ ] Circuit logic