CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, name text NOT NULL, phone text NOT NULL,
  lang text NOT NULL DEFAULT 'uz', page text,
  fields jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'new', note text,
  source text NOT NULL DEFAULT 'site',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.site_settings (key text PRIMARY KEY, value text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.site_settings (key, value) VALUES
 ('phone', '+998 (77) 353-87-00'), ('short', '1141'), ('email', 'info@mirziyomedline.uz'),
 ('address_uz', 'Toshkent sh., Olmazor tumani, Kichik Halqa yo''li ko''chasi, 5A-uy'),
 ('address_ru', 'г. Ташкент, Алмазарский район, ул. Кичик Халка йули, 5А'),
 ('announcement_uz', ''), ('announcement_ru', ''), ('telegram', ''), ('instagram', '');

CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL DEFAULT 'complaint', name text, phone text, text text NOT NULL,
  source text NOT NULL DEFAULT 'bot', chat_id bigint, status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.bot_users (
  chat_id bigint PRIMARY KEY, first_name text, last_name text, username text, phone text,
  lang text NOT NULL DEFAULT 'uz', state jsonb NOT NULL DEFAULT '{}'::jsonb, blocked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(), last_seen timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.bot_users TO service_role;
ALTER TABLE public.bot_users ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.bot_config (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  token text, webhook_secret text, bot_username text, admin_chat_ids text NOT NULL DEFAULT '',
  welcome_uz text NOT NULL DEFAULT 'Assalomu alaykum! MirziyoMedline klinikasi botiga xush kelibsiz.',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.bot_config TO service_role;
ALTER TABLE public.bot_config ENABLE ROW LEVEL SECURITY;
INSERT INTO public.bot_config (id) VALUES (1);

CREATE TABLE public.catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL, slug text NOT NULL, data jsonb NOT NULL, sort int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kind, slug)
);
GRANT SELECT ON public.catalog TO anon, authenticated;
GRANT ALL ON public.catalog TO service_role;
ALTER TABLE public.catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active catalog" ON public.catalog FOR SELECT TO anon, authenticated USING (active);

CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL DEFAULT 'ad', title text NOT NULL DEFAULT '', url text NOT NULL,
  active boolean NOT NULL DEFAULT true, sort int NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.videos TO anon, authenticated;
GRANT ALL ON public.videos TO service_role;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active videos" ON public.videos FOR SELECT TO anon, authenticated USING (active);