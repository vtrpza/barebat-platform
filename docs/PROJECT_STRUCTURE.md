# Project Structure and Development Plan

## Current Directory Structure

```
barebat-platform/
├── app/
│   ├── api/
│   ├── auth/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── editor/
│   ├── sites/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── builder/
│   ├── dashboard/
│   │   └── sidebar/
│   ├── editor/
│   └── shared/
├── lib/
│   ├── builder/
│   ├── supabase/
│   ├── stripe/
│   └── openai/
├── types/
├── utils/
└── public/
```

## Development Status

### Phase 1: Foundation (Current Phase)
1. ✅ Project Setup
   - Next.js 14+ configuration
   - TypeScript setup
   - TailwindCSS integration
   - ESLint and Prettier configuration

2. 🟡 Basic UI Components (In Progress)
   - ✅ Layout components
   - ✅ Navigation sidebar
   - ✅ Dashboard structure
   - ✅ Responsive design system
   - 🟡 Theme configuration

3. 🟡 Authentication & Database (Next Focus)
   - Supabase setup
   - User authentication flows
   - Database schema design
   - User profiles
   - Protected routes

### Phase 2: Core Features (Upcoming)
1. Builder.io Integration
   - Visual editor setup
   - Component library
   - Template system
   - Custom blocks

2. OpenAI Integration
   - API setup
   - Content generation
   - Design suggestions
   - Template customization

3. Website Management
   - Site creation
   - Template selection
   - Preview system
   - Publishing mechanism

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
      ├── signin/
      │   └── page.tsx
      └── signup/
          └── page.tsx
components/
  └── auth/
      └── AuthForm.tsx
middleware.ts         // Protected routes
```

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

2. Git Workflow
   - Feature branches
   - Pull request reviews
   - Semantic versioning
   - Conventional commits

3. Documentation
   - Code comments
   - API documentation
   - Component documentation
   - Setup instructions