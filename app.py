from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_browser_data():
    conn = sqlite3.connect('browsers.db')
    cursor = conn.cursor()
    cursor.execute('SELECT browser, COUNT(*) FROM requests GROUP BY browser')
    data = cursor.fetchall()
    conn.close()
    return {browser: count for browser, count in data}

@app.route('/api/browsers', methods=['GET'])
def browser_data():
    return jsonify(get_browser_data())

if __name__ == '__main__':
    # Initialize database
    conn = sqlite3.connect('browsers.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS requests
                      (id INTEGER PRIMARY KEY, browser TEXT)''')
    # Insert sample data
    cursor.execute('DELETE FROM requests')
    sample_data = [('Chrome',), ('Firefox',), ('Safari',), ('Edge',), ('Opera',), 
                   ('Chrome',), ('Chrome',), ('Firefox',), ('Safari',)]
    cursor.executemany('INSERT INTO requests (browser) VALUES (?)', sample_data)
    conn.commit()
    conn.close()
    app.run(debug=True)
