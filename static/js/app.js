// Test Case Generator Web Application
class TestCaseGenerator {
    constructor() {
        this.currentResults = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadAIProviders();
        this.setupFormValidation();
    }

    bindEvents() {
        // Generate button
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateTestCases();
        });

        // Load examples button
        document.getElementById('load-examples').addEventListener('click', () => {
            this.showExamples();
        });

        // Test provider button
        document.getElementById('test-provider').addEventListener('click', () => {
            this.testAIProvider();
        });

        // Export button
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportToExcel();
        });

        // Copy button
        document.getElementById('copy-btn').addEventListener('click', () => {
            this.copyToClipboard();
        });

        // Modal close
        document.getElementById('modal-close').addEventListener('click', () => {
            this.hideExamples();
        });

        // Close modal when clicking outside
        document.getElementById('examples-modal').addEventListener('click', (e) => {
            if (e.target.id === 'examples-modal') {
                this.hideExamples();
            }
        });

        // AI provider change
        document.getElementById('ai-provider').addEventListener('change', (e) => {
            this.updateProviderStatus(e.target.value);
        });

        // Form inputs for real-time validation
        document.getElementById('user-story').addEventListener('input', () => {
            this.validateForm();
        });

        document.getElementById('acceptance-criteria').addEventListener('input', () => {
            this.validateForm();
        });
    }

    async loadAIProviders() {
        try {
            const response = await fetch('/api/providers');
            const data = await response.json();
            
            const providerSelect = document.getElementById('ai-provider');
            providerSelect.innerHTML = '';
            
            data.providers.forEach(provider => {
                const option = document.createElement('option');
                option.value = provider;
                option.textContent = provider.charAt(0).toUpperCase() + provider.slice(1);
                if (provider === data.current) {
                    option.selected = true;
                }
                providerSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Failed to load AI providers:', error);
        }
    }

    updateProviderStatus(provider) {
        // Update status based on provider
        const statusElement = document.querySelector('.status-indicator');
        if (statusElement) {
            statusElement.textContent = `🟢 ${provider} Ready`;
        }
    }

    setupFormValidation() {
        this.validateForm();
    }

    validateForm() {
        const userStory = document.getElementById('user-story').value.trim();
        const generateBtn = document.getElementById('generate-btn');
        
        if (userStory.length > 0) {
            generateBtn.disabled = false;
            generateBtn.classList.remove('btn-disabled');
        } else {
            generateBtn.disabled = true;
            generateBtn.classList.add('btn-disabled');
        }
    }

    async testAIProvider() {
        try {
            this.showNotification('Testing AI provider...', 'info');
            
            const response = await fetch('/api/test');
            const data = await response.json();
            
            if (data.success) {
                this.showNotification(`AI Provider Test Successful! ${data.provider} is working.`, 'success');
                console.log('AI Provider test successful:', data);
            } else {
                this.showNotification(`AI Provider Test Failed: ${data.error}`, 'error');
                console.error('AI Provider test failed:', data);
            }
        } catch (error) {
            console.error('Error testing AI provider:', error);
            this.showNotification(`Test Error: ${error.message}`, 'error');
        }
    }

    async generateTestCases() {
        const userStory = document.getElementById('user-story').value.trim();
        const acceptanceCriteria = document.getElementById('acceptance-criteria').value.trim();
        const storyId = document.getElementById('story-id').value.trim();
        const storyTitle = document.getElementById('story-title').value.trim();
        const aiProvider = document.getElementById('ai-provider').value;

        if (!userStory) {
            this.showNotification('Please enter a user story', 'error');
            return;
        }

        // Show loading overlay
        this.showLoading(true);

        try {
            console.log('Sending request to /api/generate with data:', {
                user_story: userStory,
                acceptance_criteria: acceptanceCriteria,
                story_id: storyId,
                story_title: storyTitle,
                ai_provider: aiProvider
            });

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_story: userStory,
                    acceptance_criteria: acceptanceCriteria,
                    story_id: storyId,
                    story_title: storyTitle,
                    ai_provider: aiProvider
                })
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response not OK. Status:', response.status, 'Text:', errorText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const responseText = await response.text();
            console.log('Response text:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Response text that failed to parse:', responseText);
                throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}...`);
            }

            console.log('Parsed response data:', data);

            if (data.success) {
                this.currentResults = data;
                this.displayResults(data);
                this.showNotification('Test cases generated successfully!', 'success');
            } else {
                throw new Error(data.error || 'Failed to generate test cases');
            }

        } catch (error) {
            console.error('Error generating test cases:', error);
            this.showNotification(`Error: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    displayResults(data) {
        const resultsSection = document.getElementById('results-section');
        const storyInfo = document.getElementById('story-info');
        const timestamp = document.getElementById('timestamp');
        const testCasesOutput = document.getElementById('test-cases-output');

        // Update story info
        storyInfo.textContent = `${data.story_id}: ${data.story_title}`;
        
        // Update timestamp
        const date = new Date(data.timestamp);
        timestamp.textContent = `Generated on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

        // Update test cases output
        testCasesOutput.textContent = data.test_cases;

        // Show results section
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    async exportToExcel() {
        if (!this.currentResults) {
            this.showNotification('No test cases to export', 'error');
            return;
        }

        try {
            this.showNotification('Exporting to Excel...', 'info');
            
            console.log('Exporting data:', {
                test_cases: this.currentResults.test_cases,
                story_id: this.currentResults.story_id,
                story_title: this.currentResults.story_title
            });

            const response = await fetch('/api/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    test_cases: this.currentResults.test_cases,
                    story_id: this.currentResults.story_id,
                    story_title: this.currentResults.story_title
                })
            });

            console.log('Export response status:', response.status);
            console.log('Export response headers:', response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Export failed. Status:', response.status, 'Text:', errorText);
                throw new Error(`Export failed: HTTP ${response.status}`);
            }

            // Check if response is a file download
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                // This is a file download
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `test_cases_${this.currentResults.story_id}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                this.showNotification('Excel file exported successfully!', 'success');
            } else {
                // This might be an error response
                const responseText = await response.text();
                console.error('Unexpected response type:', contentType, 'Text:', responseText);
                throw new Error('Unexpected response format from export endpoint');
            }

        } catch (error) {
            console.error('Error exporting to Excel:', error);
            this.showNotification(`Export failed: ${error.message}`, 'error');
        }
    }

    async copyToClipboard() {
        if (!this.currentResults) {
            this.showNotification('No test cases to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(this.currentResults.test_cases);
            this.showNotification('Test cases copied to clipboard!', 'success');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            this.showNotification('Failed to copy to clipboard', 'error');
        }
    }

    async showExamples() {
        try {
            const response = await fetch('/api/examples');
            const data = await response.json();
            
            const examplesList = document.getElementById('examples-list');
            examplesList.innerHTML = '';
            
            data.examples.forEach(example => {
                const exampleItem = document.createElement('div');
                exampleItem.className = 'example-item';
                exampleItem.innerHTML = `
                    <h4>${example.title}</h4>
                    <p>${example.story.split('\n')[0]}</p>
                `;
                
                exampleItem.addEventListener('click', () => {
                    this.loadExample(example);
                    this.hideExamples();
                });
                
                examplesList.appendChild(exampleItem);
            });
            
            document.getElementById('examples-modal').style.display = 'flex';
        } catch (error) {
            console.error('Failed to load examples:', error);
            this.showNotification('Failed to load examples', 'error');
        }
    }

    hideExamples() {
        document.getElementById('examples-modal').style.display = 'none';
    }

    loadExample(example) {
        // Extract user story and acceptance criteria
        const lines = example.story.split('\n');
        let userStory = '';
        let acceptanceCriteria = '';
        let inAcceptanceCriteria = false;
        
        for (const line of lines) {
            if (line.includes('Acceptance Criteria:')) {
                inAcceptanceCriteria = true;
                continue;
            }
            
            if (inAcceptanceCriteria) {
                acceptanceCriteria += line + '\n';
            } else if (line.trim() && !line.includes('User Story:')) {
                userStory += line + '\n';
            }
        }

        // Update form fields
        document.getElementById('story-id').value = example.id;
        document.getElementById('story-title').value = example.title;
        document.getElementById('user-story').value = userStory.trim();
        document.getElementById('acceptance-criteria').value = acceptanceCriteria.trim();
        
        // Validate form
        this.validateForm();
        
        this.showNotification(`Loaded example: ${example.title}`, 'success');
    }

    showLoading(show) {
        const overlay = document.getElementById('loading-overlay');
        overlay.style.display = show ? 'flex' : 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            z-index: 1002;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #28a745, #20c997)',
            error: 'linear-gradient(135deg, #dc3545, #c82333)',
            warning: 'linear-gradient(135deg, #ffc107, #e0a800)',
            info: 'linear-gradient(135deg, #17a2b8, #138496)'
        };
        return colors[type] || colors.info;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestCaseGenerator();
});

// Add some additional utility functions
window.addEventListener('beforeunload', () => {
    // Clean up any temporary files or resources if needed
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate test cases
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const generateBtn = document.getElementById('generate-btn');
        if (!generateBtn.disabled) {
            generateBtn.click();
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('examples-modal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 