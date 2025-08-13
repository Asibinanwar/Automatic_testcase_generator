# Test Case Generator Web Application

A modern, beautiful web interface for the AI-powered Test Case Generator. This web application provides an intuitive and responsive user experience for generating test cases from user stories.

## ✨ Features

- **Modern Web Interface**: Beautiful, responsive design with smooth animations
- **AI Provider Support**: Multiple AI providers (Gemini, OpenAI, Anthropic)
- **Real-time Generation**: Generate test cases instantly with AI
- **Export Functionality**: Download test cases as Excel files
- **Example Stories**: Pre-loaded example user stories for quick testing
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Copy to Clipboard**: Easy copying of generated test cases
- **Form Validation**: Real-time validation and user feedback

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the Web Application

```bash
python run_webapp.py
```

Or directly with Flask:

```bash
python app.py
```

### 3. Open Your Browser

Navigate to: `http://localhost:5000`

The application will automatically open in your default browser.

## 🏗️ Architecture

### Backend (Flask)
- **`app.py`**: Main Flask application with API endpoints
- **`test_case_generator.py`**: Core AI-powered test case generation logic
- **API Endpoints**:
  - `POST /api/generate`: Generate test cases
  - `POST /api/export`: Export to Excel
  - `GET /api/providers`: Get available AI providers
  - `GET /api/examples`: Get example user stories

### Frontend
- **`templates/index.html`**: Main HTML template
- **`static/css/style.css`**: Modern CSS with animations and responsive design
- **`static/js/app.js`**: JavaScript for interactivity and API calls

## 🎨 User Interface

### Configuration Section
- **AI Provider Selection**: Choose between Gemini, OpenAI, or Anthropic
- **Story ID**: Custom identifier for your user story
- **Story Title**: Descriptive title for the feature

### Input Section
- **User Story**: Enter your user story in the standard format
- **Acceptance Criteria**: List the acceptance criteria
- **Load Examples**: Quick access to pre-defined examples
- **Generate**: AI-powered test case generation

### Results Section
- **Generated Test Cases**: View AI-generated test cases
- **Export to Excel**: Download as Excel file
- **Copy to Clipboard**: Easy copying for other tools

## 🔧 Configuration

### AI Provider Setup

The application supports multiple AI providers. Configure your API keys in `test_case_generator.py`:

```python
AI_CONFIG = {
    "provider": "gemini",  # Default provider
    "gemini": {
        "api_key": "your-gemini-api-key",
        "model": "gemini-2.0-flash"
    },
    "openai": {
        "api_key": "your-openai-api-key",
        "model": "gpt-4"
    },
    # ... other providers
}
```

### Environment Variables (Optional)

You can also set API keys as environment variables:

```bash
export GEMINI_API_KEY="your-key-here"
export OPENAI_API_KEY="your-key-here"
export ANTHROPIC_API_KEY="your-key-here"
```

## 📱 Responsive Design

The web application is fully responsive and works on:
- **Desktop**: Full-featured interface with side-by-side layout
- **Tablet**: Optimized for touch interaction
- **Mobile**: Mobile-first design with stacked layout

## 🎯 Usage Examples

### Basic Usage

1. **Select AI Provider**: Choose your preferred AI service
2. **Enter Story ID**: Use a meaningful identifier (e.g., "US001")
3. **Write User Story**: Follow the format: "As a [user], I want [feature] so that [benefit]"
4. **Add Acceptance Criteria**: List specific requirements
5. **Generate**: Click to create test cases
6. **Export**: Download as Excel or copy to clipboard

### Example User Story

```
As a customer, I want to reset my password so that I can regain access to my account if I forget my credentials.

Acceptance Criteria:
1. User can click "Forgot Password" link on login page
2. User enters their email address in the password reset form
3. System validates email format and existence in database
4. System sends password reset email with secure token
5. User clicks link in email to access password reset page
6. User enters new password and confirms it
7. System validates password strength requirements
8. System updates password in database and invalidates old token
9. User receives confirmation email
10. User can login with new password
```

## 🚀 Advanced Features

### Keyboard Shortcuts
- **Ctrl/Cmd + Enter**: Generate test cases
- **Escape**: Close modal dialogs

### API Integration
The web application provides RESTful API endpoints for integration with other tools:

```bash
# Generate test cases
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"user_story": "As a user...", "ai_provider": "gemini"}'

# Export to Excel
curl -X POST http://localhost:5000/api/export \
  -H "Content-Type: application/json" \
  -d '{"test_cases": "...", "story_id": "US001"}'
```

## 🐛 Troubleshooting

### Common Issues

1. **Flask Not Installed**
   ```bash
   pip install flask
   ```

2. **Port Already in Use**
   ```bash
   # Change port in app.py
   app.run(debug=True, host='0.0.0.0', port=5001)
   ```

3. **API Key Issues**
   - Check your API keys in `test_case_generator.py`
   - Verify API key permissions and quotas
   - Check internet connectivity

4. **Browser Compatibility**
   - Use modern browsers (Chrome, Firefox, Safari, Edge)
   - Enable JavaScript
   - Clear browser cache if needed

### Debug Mode

The application runs in debug mode by default. For production:

```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

## 🔒 Security Considerations

- **API Keys**: Never commit API keys to version control
- **HTTPS**: Use HTTPS in production environments
- **Input Validation**: All user inputs are validated server-side
- **Rate Limiting**: Consider implementing rate limiting for production use

## 📈 Performance

- **Caching**: Results are cached in memory during the session
- **Async Processing**: AI requests are processed asynchronously
- **Optimized Assets**: CSS and JS are minified and optimized
- **Responsive Images**: Optimized for different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the existing code
3. Create an issue with detailed information

## 🔄 Updates

The web application automatically:
- Loads the latest AI provider configurations
- Updates available examples
- Refreshes provider status

---

**Happy Test Case Generation! 🧪✨** 