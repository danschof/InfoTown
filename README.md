# InfoTown Website

A simple static website containing the InfoTown Manifesto.

## Files

- `index.html` — page content and metadata
- `style.css` — responsive page styling
- `favicon.svg` — temporary browser icon
- `.gitignore` — ignores common local operating-system files

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the root of the repository.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.

GitHub will provide a temporary `github.io` address.

## Custom domain

When the temporary site works:

1. Add a file named `CNAME` containing only your domain, for example:

   `infotown.example`

2. Configure the matching DNS records with your domain provider.
3. Enter the domain under **Settings → Pages → Custom domain**.
4. Enable HTTPS once GitHub confirms the DNS setup.

Do not add the example `CNAME` file until you replace it with your real domain.
