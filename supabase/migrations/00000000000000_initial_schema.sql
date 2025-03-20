-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Create indexes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_subscription_tier ON public.profiles(subscription_tier);

CREATE INDEX idx_sites_user_id ON public.sites(user_id);
CREATE INDEX idx_sites_slug ON public.sites(slug);
CREATE INDEX idx_sites_status ON public.sites(status);
CREATE INDEX idx_sites_custom_domain ON public.sites(custom_domain);

CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_templates_is_premium ON public.templates(is_premium);

CREATE INDEX idx_gifts_site_id ON public.gifts(site_id);
CREATE INDEX idx_gifts_status ON public.gifts(status);

CREATE INDEX idx_transactions_gift_id ON public.transactions(gift_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at);

CREATE INDEX idx_media_site_id ON public.media(site_id);
CREATE INDEX idx_media_file_type ON public.media(file_type);

CREATE INDEX idx_analytics_site_id ON public.analytics(site_id);
CREATE INDEX idx_analytics_data_date ON public.analytics(data_date);

CREATE INDEX idx_site_content_site_id ON public.site_content(site_id);
CREATE INDEX idx_site_content_language ON public.site_content(language);
CREATE INDEX idx_site_content_content_type ON public.site_content(content_type);

CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type_id ON public.audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Sites
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

-- Templates
CREATE POLICY "Anyone can view templates"
    ON public.templates FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can view premium templates"
    ON public.templates FOR SELECT
    USING (NOT is_premium OR (auth.uid() IS NOT NULL));

-- Gifts
CREATE POLICY "Users can view gifts for their sites"
    ON public.gifts FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage gifts for their sites"
    ON public.gifts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

-- Transactions
CREATE POLICY "Users can view transactions for their gifts"
    ON public.transactions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.gifts
        JOIN public.sites ON gifts.site_id = sites.id
        WHERE transactions.gift_id = gifts.id
        AND sites.user_id = auth.uid()
    ));

-- Media
CREATE POLICY "Users can view media for their sites"
    ON public.media FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage media for their sites"
    ON public.media FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

-- Analytics
CREATE POLICY "Users can view analytics for their sites"
    ON public.analytics FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

-- Site Content
CREATE POLICY "Users can view content for their sites"
    ON public.site_content FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage content for their sites"
    ON public.site_content FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.sites
        WHERE sites.id = site_id
        AND sites.user_id = auth.uid()
    ));

-- Audit Logs
CREATE POLICY "Users can view their own audit logs"
    ON public.audit_logs FOR SELECT
    USING (user_id = auth.uid()); 