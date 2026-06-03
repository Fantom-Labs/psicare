# PSICARE
## Plataforma de Monitoramento do Bem-Estar Emocional

**Product Requirements Document (PRD)**
Versão 1.0 — Junho 2026 — Fantom Labs

> `iOS + Web App` · `React Native + Expo` · `Next.js PWA` · `Supabase Backend`

---

## 01 · Visão Geral do Produto

### 1.1 Proposta de Valor

O Psicare é uma plataforma digital de monitoramento emocional que conecta pacientes e profissionais de saúde mental. O produto resolve três problemas centrais:

- Falta de continuidade no acompanhamento terapêutico entre sessões;
- Ausência de dados objetivos sobre o estado emocional do paciente ao longo do tempo;
- Dificuldade do profissional em identificar padrões e gatilhos sem registro sistemático.

> **Missão:** Transformar o autocuidado emocional em um hábito diário sustentável, fortalecendo o vínculo entre paciente e terapeuta com dados reais e contextualizados.

### 1.2 Personas

**Persona A — Paciente**
Nome: Mariana, 28 anos, analista de marketing. Faz terapia quinzenal, quer registrar seu humor diário de forma simples e entender seus padrões emocionais. Preocupa-se com privacidade e quer decidir o que seu psicólogo vê.

**Persona B — Profissional de Saúde Mental**
Nome: Dr. Lucas, 42 anos, psicólogo clínico. Atende 15 pacientes semanais. Quer acesso ao histórico emocional antes das sessões para direcionar melhor o atendimento. Não quer plataforma complexa.

### 1.3 Problema e Solução

| Problema | Solução no Psicare |
|---|---|
| Paciente esquece emoções/eventos entre sessões | Registro diário com humor + nota + contexto |
| Profissional não tem dados objetivos | Dashboard do profissional com histórico completo |
| Medicação não controlada | Checklist de medicação com alertas diários |
| Rotina saudável difícil de manter | Checklist de hábitos com streak e gamificação leve |
| Privacidade do paciente em risco | Compartilhamento 100% opt-in com revogação a qualquer momento |

### 1.4 Métricas de Sucesso (OKRs — 12 meses)

| Objetivo | Key Result |
|---|---|
| Engajamento diário | ≥ 50% dos usuários ativos fazem check-in em 20+ dias/mês |
| Retenção | Churn < 5% ao mês no plano pago |
| Adoção profissional | 100 profissionais ativos gerando relatórios ao final do ano |
| NPS | NPS ≥ 45 entre pacientes e ≥ 50 entre profissionais |
| Crescimento | 2.000 usuários registrados ao final de 12 meses |

---

## 02 · Decisão Tecnológica — iOS + Web

### 2.1 Estratégia: Web App + iOS via Capacitor

A escolha central é manter uma única base de código Next.js e empacotar o mesmo build como app iOS via Capacitor — eliminando a necessidade de manter React Native em paralelo.

- **Base única:** Next.js 15 (App Router) como PWA, deploy no Vercel.
- **App iOS:** Capacitor empacota o build Next.js num shell nativo — mesmas rotas, mesma UI.
- **APIs nativas:** plugins Capacitor para push notifications, armazenamento seguro de tokens e splash screen.
- **Resultado:** uma única base de código, dois canais de distribuição — App Store e navegador.

### 2.2 Stack Completa

#### Frontend — iOS (Capacitor)

| Tecnologia | Justificativa |
|---|---|
| Capacitor | Empacota o build Next.js num shell nativo iOS — App Store ready |
| `@capacitor/push-notifications` | Push notifications para lembretes de check-in e medicação |
| `@capacitor/preferences` | Armazenamento seguro de tokens JWT no device |
| `@capacitor/splash-screen` | Splash screen nativa |
| `@capacitor/status-bar` | Personalização da status bar iOS |
| Xcode | Assinatura e publicação na App Store |

#### Frontend — Web (Next.js 15)

| Tecnologia | Justificativa |
|---|---|
| Next.js 15 App Router | SSR para SEO da landing, RSC para dashboard do profissional |
| PWA (next-pwa) | Instalável no browser, funciona offline para leitura de histórico |
| Tailwind CSS v3 | Consistência visual com tokens do design system |
| Shadcn/ui | Componentes acessíveis (WCAG 2.1 AA), customizáveis |
| Recharts | Gráficos de evolução emocional (line chart, heatmap) |
| React Query (TanStack v5) | Data fetching, cache, background sync |
| next-auth v5 | Auth com Google OAuth + magic link para pacientes |

#### Backend — Supabase

| Tecnologia | Justificativa |
|---|---|
| Supabase (PostgreSQL) | BaaS completo: DB, Auth, Storage, Realtime, Edge Functions |
| Row Level Security (RLS) | Política de privacidade enforçada no banco — zero trust |
| Supabase Auth | JWT + OAuth (Google). MFA disponível para profissionais |
| Supabase Realtime | WebSocket para notificações em tempo real no dashboard |
| Supabase Storage | Upload de arquivos (export PDF de relatórios) |
| Edge Functions (Deno) | Lógica server-side: geração de relatórios, webhooks |
| pg_cron | Agendamento de notificações diárias de check-in |

#### Infraestrutura e DevOps

| Tecnologia | Justificativa |
|---|---|
| Capacitor + Xcode | Build e publicação iOS — assina e submete à App Store |
| Vercel | Deploy do Next.js — Edge network, preview deployments por PR |
| GitHub Actions | Pipeline CI: lint, type-check, testes, deploy |
| Sentry | Error tracking em produção (iOS + Web) |
| PostHog | Product analytics self-hostable (eventos, funnels, session replay) |
| Resend | Transactional emails (boas-vindas, relatórios, alertas) |

---

## 2.3 Estratégia Mobile — Capacitor (decisão revisada)

Em vez do monorepo Turborepo com React Native/Expo previsto originalmente, o Psicare adota o **Capacitor** para empacotar o web app Next.js existente como um app iOS nativo. Essa decisão elimina a necessidade de manter duas bases de código e permite que o app chegue à App Store reaproveitando 100% do trabalho já feito no web.

### Comparativo de abordagens

| Critério | Capacitor (adotado) | React Native (original) |
|---|---|---|
| Reutiliza código atual | ✅ 100% | ❌ reescrever tudo |
| Publicação na App Store | ✅ | ✅ |
| Push notifications iOS | ✅ via plugin | ✅ |
| Acesso a APIs nativas | ✅ via plugins | ✅ |
| Base de código única | ✅ mesmo repositório | ❌ monorepo separado |
| Performance nativa | ⚠️ WebView | ✅ nativo |
| Esforço de implementação | Baixo | Alto |

### Stack mobile revisada

| Tecnologia | Função |
|---|---|
| **Capacitor** | Shell nativo iOS — empacota o build Next.js |
| `@capacitor/push-notifications` | Lembretes de check-in e medicação |
| `@capacitor/preferences` | Armazenamento seguro de tokens JWT |
| `@capacitor/status-bar` | Personalização da status bar iOS |
| `@capacitor/splash-screen` | Splash screen nativa |
| Xcode | Assinatura e publicação na App Store |

### Fluxo de build iOS

```
npm run build          # gera o Next.js static/export
npx cap sync           # copia o build para o projeto iOS nativo
npx cap open ios       # abre no Xcode para assinar e publicar
```

### Impacto na arquitetura de rotas

As rotas mobile (`apps/mobile/`) descritas na seção 4.1 deixam de existir como código separado. O app iOS usa exatamente as mesmas rotas do web (`app/(app)/`, `app/(auth)/`), com layout responsivo adaptado para telas móveis via Tailwind.

---

## 03 · Arquitetura do Sistema

### 3.1 Diagrama em Camadas

```
┌─────────────────────────────────────────────────────┐
│                CAMADA DE APRESENTAÇÃO               │
│  iOS App (React Native / Expo Router) — App Store   │
│  Web App (Next.js 15 / PWA) — Vercel CDN            │
│  Design System compartilhado (NativeWind + Tailwind) │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                  CAMADA DE ESTADO                   │
│  TanStack Query v5 — cache, sync, offline mutations │
│  Zustand — auth session, preferências, queue offline │
│  Supabase Realtime client — WebSocket subscriptions  │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                   CAMADA DE API                     │
│  Supabase Client SDK (postgrest-js) — RLS           │
│  Supabase Edge Functions — relatórios, webhooks     │
│  next-auth / Expo auth — session management JWT     │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                  CAMADA DE DADOS                    │
│  PostgreSQL (Supabase) — schema relacional + RLS    │
│  Supabase Storage — PDFs exportados, avatares       │
│  pg_cron — jobs agendados (lembretes diários às 20h)│
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│              INFRA & OBSERVABILIDADE                │
│  Vercel (Web) + Capacitor + Xcode (iOS) — deploy     │
│  Sentry — crash reporting com session context       │
│  PostHog — analytics sem PII exposta                │
│  GitHub Actions — CI/CD pipeline unificado          │
└─────────────────────────────────────────────────────┘
```

### 3.2 Modelo de Dados (principais entidades)

| Entidade | Campos Principais |
|---|---|
| `users` | id, email, full_name, role (patient \| professional), created_at |
| `mood_entries` | id, user_id, date, mood_score (1–5), emotion_tags[], note, created_at |
| `habit_logs` | id, user_id, date, type (exercise \| medication \| other), completed, note |
| `medications` | id, user_id, name, dosage, frequency, times[], active |
| `professional_access` | id, patient_id, professional_id, granted_at, revoked_at, scope[] |
| `reports` | id, professional_id, patient_id, period_start, period_end, storage_path |
| `notifications` | id, user_id, type, scheduled_at, sent_at, channel (push \| email) |

### 3.3 Segurança e Privacidade (LGPD)

- Row Level Security (RLS) no Supabase garante que cada usuário só acessa seus próprios dados;
- Compartilhamento com profissional cria um registro em `professional_access` com escopo explícito;
- Paciente pode revogar acesso a qualquer momento — RLS reage imediatamente;
- Dados sensíveis de saúde não são enviados a analytics — PostHog opera em modo anonimizado;
- Tokens JWT armazenados em `SecureStore` no iOS (não em `AsyncStorage` plain);
- HTTPS obrigatório em todos os canais; Edge Functions atrás de API gateway com rate limiting;
- Política de retenção: dados exportáveis e deletáveis conforme Art. 18 da LGPD;
- Criptografia em repouso: Supabase usa AES-256 no nível de storage do PostgreSQL.

---

## 04 · Arquitetura de Rotas — MVP · Paciente

> Escopo: apenas as rotas do usuário paciente. Rotas do profissional fora do MVP.

### 4.1 Mobile (iOS via Capacitor)

O app iOS usa exatamente as mesmas rotas do web app. Não existe código mobile separado — o Capacitor empacota o build Next.js e o entrega como app nativo. O layout responsivo via Tailwind garante a adaptação para telas móveis.

Funcionalidades nativas (push notifications, armazenamento de tokens) são acessadas via plugins Capacitor integrados ao próprio projeto Next.js.

### 4.2 Web — `app/`

```
app/
├── layout.tsx                         # [layout]   Root: fontes, providers, Analytics
├── page.tsx                           # [public]   Landing page (SSG)
│
├── (auth)/
│   ├── layout.tsx                     # [layout]   Sem sidebar, fundo limpo
│   ├── login/
│   │   └── page.tsx                   # [public]   Login com e-mail ou Google OAuth
│   ├── register/
│   │   └── page.tsx                   # [public]   Cadastro: nome, e-mail, senha, papel
│   └── callback/
│       └── route.ts                   # [public]   Handler OAuth + magic link
│
└── (app)/
    ├── layout.tsx                     # [layout]   AuthGuard (Server) + Sidebar + Topbar
    ├── home/
    │   └── page.tsx                   # [protected] Dashboard: check-in, streak, resumo
    ├── habits/
    │   ├── page.tsx                   # [protected] Checklists do dia + histórico semanal
    │   └── [id]/
    │       └── page.tsx               # [protected] Detalhe / edição de hábito
    ├── reports/
    │   ├── page.tsx                   # [protected] Calendário, heatmap, gráfico de evolução
    │   └── [date]/
    │       └── page.tsx               # [protected] Detalhe do dia selecionado
    ├── profile/
    │   └── page.tsx                   # [protected] Foto, nome, e-mail, senha
    └── settings/
        ├── notifications/
        │   └── page.tsx               # [protected] Horário de lembrete, canais ativos
        └── privacy/
            └── page.tsx               # [protected] Exportar dados, deletar conta (LGPD)
```

### 4.3 Mapeamento tabs → rotas

| Tab | Mobile | Web |
|---|---|---|
| Início | `/(tabs)/home` | `/app/home` |
| Hábitos | `/(tabs)/habits` | `/app/habits` |
| Relatórios | `/(tabs)/reports` | `/app/reports` |
| Perfil | `/(tabs)/profile` | `/app/profile` |
| Configurações | modal em `/profile` | `/app/settings/*` |
| Login | `/(auth)/login` | `/auth/login` |
| Cadastro | `/(auth)/register` | `/auth/register` |

### 4.4 Fluxo de navegação

```
Não autenticado
  /  →  /(auth)/login
         ├── login OK    →  /(tabs)/home
         └── sem conta   →  /(auth)/register → /(tabs)/home

Autenticado
  /  →  verifica session
         ├── tem sessão  →  /(tabs)/home
         └── expirou     →  /(auth)/login
```

### 4.5 Arquivos de convenção

**Expo Router**

| Arquivo | Função |
|---|---|
| `_layout.tsx` | Define o navigator do grupo (Stack, Tabs) |
| `index.tsx` | Rota padrão do grupo |
| `[param].tsx` | Rota dinâmica via `useLocalSearchParams()` |

**Next.js App Router**

| Arquivo | Função |
|---|---|
| `layout.tsx` | Layout persistente que envolve `page.tsx` |
| `page.tsx` | Página da rota |
| `loading.tsx` | Suspense boundary automático |
| `error.tsx` | Error boundary da rota |
| `route.ts` | API endpoint (GET, POST…) |

---

## 05 · Requisitos Funcionais

### 4.1 Módulo de Autenticação

- Cadastro com e-mail + senha (validação por e-mail via Resend);
- Login com Google OAuth (web e iOS);
- Fluxo de onboarding: seleção de papel (paciente / profissional), preenchimento de perfil;
- Recuperação de senha via magic link;
- MFA opcional para profissionais de saúde.

### 4.2 Registro Diário de Humor

- Mood picker com 5 níveis (de muito mal a muito bem), representados por cores e emojis;
- Seleção de tags de emoção (ex: ansioso, grato, frustrado, tranquilo — lista customizável);
- Campo de texto livre para nota do dia (máx. 500 caracteres);
- Campo adicional para descrever evento ou contexto que influenciou o humor;
- Um único registro por dia — editável até meia-noite do dia seguinte;
- Lembrete push configurável (padrão: 20h).

### 4.3 Histórico e Visualizações

- Calendário mensal com cores por score de humor;
- Linha do tempo com scroll infinito de registros passados;
- Gráfico de linha mostrando evolução do humor nos últimos 7, 30 e 90 dias;
- Heatmap anual (estilo GitHub contributions) com densidade de registros;
- Filtro por tag de emoção para identificar padrões;
- Streak counter (dias consecutivos com registro).

### 4.4 Checklist de Hábitos

- Hábitos pré-definidos: exercício físico, hidratação, sono, meditação;
- Hábitos customizados: o usuário pode adicionar e nomear hábitos próprios;
- Marcação diária com timestamp;
- Histórico semanal de conclusão por hábito;
- Streak por hábito individual + streak geral.

### 4.5 Controle de Medicação

- Cadastro de medicamentos: nome, dosagem, frequência e horários;
- Checklist diário de medicações agendadas;
- Notificação push no horário cadastrado;
- Histórico de adesão com percentual de cumprimento por período;
- Opção de marcar como `tomei`, `pulei` ou `tomei mais tarde`.

### 4.6 Compartilhamento com Profissional

- Paciente gera um código de convite ou busca profissional pelo e-mail cadastrado;
- Profissional aceita o convite — acesso criado com escopo configurado pelo paciente;
- Escopos disponíveis: humor, hábitos, medicação, notas (cada um pode ser desativado individualmente);
- Paciente visualiza lista de profissionais com acesso ativo e pode revogar com um toque;
- Log de acessos: quando o profissional visualizou os dados (auditoria).

### 4.7 Dashboard do Profissional

- Lista de pacientes vinculados com status de engajamento (ativo / inativo / sem registro recente);
- Visão do calendário de humor do paciente;
- Gráfico de evolução com anotações de eventos;
- Relatório exportável em PDF (período selecionável);
- Filtros por período e por tipo de dado (humor / hábitos / medicação);
- Área de anotações privadas do profissional sobre o paciente (não visível ao paciente).

---

## 06 · Backlog Priorizado

**Legenda:** `P0` Crítico · `P1` Alta · `P2` Média · `P3` Baixa
> Sem o P0 o produto não existe. P1 = MVP completo.

| ID | User Story | Módulo | Prioridade | Sprint | Critério de Aceite |
|---|---|---|:---:|:---:|---|
| US-01 | Como usuário, quero me cadastrar com e-mail e senha para criar minha conta. | Auth | P0 | S1 | Conta criada, e-mail de confirmação enviado. |
| US-02 | Como usuário, quero fazer login com Google para acesso rápido. | Auth | P1 | S1 | OAuth funcional em iOS e web. |
| US-03 | Como usuário, quero escolher meu papel (paciente/profissional) no onboarding. | Auth | P0 | S1 | Role salva no perfil e direciona para o dashboard correto. |
| US-04 | Como paciente, quero registrar meu humor diário em segundos. | Humor | P0 | S1 | Registro salvo com score, tag e note. Apenas 1 por dia. |
| US-05 | Como paciente, quero adicionar uma nota ao meu registro de humor. | Humor | P0 | S1 | Campo de texto livre com máx. 500 chars. |
| US-06 | Como paciente, quero ver um calendário colorido com meu histórico de humor. | Histórico | P0 | S2 | Calendário mensal com cores por score. |
| US-07 | Como paciente, quero ver um gráfico de evolução dos últimos 30 dias. | Histórico | P1 | S2 | Gráfico de linha renderizado corretamente. |
| US-08 | Como paciente, quero ver um heatmap anual dos meus registros. | Histórico | P2 | S4 | Heatmap gerado, interativo com tooltip. |
| US-09 | Como paciente, quero configurar um lembrete diário para registrar meu humor. | Notificações | P1 | S2 | Push enviado no horário configurado. |
| US-10 | Como paciente, quero cadastrar medicamentos com horário e receber alertas. | Medicação | P1 | S3 | Notificação push nos horários cadastrados. |
| US-11 | Como paciente, quero marcar se tomei minha medicação no dia. | Medicação | P1 | S3 | Status salvo (tomei / pulei / mais tarde). |
| US-12 | Como paciente, quero ver meu histórico de adesão à medicação. | Medicação | P2 | S3 | Percentual de adesão por período exibido. |
| US-13 | Como paciente, quero criar e marcar hábitos diários personalizados. | Hábitos | P1 | S3 | Hábito criado, marcação salva, streak atualizado. |
| US-14 | Como paciente, quero ver meu streak de dias consecutivos com registro. | Engajamento | P2 | S4 | Streak calculado e exibido na home. |
| US-15 | Como paciente, quero convidar meu psicólogo para visualizar meus dados. | Compartilhamento | P0 | S2 | Profissional recebe convite e acessa dados após aceite. |
| US-16 | Como paciente, quero controlar quais dados o profissional pode ver. | Compartilhamento | P1 | S2 | Escopos configuráveis: humor, hábitos, medicação, notas. |
| US-17 | Como paciente, quero revogar o acesso do profissional a qualquer momento. | Compartilhamento | P0 | S2 | Acesso revogado imediatamente via RLS. |
| US-18 | Como profissional, quero ver o calendário de humor dos meus pacientes. | Dashboard Prof. | P0 | S2 | Calendário do paciente visível após autorização. |
| US-19 | Como profissional, quero filtrar os dados por período e tipo. | Dashboard Prof. | P1 | S3 | Filtros funcionais: 7d, 30d, 90d, customizado. |
| US-20 | Como profissional, quero exportar um relatório em PDF do paciente. | Relatórios | P1 | S4 | PDF gerado pela Edge Function, download disponível. |
| US-21 | Como profissional, quero fazer anotações privadas sobre o paciente. | Dashboard Prof. | P2 | S4 | Notas salvas, visíveis apenas ao profissional. |
| US-22 | Como usuário, quero deletar minha conta e todos os meus dados. | LGPD | P1 | S5 | Dados deletados em cascade, confirmação por e-mail. |
| US-23 | Como usuário, quero exportar todos os meus dados em JSON/CSV. | LGPD | P2 | S5 | Arquivo gerado e enviado por e-mail em até 24h. |
| US-24 | Como paciente, quero filtrar meu histórico por tag de emoção. | Histórico | P2 | S4 | Filtro funcional, resultados atualizados. |
| US-25 | Como usuário, quero usar o app offline e sincronizar quando reconectar. | Offline | P2 | S5 | Mutations queued no Zustand, sync ao reconectar. |
| US-26 | Como profissional, quero receber alerta se um paciente não registrar humor por 5+ dias. | Notificações | P3 | S6 | E-mail enviado ao profissional com cadência configurável. |
| US-27 | Como paciente, quero personalizar o tema visual (claro/escuro). | UX | P3 | S6 | Tema salvo na preferência do usuário. |
| US-28 | Como profissional, quero ter MFA na minha conta para maior segurança. | Auth | P2 | S5 | MFA TOTP configurável no perfil. |

---

## 07 · Roadmap de Sprints

> Sprints de 2 semanas. Time sugerido: 1 dev full-stack · 1 dev mobile · 1 designer UI.

| Sprint | Período | Escopo Principal | Entrega |
|:---:|---|---|---|
| S1 | Semanas 1–2 | Setup monorepo, Auth completo (email + Google + onboarding), schema BD + RLS | Login funcional iOS e Web |
| S2 | Semanas 3–4 | Registro de humor (MVP), calendário, compartilhamento + permissões, dashboard básico do profissional | Core loop do paciente funcionando |
| S3 | Semanas 5–6 | Checklist de hábitos, controle de medicação, notificações push e e-mail, histórico com linha do tempo | Módulos de hábitos e medicação entregues |
| S4 | Semanas 7–8 | Gráficos de evolução (Recharts), heatmap, exportação de relatório PDF, streak e engajamento | Dashboard profissional completo + relatório PDF |
| S5 | Semanas 9–10 | LGPD (export + delete), offline mode, MFA profissional, polishing de UX, testes E2E | Compliance LGPD + app pronto para beta |
| S6 | Semanas 11–12 | Alertas de inatividade, tema escuro/claro, ajustes de performance, submissão App Store | Lançamento beta público |

### 7.1 Critérios de Lançamento (Definition of Done — v1.0)

1. US-01 a US-20 implementadas e com testes passando;
2. RLS testado com múltiplos usuários em ambiente de staging;
3. Conformidade LGPD validada por advogado parceiro;
4. Score de acessibilidade ≥ 80 no Lighthouse (web);
5. Crash-free rate ≥ 99.5% no Sentry após 2 semanas de beta;
6. App Store Review Guidelines checklist 100% atendido;
7. Documentação de API e onboarding do profissional publicada.

---

## 08 · Design System & UX Principles

### 8.1 Tokens de Design

| Token | Valor |
|---|---|
| `--brand-primary` | `#5B4CF5` — Roxo Psicare (ações principais, CTAs) |
| `--brand-secondary` | `#7C6FF7` — Roxo claro (hover states, gráficos) |
| `--bg-base` | `#F8F7FF` — Fundo global (iOS + Web) |
| `--surface` | `#FFFFFF` — Cards, modais, sheets |
| `--text-primary` | `#1A1A2E` — Texto principal |
| `--text-muted` | `#6B7280` — Labels, meta info |
| `--mood-1` | `#EF4444` — Muito mal (vermelho) |
| `--mood-2` | `#F97316` — Mal (laranja) |
| `--mood-3` | `#F59E0B` — Neutro (amarelo) |
| `--mood-4` | `#22C55E` — Bem (verde) |
| `--mood-5` | `#3B82F6` — Muito bem (azul) |
| `--radius-base` | `12px` — Border radius padrão de cards |
| `--font-sans` | `Inter` — Tipografia principal |

### 8.2 Princípios de UX

- **Frictionless** — registro de humor em menos de 10 segundos; zero campos obrigatórios além do score;
- **Safe space** — linguagem acolhedora, sem julgamento; evitar gamificação excessiva que gere ansiedade;
- **Transparent privacy** — cada tela que mostra dados compartilhados exibe um indicador visual claro;
- **Calm design** — paleta suave, espaços em branco generosos, sem notificações agressivas;
- **Accessible first** — contraste WCAG AA, suporte a VoiceOver (iOS) e leitores de tela (web).

---

## 09 · Considerações Finais

### 9.1 Riscos e Mitigações

| Risco | Mitigação |
|---|---|
| Abandono do app (churn emocional) | Onboarding gentil, lembretes configuráveis, sem streak shaming |
| Vazamento de dados sensíveis de saúde | RLS + audit log + criptografia em repouso + plano de resposta a incidentes |
| Rejeição na App Store (dados de saúde) | Seguir HealthKit guidelines; adicionar privacy policy na submissão |
| Dependência do Supabase | Schema documentado para migração; backups diários exportados para S3 |
| Custo de infraestrutura escalando rápido | Supabase Pro com connection pooling; cache agressivo com React Query |

### 9.2 Próximas Versões (v2.0)

- Integração com Apple Health (passos, sono, frequência cardíaca como contexto emocional);
- IA generativa: insights semanais personalizados baseados nos padrões identificados;
- Teleconsulta integrada: agendamento de sessão diretamente pelo app;
- Plataforma multi-tenant para clínicas de psicologia;
- Android (Expo já suporta — apenas configuração de EAS + Play Store).

### 9.3 Modelo de Negócio Sugerido

| Plano | Descrição |
|---|---|
| Gratuito (Paciente) | Registro de humor, hábitos, histórico 30 dias — sem compartilhamento |
| Premium (Paciente) — R$ 19/mês | Histórico ilimitado, exportação, compartilhamento com até 3 profissionais |
| Profissional — R$ 79/mês | Dashboard completo, relatórios PDF, até 50 pacientes ativos |
| Clínica — R$ 299/mês | Multi-profissional, até 500 pacientes, white-label futuro |

---

*Documento elaborado por Fantom Labs — Múcio Miranda — Junho 2026*
*Confidencial. Não distribuir sem autorização.*