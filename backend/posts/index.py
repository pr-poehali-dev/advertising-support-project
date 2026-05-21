import json
import os
import re
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-zа-я0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'-+', '-', text)
    return text or 'post'

def handler(event: dict, context) -> dict:
    """CRUD для статей блога: GET - список/одна статья, POST - создание"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}

    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == 'GET':
            slug = params.get('slug')
            if slug:
                cur.execute(
                    "SELECT id, slug, title, emoji, read_time, description, category, content, created_at FROM posts WHERE slug = %s",
                    (slug,)
                )
                row = cur.fetchone()
                if not row:
                    return {'statusCode': 404, 'headers': cors, 'body': json.dumps({'error': 'Not found'})}
                post = {
                    'id': row[0], 'slug': row[1], 'title': row[2], 'emoji': row[3],
                    'readTime': row[4], 'description': row[5], 'category': row[6],
                    'content': row[7], 'createdAt': row[8].isoformat()
                }
                return {'statusCode': 200, 'headers': cors, 'body': json.dumps(post, ensure_ascii=False)}
            else:
                cur.execute(
                    "SELECT id, slug, title, emoji, read_time, description, category, created_at FROM posts ORDER BY created_at DESC"
                )
                rows = cur.fetchall()
                posts = [
                    {'id': r[0], 'slug': r[1], 'title': r[2], 'emoji': r[3],
                     'readTime': r[4], 'description': r[5], 'category': r[6],
                     'createdAt': r[7].isoformat()}
                    for r in rows
                ]
                return {'statusCode': 200, 'headers': cors, 'body': json.dumps(posts, ensure_ascii=False)}

        elif method == 'POST':
            body = json.loads(event.get('body') or '{}')
            title = body.get('title', '').strip()
            if not title:
                return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'title required'})}

            base_slug = slugify(title)
            slug = base_slug
            cur.execute("SELECT id FROM posts WHERE slug = %s", (slug,))
            if cur.fetchone():
                import time
                slug = f"{base_slug}-{int(time.time())}"

            cur.execute(
                "INSERT INTO posts (slug, title, emoji, read_time, description, category, content) VALUES (%s,%s,%s,%s,%s,%s,%s) RETURNING id, slug",
                (slug, title, body.get('emoji', '📝'), body.get('readTime', '5 мин'),
                 body.get('description', ''), body.get('category', 'основы'), body.get('content', ''))
            )
            row = cur.fetchone()
            conn.commit()
            return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'id': row[0], 'slug': row[1]}, ensure_ascii=False)}

        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    finally:
        cur.close()
        conn.close()
