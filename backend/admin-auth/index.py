import os
import json


def handler(event: dict, context) -> dict:
    """Проверка пароля администратора блога"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': 'Method not allowed'})
        }

    body = json.loads(event.get('body') or '{}')
    password = body.get('password', '')
    correct = os.environ.get('ADMIN_PASSWORD', '')

    if not correct:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': 'Секрет не настроен'})
        }

    if password == correct:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': True})
        }

    return {
        'statusCode': 401,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': False, 'error': 'Неверный пароль'})
    }
