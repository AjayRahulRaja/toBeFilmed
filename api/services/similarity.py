from sentence_transformers import SentenceTransformer, util

# Load a lightweight model
# 'all-MiniLM-L6-v2' is fast and good for this purpose
model = SentenceTransformer('all-MiniLM-L6-v2')

def calculate_similarity(text1: str, text2: str) -> float:
    """
    Calculates cosine similarity between two texts.
    Returns a score between 0.0 and 1.0.
    """
    if not text1 or not text2:
        return 0.0
        
    embeddings1 = model.encode(text1, convert_to_tensor=True)
    embeddings2 = model.encode(text2, convert_to_tensor=True)
    
    cosine_scores = util.cos_sim(embeddings1, embeddings2)
    return float(cosine_scores[0][0])

def check_originality(user_synopsis: str, candidate_overviews: list[str]):
    """
    Checks user synopsis against a list of candidate overviews.
    Returns the highest similarity score and the matching text.
    """
    highest_score = 0.0
    best_match = ""
    
    user_embedding = model.encode(user_synopsis, convert_to_tensor=True)
    
    for overview in candidate_overviews:
        if not overview:
            continue
        candidate_embedding = model.encode(overview, convert_to_tensor=True)
        score = float(util.cos_sim(user_embedding, candidate_embedding)[0][0])
        
        if score > highest_score:
            highest_score = score
            best_match = overview
            
    return highest_score, best_match
