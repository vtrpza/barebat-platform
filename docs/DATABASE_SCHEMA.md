# BAREBAT Platform Database Schema & Features

## Core Features

### 1. User Management
- User registration and authentication
- Profile management
- Subscription tiers (Free, Premium, Professional)
- Multiple site management
- Dashboard access

### 2. Site Creation & Management
- Template selection
- Visual site builder integration
- Custom domain management
- Site preview and publishing
- Site analytics
- SEO management

### 3. Template System
- Pre-built templates
- Custom template creation
- Template categorization
- Premium template access
- Template versioning

### 4. Gift Registry
- Gift list management
- Monetary gifts
- Gift tracking
- Commission handling
- Currency conversion
- Payment processing

### 5. Content Management
- AI-powered content generation
- Multi-language support
- Media library
- Content versioning
- SEO optimization

### 6. Analytics & Reporting
- Site traffic analytics
- Gift registry analytics
- Revenue tracking
- User engagement metrics
- Performance metrics

## Database Schema

### Core Tables

```sql
-- Authentication and User Management
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free',
    phone_number TEXT,
    address JSONB,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Site Management
CREATE TABLE public.sites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    template_id UUID REFERENCES public.templates(id),
    status TEXT DEFAULT 'draft',
    settings JSONB DEFAULT '{}',
    custom_domain TEXT UNIQUE,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

-- Template Management
CREATE TABLE public.templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    builder_data JSONB NOT NULL,
    category TEXT,
    is_premium BOOLEAN DEFAULT false,
    version TEXT DEFAULT '1.0.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Gift Registry
CREATE TABLE public.gifts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES public.sites(id) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(10,2),
    currency TEXT DEFAULT 'BRL',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT valid_status CHECK (status IN ('active', 'fulfilled', 'archived'))
);

-- Transactions
CREATE TABLE public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    gift_id UUID REFERENCES public.gifts(id) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'BRL',
    status TEXT DEFAULT 'pending',
    commission_rate DECIMAL(4,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    payment_intent_id TEXT UNIQUE,
    payer_name TEXT,
    payer_email TEXT,
    payer_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
);

-- Media Library
CREATE TABLE public.media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES public.sites(id) NOT NULL,
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Analytics
CREATE TABLE public.analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES public.sites(id) NOT NULL,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    total_gifts DECIMAL(10,2) DEFAULT 0,
    total_transactions INTEGER DEFAULT 0,
    data_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Site Content
CREATE TABLE public.site_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_id UUID REFERENCES public.sites(id) NOT NULL,
    language TEXT DEFAULT 'pt-BR',
    content_type TEXT NOT NULL,
    content JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT valid_content_type CHECK (content_type IN ('page', 'section', 'component'))
);

-- Audit Log
CREATE TABLE public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    changes JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### Indexes

```sql
-- Profiles
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_subscription_tier ON public.profiles(subscription_tier);

-- Sites
CREATE INDEX idx_sites_user_id ON public.sites(user_id);
CREATE INDEX idx_sites_slug ON public.sites(slug);
CREATE INDEX idx_sites_status ON public.sites(status);
CREATE INDEX idx_sites_custom_domain ON public.sites(custom_domain);

-- Templates
CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_templates_is_premium ON public.templates(is_premium);

-- Gifts
CREATE INDEX idx_gifts_site_id ON public.gifts(site_id);
CREATE INDEX idx_gifts_status ON public.gifts(status);

-- Transactions
CREATE INDEX idx_transactions_gift_id ON public.transactions(gift_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);

-- Media
CREATE INDEX idx_media_site_id ON public.media(site_id);
CREATE INDEX idx_media_file_type ON public.media(file_type);

-- Analytics
CREATE INDEX idx_analytics_site_id ON public.analytics(site_id);
CREATE INDEX idx_analytics_data_date ON public.analytics(data_date);

-- Site Content
CREATE INDEX idx_site_content_site_id ON public.site_content(site_id);
CREATE INDEX idx_site_content_language ON public.site_content(language);
CREATE INDEX idx_site_content_content_type ON public.site_content(content_type);

-- Audit Logs
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type_id ON public.audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
```

### RLS (Row Level Security) Policies

```sql
-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Sites
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own sites"
    ON public.sites FOR SELECT
    USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own sites"
    ON public.sites FOR INSERT
    WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sites"
    ON public.sites FOR UPDATE
    USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sites"
    ON public.sites FOR DELETE
    USING (auth.uid() = user_id);

-- Similar policies should be created for other tables...
```

## Relationships and Data Flow

1. **User Flow**
   - User registers → Creates profile
   - User subscribes → Updates profile subscription_tier
   - User creates site → Links to template
   - User manages gifts → Creates gift registry

2. **Site Flow**
   - Site created → Linked to user
   - Template selected → Builder data copied
   - Content managed → Stored in site_content
   - Media uploaded → Stored in media library

3. **Gift Flow**
   - Gift created → Linked to site
   - Transaction initiated → Links to gift
   - Payment processed → Updates transaction
   - Analytics updated → Records gift data

## Maintenance Considerations

1. **Backups**
   - Regular database backups
   - Point-in-time recovery
   - Disaster recovery plan

2. **Performance**
   - Regular index maintenance
   - Query optimization
   - Cache implementation

3. **Security**
   - Regular security audits
   - Access control reviews
   - Data encryption

4. **Monitoring**
   - Query performance monitoring
   - Storage usage tracking
   - Error logging and alerting
``` 