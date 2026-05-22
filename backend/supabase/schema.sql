create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null check (role in ('student', 'customer')),
  full_name text not null,
  phone text not null,
  student_profile jsonb,
  customer_profile jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_student_profile_check check (
    (role = 'student' and student_profile is not null and customer_profile is null)
    or (role = 'customer' and customer_profile is not null and student_profile is null)
  )
);

create index if not exists users_role_idx on public.users (role);

alter table public.users enable row level security;

create policy "Users can read their own profile"
on public.users
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert their own profile"
on public.users
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.users
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

create or replace function public.create_profile_for_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    role,
    full_name,
    phone,
    student_profile,
    customer_profile
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'customer'),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    case
      when new.raw_user_meta_data ->> 'role' = 'student'
      then new.raw_user_meta_data -> 'student_profile'
      else null
    end,
    case
      when new.raw_user_meta_data ->> 'role' = 'customer'
      then new.raw_user_meta_data -> 'customer_profile'
      else null
    end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_profile_after_auth_signup on auth.users;
create trigger create_profile_after_auth_signup
after insert on auth.users
for each row
execute function public.create_profile_for_new_auth_user();

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null constraint products_seller_id_fkey references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  price numeric not null check (price >= 0),
  category text not null,
  images jsonb not null default '[]'::jsonb,
  is_self_made boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_seller_id_idx on public.products (seller_id);
create index if not exists products_category_idx on public.products (category);

alter table public.products enable row level security;

create policy "Authenticated users can read products"
on public.products
for select
to authenticated
using (true);

create policy "Students can insert their own products"
on public.products
for insert
to authenticated
with check ((select auth.uid()) = seller_id);

create policy "Students can update their own products"
on public.products
for update
to authenticated
using ((select auth.uid()) = seller_id)
with check ((select auth.uid()) = seller_id);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null constraint services_student_id_fkey references public.users(id) on delete cascade,
  skill text not null,
  description text not null,
  pricing numeric not null check (pricing >= 0),
  pricing_type text not null check (pricing_type in ('fixed', 'hourly')),
  delivery_time text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_student_id_idx on public.services (student_id);
create index if not exists services_skill_idx on public.services (skill);

alter table public.services enable row level security;

create policy "Authenticated users can read services"
on public.services
for select
to authenticated
using (true);

create policy "Students can insert their own services"
on public.services
for insert
to authenticated
with check ((select auth.uid()) = student_id);

create policy "Students can update their own services"
on public.services
for update
to authenticated
using ((select auth.uid()) = student_id)
with check ((select auth.uid()) = student_id);

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();
