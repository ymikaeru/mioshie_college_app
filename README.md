# Mioshie College

Site estático para leitura e busca dos ensinamentos de Meishu-Sama, hospedado via GitHub Pages em:
`https://ymikaeru.github.io/mioshie_college_app/`

---

## Estrutura de diretórios

```
mioshie_college_app/
├── index.html              # Página principal (hub de volumes)
├── reader.html             # Leitor de ensinamentos
├── destaques.html          # Página de destaques
├── login.html              # Página de login
├── admin-supabase.html     # Painel de administração (Supabase)
├── admin.html              # Painel de administração (legado)
├── css/
│   ├── styles.css          # CSS fonte; edite aqui
│   ├── styles.min.css      # Gerado por npm run build:css
│   └── modules/            # Módulos CSS por componente
├── js/
│   ├── init-theme.js       # Inicialização de tema (carregado em todas as páginas)
│   ├── supabase-config.js  # Configuração do Supabase (anon key pública)
│   ├── supabase-auth.js    # Autenticação via Supabase
│   ├── search.js           # Busca full-text
│   ├── reader*.js          # Renderização e conteúdo do leitor
│   ├── nav.js              # Navegação lateral
│   ├── theme.js            # Troca de tema/modo
│   ├── toggle.js           # Toggles de UI
│   ├── login.js            # Login com Supabase
│   ├── access.js           # Controle de acesso por perfil
│   ├── sync.js             # Sincronização com Supabase
│   └── storage.js          # Gerenciamento de dados locais
├── mioshiec1/ … mioshiec4/ # Páginas de índice por volume
│   └── index.html
├── assets/images/          # Imagens do site
├── favicon.svg
├── sitemap.xml
├── robots.txt
└── package.json            # Dependências (Supabase, PostCSS)
```

---

## Backend

Os dados dos ensinamentos (JSON de navegação, índices de busca, conteúdo) estão armazenados no **Supabase**. O site carrega tudo dinamicamente via `js/supabase-config.js` e `js/sync.js`.

---

## Build

### Pré-requisitos

```bash
npm install
```

### CSS

```bash
npm run build:css   # Compila styles.css → styles.min.css (PostCSS + cssnano)
npm run watch:css   # Mesmo, mas recompila ao salvar
```

---

## Deploy (GitHub Pages)

O site é servido diretamente da branch `main`. Qualquer push para `main` atualiza o site.

Configure o GitHub Pages em **Settings > Pages** apontando para a branch `main` e a raiz do repositório.
