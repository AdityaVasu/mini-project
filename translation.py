from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)
translator = Translator()


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        result = translator.translate(text, dest="en")
        print(result.text)
        return jsonify({
            'source_text': text,
            'translated_text': result.text,
        })
    except Exception as e:
        print(e)
        print(text)
        return jsonify({'error': str(e)}), 500
    
    


if __name__ == '__main__':
    app.run(debug=True)
#googletrans==3.1.0a0