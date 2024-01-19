from flask import Flask, redirect, request, jsonify, render_template, session, url_for
import requests

app = Flask(__name__, static_url_path='/static')
app.secret_key = '11331'  # Troque por uma chave segura para sessões

@app.route('/')
def home():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

##                ##
## Discord OAuth2 ##
##                ##

# Configurações do Discord OAuth2
CLIENT_ID = '1193955842236616946'
CLIENT_SECRET = 's5VqyuyOJ4IuLJss_gcSrOyftyDvvwIV'
REDIRECT_URI = 'http://localhost:5000/home'
DISCORD_API_URL = 'https://discord.com/api'

# Rota para onde o Discord redirecionará após a autorização
@app.route('/home')
def callback():
    # Verifica se o usuário autorizou ou negou o acesso
    if 'code' in request.args:
        # Troca o código de autorização pelo token de acesso
        code = request.args.get('code')
        data = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'scope': 'identify email'
        }
        response = requests.post(f'{DISCORD_API_URL}/oauth2/token', data=data)
        token_data = response.json()

        # Obtém informações do usuário usando o token de acesso
        user_response = requests.get(f'{DISCORD_API_URL}/users/@me', headers={'Authorization': f'Bearer {token_data["access_token"]}'})
        user_data = user_response.json()

        # Armazena as informações do usuário na sessão (ou no banco de dados)
        session['user'] = user_data

        # Redireciona para a página de perfil
        return redirect(url_for('home'))
    else:
        return redirect(url_for('home'))

# Rota para iniciar o processo de login
@app.route('/__auth')
def login():
    return redirect(f'{DISCORD_API_URL}/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code&scope=identify email')

# Rota para exibir o perfil do usuário
@app.route('/__authuser')
def profile():
    user = session.get('user')
    if user:
        return jsonify(user)
    else:
        return 'Unauthenticated user'

# Rota de logout
@app.route('/__authlogout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(port=5000)
    app.run(debug=True)
