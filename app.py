from flask import Flask, flash, request, jsonify, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
import os


app = Flask(__name__)

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'Secrect')
toolbar = DebugToolbarExtension(app) 


#################################################################################
# Webpages


@app.route("/")
def homepage():
    return render_template("home.html")


@app.route("/stock-dashboard")
def stocks_data_page():
    NEWS_API = os.environ.get('NEWS_API')
    STOCK_API = os.environ.get('STOCK_API')
    return render_template("stocks/stock-dashboard.html", NEWS_API=NEWS_API, STOCK_API=STOCK_API)


@app.route("/crypto-dashboard")
def crypto_data_page():
    NEWS_API = os.environ.get('NEWS_API')
    CRYPTO_COMPARE_API = os.environ.get('CRYPTO_COMPARE_API')
    LUNA_CRUSH_API = os.environ.get('LUNA_CRUSH_API')
    return render_template("crypto/crypto-dashboard.html", NEWS_API=NEWS_API, CRYPTO_COMPARE_API=CRYPTO_COMPARE_API, LUNA_CRUSH_API=LUNA_CRUSH_API)




##########################################################################
# Error routes


@app.errorhandler(403)
def forbidden(e):
    return render_template('403.html'), 403

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


############################################################################
#Cache-Control

@app.after_request
def add_header(req):
    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragma"] = "no-cache"
    req.headers["Expires"] = "0"
    req.headers['Cache-Control'] = 'public, max-age=0'
    return req