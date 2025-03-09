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
        [ ] Sign in
            [X] Dummy Endpoint
            [X] Inputs validation
            [ ] Model
                [ ] Database connection
                    [ ] Acc creation
                        [ ] Find username duplicates
                        [ ] Password hashing
                        [ ] Store new user in database
                    [ ] Sign in
                        [ ] Credentials validation
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