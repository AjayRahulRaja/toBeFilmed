from services.similarity import calculate_similarity

MOCK_SCENE_DB = [
    {
        "film": "The Godfather",
        "year": 1972,
        "director": "Francis Ford Coppola",
        "runtime": "2h 55m",
        "language": "English",
        "scene_timestamp": "00:28:15",
        "text": "I'm going to make him an offer he can't refuse. One day, and this day may never come, I will call upon you to do a service for me."
    },
    {
        "film": "Taxi Driver",
        "year": 1976,
        "director": "Martin Scorsese",
        "runtime": "1h 54m",
        "language": "English",
        "scene_timestamp": "00:35:40",
        "text": "You talkin' to me? You talkin' to me? Then who the hell else are you talkin' to? You talkin' to me? Well, I'm the only one here."
    },
    {
        "film": "Pulp Fiction",
        "year": 1994,
        "director": "Quentin Tarantino",
        "runtime": "2h 34m",
        "language": "English",
        "scene_timestamp": "00:18:22",
        "text": "The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of the darkness."
    },
    {
        "film": "The Dark Knight",
        "year": 2008,
        "director": "Christopher Nolan",
        "runtime": "2h 32m",
        "language": "English",
        "scene_timestamp": "00:05:10",
        "text": "I believe whatever doesn't kill you, simply makes you... stranger."
    },
    {
        "film": "Fight Club",
        "year": 1999,
        "director": "David Fincher",
        "runtime": "2h 19m",
        "language": "English",
        "scene_timestamp": "01:12:05",
        "text": "The first rule of Fight Club is: You do not talk about Fight Club. The second rule of Fight Club is: You do not talk about Fight Club."
    },
    {
        "film": "Casablanca",
        "year": 1942,
        "director": "Michael Curtiz",
        "runtime": "1h 42m",
        "language": "English",
        "scene_timestamp": "01:38:55",
        "text": "Here's looking at you, kid."
    },
     {
        "film": "Star Wars: Episode V - The Empire Strikes Back",
        "year": 1980,
        "director": "Irvin Kershner",
        "runtime": "2h 4m",
        "language": "English",
        "scene_timestamp": "01:51:30",
        "text": "No. I am your father. That's not true. That's impossible! Search your feelings, you know it to be true."
    },
    {
        "film": "La La Land",
        "year": 2016,
        "director": "Damien Chazelle",
        "runtime": "2h 8m",
        "language": "English",
        "scene_timestamp": "01:05:22",
        "text": "City of stars, are you shining just for me? City of stars, there's so much that I can't see."
    }
]

def find_matching_scene(user_text: str, threshold: float = 0.6):
    """
    Compares user_text against the MOCK_SCENE_DB.
    Returns the best match if score > threshold.
    """
    if not user_text or len(user_text) < 20: # Don't match very short phrases
        return None
        
    best_match = None
    highest_score = 0.0
    
    for scene in MOCK_SCENE_DB:
        score = calculate_similarity(user_text, scene["text"])
        
        if score > highest_score:
            highest_score = score
            best_match = scene
            
    if highest_score >= threshold:
        # Return a copy with the score included
        result = best_match.copy()
        result["match_score"] = round(highest_score * 100) # Percentage
        return result
        
    return None
