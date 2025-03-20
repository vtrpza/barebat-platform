# BAREBAT Platform

## About
BAREBAT is an AI-powered platform for brazilian market only, that simplifies the creation of Bar and Bat Mitzvah websites using cutting-edge technologies. Our platform combines the power of OpenAI with Builder.io's visual editor to provide an intuitive and efficient website creation experience.

## Tech Stack
- **Frontend**: Next.js 14+ with App Router
- **UI Framework**: Builder.io Gen 1 SDK
- **Styling**: TailwindCSS
- **Backend/Auth/Database**: Supabase
- **AI Integration**: OpenAI API
- **Payments**: Stripe
- **Development**: TypeScript

## Key Features
- 🎨 Visual website builder powered by Builder.io
- 🤖 AI-assisted content generation and customization
- 💰 Integrated gift registry with monetary conversion
- 🔐 Secure authentication and user management
- 💳 Stripe payment processing
- 📱 Responsive design for all devices

## Business Model
- Free website creation with basic templates
- Premium features and templates
- Commission on monetary gifts through the platform
- Custom domain integration (optional add-on)

## Development Roadmap

### Phase 1: Foundation (✅ Complete)
- [x] Project setup and configuration
- [x] Basic Next.js structure
- [x] Supabase integration
- [x] Authentication system
- [x] Builder.io integration
- [x] Template system implementation

### Phase 2: Core Features (Current Focus)
- [ ] AI integration with OpenAI
- [x] Visual editor implementation
- [x] Core components development
  - [x] RSVP Form
  - [x] Gift Registry
  - [x] Photo Gallery
- [x] Template system
  - [x] Basic templates
  - [ ] Premium templates
- [ ] User dashboard

### Phase 3: Monetization
- [ ] Stripe integration
- [ ] Gift registry system
- [ ] Payment processing
- [ ] Commission system

### Phase 4: Enhancement
- [ ] Advanced customization options
- [ ] Premium templates
- [ ] Analytics dashboard
- [ ] Performance optimization

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key
- Builder.io account
- Stripe account

### Installation
```bash
# Clone the repository
git clone https://github.com/vtrpza/barebat-platform.git

# Install dependencies
cd barebat-platform
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Contributing
We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License
MIT License - see LICENSE file for details