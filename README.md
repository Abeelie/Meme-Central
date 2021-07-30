# Meme Central

Meme Central is web app that shows real time financial data on meme stocks and meme crypto.

## Installation

Before cloning, you need your own API keys for the application to work.

API Sources

1. https://iexcloud.io/docs/api/
2. https://gnews.io/
3. https://lunarcrush.com/developers/docs
4. https://min-api.cryptocompare.com/
5. https://www.coingecko.com/en/api (this one has no key its free)

```bash
git clone https://github.com/Abeelie/Meme-Central.git
cd Meme-Central
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
set FLASK_ENV=development
flask run
```