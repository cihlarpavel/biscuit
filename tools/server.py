# Lokální test: server bez mezipaměti (prostý http.server nechá prohlížeč držet staré moduly).
import http.server, functools, os
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
http.server.ThreadingHTTPServer(('127.0.0.1', 8777), H).serve_forever()
