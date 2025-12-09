import time

def generate_storyboard(scene_text: str):
    """
    Mock function to generate a storyboard image URL.
    In production, this would call OpenAI DALL-E or Stable Diffusion.
    """
    # Simulate processing time
    time.sleep(1) 
    return {
        "image_url": "https://placehold.co/600x400/EEE/31343C?text=Sketch+Storyboard",
        "prompt_used": f"Sketch style storyboard for: {scene_text[:50]}..."
    }

def generate_video(scene_text: str):
    """
    Mock function to generate a video URL.
    In production, this would call Replicate or Runway.
    """
    # Simulate processing time
    time.sleep(1)
    return {
        "video_url": "https://www.w3schools.com/html/mov_bbb.mp4", # Placeholder video
        "style": "black and white stickman"
    }

def generate_query_letter(synopsis: str, title: str):
    """
    Generates a query letter based on the synopsis.
    """
    return f"""
Dear Agent,

I am seeking representation for my new project, {title.upper()}.

LOGLINE: {synopsis[:100]}...

{synopsis}

This project is a high-concept thriller with a unique twist. 
I believe it would be a great fit for your roster.

Sincerely,
[Writer Name]
    """
