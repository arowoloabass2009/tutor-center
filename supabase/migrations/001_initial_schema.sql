-- ============================================================
-- TutorCenter — Initial Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Profiles (extends Supabase auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  first_name  text not null,
  last_name   text not null,
  role        text not null check (role in ('student', 'tutor')),
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. KYC Personal Information
create table if not exists public.kyc_personal (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  dob         date not null,
  phone       text not null,
  country     text not null,
  city        text not null,
  address     text,
  gender      text not null check (gender in ('Male', 'Female', 'Other')),
  created_at  timestamptz default now(),
  unique (user_id)
);

alter table public.kyc_personal enable row level security;

create policy "Users can manage own kyc_personal"
  on public.kyc_personal for all
  using (auth.uid() = user_id);

-- 3. KYC Documents
create table if not exists public.kyc_documents (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.profiles(id) on delete cascade,
  doc_type           text not null check (doc_type in ('passport', 'national_id', 'drivers_license')),
  id_document_url    text not null,
  selfie_url         text not null,
  status             text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at         timestamptz default now(),
  unique (user_id)
);

alter table public.kyc_documents enable row level security;

create policy "Users can manage own kyc_documents"
  on public.kyc_documents for all
  using (auth.uid() = user_id);

-- 4. Storage bucket for KYC uploads
insert into storage.buckets (id, name, public)
  values ('kyc-documents', 'kyc-documents', false)
  on conflict do nothing;

create policy "Users can upload own KYC files"
  on storage.objects for insert
  with check (bucket_id = 'kyc-documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can read own KYC files"
  on storage.objects for select
  using (bucket_id = 'kyc-documents' and auth.uid()::text = (storage.foldername(name))[1]);

-- 5. Auto-create profile on signup trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$;
  ? m,
  2rfgv 
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on  for each row execute procedure public.handle_new_user();
