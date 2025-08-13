# AI Provider Setup Guide

This guide shows you how to configure different AI providers for the Test Case Generator.

## 🚀 Quick Setup

### 1. **OpenAI (Default)**
Already configured! Just replace the API key in `test_case_generator.py`:
```python
"api_key": "your-openai-api-key-here"
```

### 2. **Anthropic Claude** (Recommended Alternative)
1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Update `AI_CONFIG` in `test_case_generator.py`:
```python
AI_CONFIG = {
    "provider": "anthropic",  # Change this
    "anthropic": {
        "api_key": "your-anthropic-api-key-here",
        "model": "claude-3-sonnet-20240229"
    }
}
```

### 3. **Google Gemini**
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update `AI_CONFIG`:
```python
AI_CONFIG = {
    "provider": "gemini",  # Change this
    "gemini": {
        "api_key": "your-gemini-api-key-here",
        "model": "gemini-1.5-pro"
    }
}
```

### 4. **Azure OpenAI**
1. Set up Azure OpenAI service in Azure portal
2. Get API key and endpoint from Azure
3. Update `AI_CONFIG`:
```python
AI_CONFIG = {
    "provider": "azure_openai",  # Change this
    "azure_openai": {
        "api_key": "your-azure-api-key-here",
        "endpoint": "https://your-resource.openai.azure.com/",
        "deployment_name": "your-deployment-name",
        "api_version": "2024-02-15-preview"
    }
}
```

## 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

## 🎯 Provider Comparison

| Provider | Pros | Cons | Best For |
|----------|------|------|----------|
| **OpenAI** | Widely used, reliable | Expensive | General use |
| **Anthropic** | High quality, good reasoning | Limited free tier | Complex analysis |
| **Gemini** | Free tier, fast | Less consistent | Budget-conscious |
| **Azure OpenAI** | Enterprise features | Complex setup | Corporate environments |

## 🔧 Usage Examples

### Switch to Anthropic:
```python
# In test_case_generator.py, change:
AI_CONFIG["provider"] = "anthropic"
```

### Switch to Gemini:
```python
# In test_case_generator.py, change:
AI_CONFIG["provider"] = "gemini"
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Module not found" errors:**
   ```bash
   pip install anthropic google-generativeai
   ```

2. **API key errors:**
   - Verify your API key is correct
   - Check that you have sufficient credits
   - Ensure the API key has the right permissions

3. **Model not found:**
   - Check the model name is correct for your provider
   - Some models may not be available in all regions

## 💡 Tips

- **Anthropic Claude** is excellent for structured outputs like test cases
- **Gemini** has a generous free tier for testing
- **Azure OpenAI** is best for enterprise environments
- You can easily switch between providers by changing the `provider` field

## 🔄 Switching Providers

To switch providers, simply change one line in `test_case_generator.py`:

```python
AI_CONFIG = {
    "provider": "anthropic",  # Change this line
    # ... rest of config
}
```

Then run your script as usual:
```bash
python test_case_generator.py --mode single
``` 