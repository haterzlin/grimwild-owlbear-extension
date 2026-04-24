
run server locally:

```
python3 -c "from http.server import HTTPServer, SimpleHTTPRequestHandler as SHTH; c = type('CORSRequestHandler', (SHTH,), {'end_headers': lambda self: [self.send_header('Access-Control-Allow-Origin', '*'), self.send_header('Access-Control-Allow-Methods', 'GET'), self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate'), SHTH.end_headers(self)]}); HTTPServer(('localhost', 8000), c).serve_forever()"
```

go to owlbear rodeo
install new extension from http://localhost:8000/manifest.json

and play

run tests with command:

```
npm run test:e2e
```

or 

```
npx playwright test tests/pools.spec.js
```

