export const defaultEmailTemplate = `
<div class="container">
  <div class="header">
    <h1>Welcome to Notify Hub</h1>
    <p>Your notification solution</p>
  </div>

  <div class="content">
    <h2>Hello {{name}}!</h2>
    <p>Thank you for choosing Notify Hub for your notification needs. We're excited to help you create beautiful, engaging communications.</p>
    <p>With our platform, you can:</p>
    <ul>
      <li>Send personalized email notifications</li>
      <li>Reach users via SMS and push notifications</li>
      <li>Create stunning templates with our drag-and-drop editor</li>
      <li>Track delivery and engagement metrics</li>
    </ul>

    <div class="button-container">
      <a href="#" class="button">Get Started</a>
    </div>

    <p class="note">
      If you have any questions, feel free to reach out to our support team.
    </p>
  </div>

  <div class="footer">
    <p>© 2025 Notify Hub. All rights reserved.</p>
    <p>You received this email because you signed up for our service.</p>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f9fafb;
  }

  .header {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    padding: 32px 24px;
    text-align: center;
  }

  .header h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    color: white;
  }

  .header p {
    margin: 8px 0 0 0;
    opacity: 0.9;
  }

  .content {
    padding: 32px 24px;
    color: #374151;
  }

  .content h2 {
    color: #1f2937;
    margin-top: 0;
  }

  .content ul {
    color: #4b5563;
    padding-left: 20px;
  }

  .button-container {
    text-align: center;
    margin: 16px 0;
  }

  .button {
    display: inline-block;
    background-color: #3b82f6;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
  }

  .note {
    color: #6b7280;
    font-size: 14px;
  }

  .footer {
    background-color: #f9fafb;
    padding: 24px;
    text-align: center;
    color: #6b7280;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    .container {
      width: 90%;
    }

    .header, .content, .footer {
      padding: 20px;
    }

    .button {
      width: 100%;
      padding: 12px 0;
      text-align: center;
    }
  }
</style>
`
