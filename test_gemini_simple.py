#!/usr/bin/env python3
"""
Simple test script with better rate limit handling for Gemini.
"""

import time
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from test_case_generator import get_ai_provider, AI_CONFIG

def test_gemini_with_retry():
    """Test Gemini with retry logic for rate limits."""
    print("🧪 Testing Gemini API with retry logic...")
    
    try:
        # Get Gemini provider
        provider = get_ai_provider("gemini")
        print("✅ Gemini provider created successfully")
        
        # Simple test prompt
        test_story = """
User Story: As a user, I want to login to the system.

Acceptance Criteria:
1. User enters username and password
2. System validates credentials
3. User is redirected to dashboard
"""
        
        print("🔄 Testing with simple prompt...")
        result = provider.generate_test_cases(test_story, "TEST001")
        
        if result:
            print("✅ Success! Gemini is working.")
            print(f"📝 Generated content length: {len(result)} characters")
            return True
        else:
            print("❌ No result generated")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        if "429" in str(e) or "quota" in str(e).lower():
            print("💡 This is a rate limit error. Try again in a few minutes.")
        return False

def main():
    """Main test function."""
    print("🚀 Gemini Simple Test")
    print("=" * 30)
    
    # Check configuration
    print(f"🔧 Provider: {AI_CONFIG['provider']}")
    print(f"🤖 Model: {AI_CONFIG['gemini']['model']}")
    print()
    
    # Try the test
    success = test_gemini_with_retry()
    
    if success:
        print("\n🎉 Gemini is ready to use!")
        print("📋 Run: python test_case_generator.py --mode single")
    else:
        print("\n💡 Rate limit tips:")
        print("1. Wait 5-10 minutes before trying again")
        print("2. The free tier has daily limits")
        print("3. Try using a different API key if available")
        print("4. Consider switching to OpenAI temporarily")

if __name__ == "__main__":
    main() 