import re
import random

def analyze_script(script_text: str):
    """
    Analyzes a raw screenplay text to extract statistics for the completion certificate.
    Returns a dictionary with stats.
    """
    
    # 1. Page Count Estimation (Industry standard: ~250 words/page)
    word_count = len(script_text.split())
    estimated_pages = max(1, round(word_count / 250))
    
    # 2. Locations (INT. / EXT. headers)
    # Regex looks for lines starting with INT. or EXT.
    location_pattern = re.compile(r'^\s*(?:INT\.|EXT\.|INT\./EXT\.)\s+(.+?)(?:\s-\s|$)', re.MULTILINE | re.IGNORECASE)
    locations = list(set(location_pattern.findall(script_text)))
    location_count = len(locations)
    
    # 3. Characters
    # Heuristic: Uppercase lines centered (simplified to just uppercase lines not being scene headers)
    # A meaningful character usually speaks, so they have dialogue blocks.
    # We'll look for CAPPED names that preceed dialogue.
    # Making it simple: scan for lines that are ALL CAPS, not scene headers, and length < 30 chars
    character_pattern = re.compile(r'^\s*([A-Z][A-Z0-9\s\(\)]+?)\s*$', re.MULTILINE)
    raw_characters = character_pattern.findall(script_text)
    
    # Filter out common non-character headers
    excluded_headers = {'CUT TO:', 'FADE IN:', 'FADE OUT:', 'THE END', 'TRANSITION:', 'BLACK.', 'CONTINUED:'}
    valid_characters = set()
    
    for char in raw_characters:
        clean_char = char.strip()
        if (clean_char 
            and clean_char not in excluded_headers 
            and "INT." not in clean_char 
            and "EXT." not in clean_char
            and len(clean_char) < 40): # Names rarely exceed 40 chars
            
            # Remove parentheticals (V.O.), (O.S.)
            clean_char = re.sub(r'\s*\(.*?\)', '', clean_char).strip()
            if clean_char:
                valid_characters.add(clean_char)
                
    character_count = len(valid_characters)
    
    # 4. Languages (Mock detection for now, unless specific keywords found)
    languages = ["English"]
    if "Spanish" in script_text or "(in Spanish)" in script_text:
        languages.append("Spanish")
    if "French" in script_text or "(in French)" in script_text:
        languages.append("French")
    
    # 5. Potential Hit Markets (Fun Heuristic)
    # Map common locations to countries
    market_map = {
        "PARIS": "France",
        "LONDON": "United Kingdom",
        "TOKYO": "Japan",
        "NEW YORK": "USA",
        "LOS ANGELES": "USA",
        "BERLIN": "Germany",
        "MUMBAI": "India",
        "SEOUL": "South Korea",
        "ROME": "Italy",
        "RIO": "Brazil"
    }
    
    potential_markets = {"USA", "Global Streaming"} # Defaults
    
    # Check locations for matches
    for loc in locations:
        upper_loc = loc.upper()
        for key, country in market_map.items():
            if key in upper_loc:
                potential_markets.add(country)
                
    # Add a random "Surprise Hit" market for fun if list is short
    if len(potential_markets) < 3:
        random_markets = ["Japan", "South Korea", "Brazil", "Australia", "Canada", "France"]
        potential_markets.add(random.choice(random_markets))
        
    return {
        "page_count": estimated_pages,
        "location_count": location_count,
        "character_count": character_count,
        "languages": list(set(languages)),
        "potential_markets": list(potential_markets),
        "locations_preview": locations[:5] if locations else []
    }
