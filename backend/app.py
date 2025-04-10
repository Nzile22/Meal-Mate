from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from model import db, User, Recipe, Meal

app = Flask(__name__)
# Configure CORS based on environment
if os.environ.get('FLASK_ENV') == 'production':
    CORS(app, resources={
        r"/*": {
            "origins": ["https://*.onrender.com"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
else:
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173", "http://localhost:5176", "http://localhost:5178"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })

@app.route('/login', methods=['OPTIONS'])
def login_options():
    return '', 200

@app.route('/register', methods=['OPTIONS'])  
def register_options():
    return '', 200

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mealmate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

db.init_app(app)
migrate = Migrate(app, db)

# ---------------- AUTH ROUTES ---------------- #

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 415
        data = request.get_json()
        
        if not data or 'username' not in data or 'email' not in data or 'password' not in data:
            return jsonify(message="Invalid request data"), 400

        if User.query.filter_by(username=data['username']).first():
            return jsonify(message="Username already exists"), 400

        if User.query.filter_by(email=data['email']).first():
            return jsonify(message="Email already exists"), 400

        try:
            hashed_password = generate_password_hash(data['password'])
            new_user = User(
                username=data['username'],
                email=data['email'],
                password=hashed_password
            )
            db.session.add(new_user)
            db.session.commit()
            return jsonify(message="User registered successfully"), 201
        except Exception as e:
            db.session.rollback()
            return jsonify(error=str(e)), 500

@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        if request.method == 'GET':
            return jsonify({"message": "Login endpoint"}), 200
        elif request.method == 'POST':
            if not request.is_json:
                return jsonify({"error": "Missing JSON in request"}), 415
            data = request.get_json()
            
            if not data or 'password' not in data:
                return jsonify({"error": "Password is required"}), 400

            # Accept multiple field names for username/email
            username_or_email = data.get('username_or_email') or data.get('email') or data.get('username')
            if not username_or_email:
                return jsonify({"error": "Username or email is required"}), 400

            user = User.query.filter(
                (User.username == username_or_email) |
                (User.email == username_or_email)
            ).first()

            if not user or not check_password_hash(user.password, data['password']):
                return jsonify({"error": "Invalid credentials"}), 401

            return jsonify({
                "message": "Login successful",
                "user_id": user.id,
                "username": user.username,
                "email": user.email
            }), 200

    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# ---------------- RECIPE ROUTES ---------------- #

@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([
        {
            'id': r.id,
            'title': r.title,
            'ingredients': r.ingredients,
            'instructions': r.instructions,
            'user_id': r.user_id
        } for r in recipes
    ])

@app.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()

    if not all(k in data for k in ['title', 'ingredients', 'user_id']):
        return jsonify(error="Missing required fields"), 400

    try:
        new_recipe = Recipe(
            title=data['title'],
            ingredients=data['ingredients'],
            instructions=data.get('instructions', ''),
            user_id=data['user_id']
        )
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify(message="Recipe added successfully"), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_by_id(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    return jsonify({
        'id': recipe.id,
        'title': recipe.title,
        'ingredients': recipe.ingredients,
        'instructions': recipe.instructions
    })

@app.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    data = request.get_json()
    recipe = Recipe.query.get_or_404(recipe_id)

    recipe.title = data.get('title', recipe.title)
    recipe.ingredients = data.get('ingredients', recipe.ingredients)
    recipe.instructions = data.get('instructions', recipe.instructions)

    db.session.commit()
    return jsonify(message="Recipe updated successfully")

@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify(message="Recipe deleted successfully")

# ---------------- MEAL ROUTES ---------------- #

@app.route('/meals', methods=['GET'])
def get_meals():
    meals = Meal.query.all()
    return jsonify([
        {
            'id': m.id,
            'name': m.name,
            'date': m.date.strftime('%Y-%m-%d'),
            'user_id': m.user_id,
            'recipe_id': m.recipe_id,
            'notes': m.notes
        } for m in meals
    ])

@app.route('/meals', methods=['POST'])
def add_meal():
    data = request.get_json()

    if not all(k in data for k in ['date', 'user_id', 'recipe_id']):
        return jsonify(error="Missing required fields"), 400

    try:
        new_meal = Meal(
            name=data.get('name', ''),
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            user_id=data['user_id'],
            recipe_id=data['recipe_id'],
            notes=data.get('notes', '')
        )
        db.session.add(new_meal)
        db.session.commit()
        return jsonify(message="Meal added successfully"), 201
    except ValueError:
        return jsonify(error="Invalid date format. Use YYYY-MM-DD"), 400
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/meals/<int:meal_id>', methods=['GET'])
def get_meal_by_id(meal_id):
    meal = Meal.query.get_or_404(meal_id)
    return jsonify({
        'id': meal.id,
        'name': meal.name,
        'date': meal.date.strftime('%Y-%m-%d'),
        'user_id': meal.user_id,
        'recipe_id': meal.recipe_id,
        'notes': meal.notes
    })

@app.route('/meals/<int:meal_id>', methods=['PUT'])
def update_meal(meal_id):
    data = request.get_json()
    meal = Meal.query.get_or_404(meal_id)

    try:
        meal.name = data.get('name', meal.name)
        meal.date = datetime.strptime(data['date'], '%Y-%m-%d')
        meal.user_id = data['user_id']
        meal.recipe_id = data['recipe_id']
        meal.notes = data.get('notes', meal.notes)

        db.session.commit()
        return jsonify(message="Meal updated successfully")
    except ValueError:
        return jsonify(error="Invalid date format. Use YYYY-MM-DD"), 400
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500

@app.route('/meals/<int:meal_id>', methods=['DELETE'])
def delete_meal(meal_id):
    meal = Meal.query.get_or_404(meal_id)
    db.session.delete(meal)
    db.session.commit()
    return jsonify(message="Meal deleted successfully")

# ---------------- RUN APP ---------------- #

if __name__ == '__main__':
    app.run(debug=True, port=5000)
