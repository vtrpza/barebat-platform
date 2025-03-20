# Project Structure and Development Plan

## Current Directory Structure

```
barebat-platform/
├── app/
│   ├── api/
│   │   └── sites/
│   │       └── create/
│   │           └── route.ts
│   ├── auth/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── editor/
│   ├── sites/
│   │   └── new/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── builder/
│   │   ├── GiftRegistry.tsx
│   │   ├── PhotoGallery.tsx
│   │   └── RSVPForm.tsx
│   ├── dashboard/
│   │   └── sidebar/
│   ├── editor/
│   │   ├── TemplateSelector.tsx
│   │   ├── TemplatePreview.tsx
│   │   └── TemplateCustomizer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   └── CTASection.tsx
│   └── shared/
│       ├── SectionContainer.tsx
│       └── SectionHeading.tsx
├── lib/
│   ├── builder/
│   │   ├── templates.ts
│   │   ├── client.ts
│   │   └── config.ts
│   ├── supabase/
│   ├── stripe/
│   └── openai/
├── types/
├── utils/
└── public/
    └── templates/
        └── thumbnails/
```

## Development Status

### Phase 1: Foundation (✅ Complete)
1. ✅ Project Setup
   - ✅ Next.js 14+ configuration
   - ✅ TypeScript setup
   - ✅ TailwindCSS integration
   - ✅ ESLint and Prettier configuration
   - ✅ Environment variables setup

2. ✅ Basic UI Components
   - ✅ Layout components
   - ✅ Navigation sidebar
   - ✅ Dashboard structure
   - ✅ Responsive design system
   - ✅ Theme configuration

3. ✅ Authentication & Database
   - ✅ Supabase setup
   - ✅ User authentication flows
   - ✅ Database schema design
   - ✅ User profiles
   - ✅ Protected routes

4. ✅ Builder.io Integration
   - ✅ SDK setup
   - ✅ Component registration
   - ✅ Visual editor configuration
   - ✅ Custom blocks setup
   - ✅ Core components development
     - ✅ RSVP Form
     - ✅ Gift Registry
     - ✅ Photo Gallery

5. ✅ Template System
   - ✅ Template configuration
   - ✅ Template selector component
   - ✅ New site creation page
   - ✅ Template preview system
   - ✅ Template customization options

- [x] Landing page development
  - [x] Hero section
  - [x] Features showcase with animations
  - [x] Pricing plans
  - [x] Testimonials with dynamic content
  - [x] Call-to-action with improved UX
  - [x] Shared components for consistent design
  - [x] Performance and accessibility optimizations

### Phase 2: Core Features (Current Focus)
1. Website Management
   - [ ] Site creation flow
   - [ ] Template selection interface
   - [ ] Preview system
   - [ ] Publishing mechanism

2. OpenAI Integration
   - [ ] API setup
   - [ ] Content generation
   - [ ] Design suggestions
   - [ ] Template customization

### Phase 3: Monetization (Planned)
1. Stripe Integration
   - Payment processing
   - Subscription system
   - Gift registry
   - Commission handling

2. Gift System
   - Gift list management
   - Monetary conversion
   - Guest contribution
   - Transaction tracking

3. Premium Features
   - Custom domains
   - Advanced templates
   - Priority support
   - Analytics

### Phase 4: Enhancement (Future)
1. Performance
   - Image optimization
   - Caching strategy
   - Load time optimization
   - SEO improvements

2. Analytics
   - User tracking
   - Conversion metrics
   - Performance monitoring
   - Revenue analytics

3. Additional Features
   - Multi-language support
   - Export functionality
   - Backup system
   - API documentation

## Immediate Next Steps

### 1. Authentication System
```typescript
// Required Files
lib/
  └── supabase/
      └── client.ts    // Supabase client configuration
app/
  └── auth/
      ├── entrar/           // Login page (PT-BR)
      │   └── page.tsx
      ├── cadastro/         // Signup page (PT-BR)
      │   └── page.tsx
      ├── esqueci-senha/    // Forgot password page (PT-BR)
      │   └── page.tsx
      └── redefinir-senha/  // Reset password page (PT-BR)
          └── page.tsx
components/
  └── auth/
      ├── LoginForm.tsx
      ├── SignupForm.tsx
      ├── ForgotPasswordForm.tsx
      ├── ResetPasswordForm.tsx
      └── shared/
          ├── AuthLayout.tsx      // Shared layout for auth pages
          ├── AuthButton.tsx      // Styled button component
          └── AuthInput.tsx       // Styled input component
middleware.ts         // Protected routes
```

Authentication pages improvements:
- All pages and routes in Brazilian Portuguese
- Consistent design system across all auth pages
- Improved error handling and validation
- Password strength requirements
- Social login integration (Google, Facebook)
- Email verification flow
- Responsive design for all devices
- Loading states and animations
- Clear success/error messages
- Remember me functionality
- Session management
- Security features (rate limiting, CAPTCHA)

### 2. Database Schema
```sql
-- Core Tables
users (extends auth.users)
  - id
  - email
  - full_name
  - avatar_url
  - subscription_tier
  - created_at

sites
  - id
  - user_id
  - title
  - slug
  - template_id
  - status
  - created_at
  - updated_at

templates
  - id
  - name
  - thumbnail
  - builder_data
  - is_premium
  - created_at

gifts
  - id
  - site_id
  - name
  - description
  - amount
  - currency
  - created_at

transactions
  - id
  - gift_id
  - amount
  - status
  - commission_rate
  - created_at
```

## GitFlow Workflow

### Branch Structure
```
main (production)
├── develop (staging)
│   ├── feature/auth-improvements
│   ├── feature/landing-page
│   ├── feature/dashboard
│   └── feature/template-system
└── hotfix/*
```

### Branch Types
1. **Main Branch (main)**
   - Production-ready code
   - Tagged with version numbers
   - Protected from direct pushes
   - Requires pull request approval

2. **Development Branch (develop)**
   - Integration branch for features
   - Staging environment
   - CI/CD pipeline runs tests
   - Pre-production testing

3. **Feature Branches (feature/)**
   - Created from: develop
   - Merge back to: develop
   - Naming: feature/feature-name
   - Example: feature/auth-improvements

4. **Hotfix Branches (hotfix/)**
   - Created from: main
   - Merge back to: main and develop
   - For urgent production fixes
   - Naming: hotfix/issue-description

5. **Release Branches (release/)**
   - Created from: develop
   - Merge back to: main and develop
   - For version preparation
   - Naming: release/v1.0.0

### Workflow Rules
1. **Feature Development**
   - Create feature branch from develop
   - Regular commits with clear messages
   - Keep branches up to date with develop
   - Write tests for new features
   - Document changes

2. **Code Review**
   - Required for all pull requests
   - At least one approval needed
   - CI checks must pass
   - No direct commits to protected branches
   - Clean commit history

3. **Merging**
   - Squash and merge feature branches
   - Preserve feature branch history
   - Delete branches after merging
   - Update version numbers
   - Keep commit messages clean

4. **Versioning**
   - Follow semantic versioning
   - Tag releases in main branch
   - Update changelog
   - Document breaking changes

5. **Deployment**
   - Automated deployment to staging
   - Manual approval for production
   - Rollback plan for each deploy
   - Monitor post-deployment

### Commit Message Convention
```
type(scope): subject

body

footer
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Example:
```
feat(auth): implement Portuguese language support

- Add PT-BR translations for all auth pages
- Update route structure to use Portuguese URLs
- Implement language switcher component

Closes #123
```

## Business Model Details

### Pricing Tiers

1. Free Tier
   - Basic templates
   - Limited customization
   - Standard support
   - 8% gift commission

2. Premium Tier (R$99)
   - All templates
   - Full customization
   - Priority support
   - 5% gift commission
   - Custom domain

3. Professional Tier (R$199)
   - Everything in Premium
   - Design consultation
   - 3% gift commission
   - Multiple sites
   - Advanced analytics

### Revenue Streams
1. Gift Registry Commission
   - Tiered commission structure
   - Automated payment processing
   - Transparent fee structure

2. Premium Subscriptions
   - Monthly/Annual billing
   - Feature-based pricing
   - Bundle discounts

3. Add-on Services
   - Custom design services
   - Priority support
   - Domain registration
   - Professional consultation

## Technical Requirements

### APIs and Services
- OpenAI API
- Builder.io
- Supabase
- Stripe
- Custom domain provider

### Security
- SSL certificates
- Data encryption
- Payment security
- GDPR compliance

### Performance
- Global CDN
- Image optimization
- Lazy loading
- Server-side rendering

## Development Guidelines

1. Code Structure
   - Follow Next.js 14 best practices
   - Use TypeScript for type safety
   - Implement proper error handling
   - Write unit tests for critical features
   - Use shared components for consistent design
   - Implement animations for better UX
   - Ensure accessibility compliance
   - Optimize performance with proper loading strategies

2. Git Workflow
   - Feature branches
   - Pull request reviews
   - Semantic versioning
   - Conventional commits
   - Regular documentation updates
   - Clean commit history

3. Documentation
   - Code comments
   - API documentation
   - Component documentation
   - Setup instructions
   - Performance and accessibility guidelines
   - Design system documentation