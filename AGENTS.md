<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules
- Public site styling comes from tokens in src/styles.css (primary, primary-deep, teal, shadow-soft/lift, page-hero); why: one place to retheme every page.
- Do not change src/routes/admin.tsx or admin server functions during design work; why: owner requires the admin panel to stay as-is.
- Admin login uses ADMIN_LOGIN / ADMIN_PASSWORD / ADMIN_SESSION_SECRET secrets; why: credentials never live in code.
