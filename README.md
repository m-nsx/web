## To run the project

1. Clone the repo

```
git clone https://github.com/m-nsx/web.git
```

2. Install packages (run in root folder)

```
npm run install
```

3. If auto install doesn't work, manually install packages in each folder (run in both root folder, backend folder and frontend folder)

```
npm install
```

3. Start the server (run in root folder)

```
npm run start
```

5. Access the server at http://localhost:3000

## Troubleshooting

### Help ! I'm stuck with evil Macron / refused access screen and I can no longer access the webapp.

1. Cookies are unhealthy, get rid of them ! Your browser may be at risk of hyperglycemia...

### Aww the port is already in use, what should I do ?

1. Find the process

```
netstat -ano | findstr :<port>
```

2. Kill the process

```
taskkill /PID <PID> /F
```